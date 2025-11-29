// 1. 오브젝트 타입 정의 (Type 정의)
// 모든 히트 오브젝트가 공유하는 기본 속성
interface BaseHitObject {
  x: number
  y: number
  time: number // 밀리초 (ms)
  type: number // 비트 플래그 (1: Circle, 2: Slider, 8: Spinner, 4: New Combo)
  hitSound: number
  extra: number // New Combo Skip Count
}

// 히트 서클 전용 타입
interface HitCircle extends BaseHitObject {
  type: 1 | 5 // 1 (Circle) 또는 5 (Circle + New Combo)
}

// 슬라이더 전용 타입
interface Slider extends BaseHitObject {
  type: 2 | 6 | 3 | 7 // 2 (Slider) 등
  curveType: "L" | "B" | "C" | "P" // Linear, Bezier, Catmull, Perfect Circle
  curvePoints: { x: number, y: number }[] // 슬라이더 컨트롤 포인트
  repeats: number // 반복 횟수
  length: number // 슬라이더 길이 (픽셀)
  edgeSounds: number[] // 엣지 사운드 타입
  edgeSampleSets: string[] // 엣지 샘플 세트 정보 (예: "0:0")
  sampleSet: number
  additionSet: number
}

// 스피너 전용 타입
interface Spinner extends BaseHitObject {
  type: 8 | 12 // 8 (Spinner) 또는 12 (Spinner + New Combo)
  endTime: number // 스피너 종료 시간
}

// 최종 유니언 타입
type HitObject = HitCircle | Slider | Spinner;

/**
 * osu! 비트맵의 [HitObjects] 섹션 문자열을 분석하여 객체 배열로 변환합니다.
 * @param hitObjectsString [HitObjects] 섹션의 문자열 데이터
 * @returns HitObject 배열
 */
export function parseHitObjects(hitObjectsString: string): HitObject[] {
  const lines = hitObjectsString.trim().split("\n").filter(line => line.length > 0);
  const objects: HitObject[] = [];

  for (const line of lines) {
    const parts = line.split(",");

    // 최소 6개의 필수 필드 분석 (X, Y, Time, Type, HitSound, Extra/NewCombo)
    const base: BaseHitObject = {
      x: parseInt(parts[0], 10),
      y: parseInt(parts[1], 10),
      time: parseInt(parts[2], 10),
      type: parseInt(parts[3], 10),
      hitSound: parseInt(parts[4], 10),
      extra: parseInt(parts[5].split(":")[0], 10), // 5번째 필드의 첫 부분 (New Combo Skip Count)
    };

    // Type 비트 플래그 확인
    const isNewCombo = (base.type & 4) !== 0;
    const typeValue = base.type & (1 | 2 | 8 | 16 | 32 | 64); // 기본 오브젝트 타입만 추출

    // --- 1. 히트 서클 (Circle) ---
    if (typeValue === 1) {
      objects.push(base as HitCircle);
    }

    // --- 2. 슬라이더 (Slider) ---
    else if (typeValue === 2) {
      const sliderParts = parts[5].split("|");
      const curveType = sliderParts[0].charAt(0) as Slider["curveType"];

      const curvePoints: { x: number, y: number }[] = [];
      // 첫 번째 컨트롤 포인트 (시작점 X,Y는 이미 base에 있음) 이후의 모든 컨트롤 포인트 분석
      for (let i = 1; i < sliderParts.length; i++) {
        const coords = sliderParts[i].split(":");
        curvePoints.push({
          x: parseInt(coords[0], 10),
          y: parseInt(coords[1], 10),
        });
      }

      const repeats = parseInt(parts[6], 10);
      const length = parseFloat(parts[7]);

      // 엣지 사운드와 샘플 데이터 처리 (존재하는 경우)
      const edgeSounds = parts.length > 8 && parts[8] ? parts[8].split("|").map(s => parseInt(s, 10)) : [];
      const edgeSampleSets = parts.length > 9 && parts[9] ? parts[9].split("|") : [];

      // 마지막 필드 (HitSample) 처리: SampleSet:AdditionSet:CustomIndex:AdditionCustomIndex
      const hitSampleParts = parts[parts.length - 1].split(":");

      objects.push({
        ...base,
        curveType,
        curvePoints,
        repeats,
        length,
        edgeSounds,
        edgeSampleSets,
        // 마지막 히트 사운드 필드 처리
        sampleSet: parseInt(hitSampleParts[0], 10),
        additionSet: parseInt(hitSampleParts[1], 10),
      } as Slider);
    }

    // --- 3. 스피너 (Spinner) ---
    else if (typeValue === 8) {
      objects.push({
        ...base,
        endTime: parseInt(parts[5], 10), // 스피너는 5번째 필드 전체가 종료 시간임
      } as Spinner);
    }

    // 기타 (Long Note 등)는 현재 스킵
  }

  return objects;
}

import type { Note, NotePosition } from "@/common/model/Note.ts"; // Note 타입은 이미 정의되어 있다고 가정합니다.
import type { MusicSheet } from "@/common/model/MusicSheet.ts";

// Note 인터페이스는 다음과 같이 가정합니다.
// export interface Note {
//   type: "short" | "long_start" | "long_end"; // 또는 다른 노트 타입
//   position: number; // 1, 2, 3, 4
//   time: number; // 밀리초
// }

// Hit Object의 기본 구조를 재사용합니다 (이전 답변에서 사용된 타입)
interface BaseHitObject {
  x: number
  y: number
  time: number
  type: number
  hitSound: number
  extra: number
}

// 이전에 정의된 parseHitObjects 함수를 사용하여 문자열을 BaseHitObject 배열로 변환하는 로직이 필요합니다.
// 여기서는 입력으로 BaseHitObject[] 배열을 받는다고 가정하고 매핑 함수를 작성합니다.

/**
 * osu! Hit Objects 배열을 4키 MusicSheet.notes 포맷으로 변환합니다.
 * osu!mania 스타일의 4키 맵핑 로직을 사용합니다.
 * @param hitObjects osu! 비트맵 [HitObjects] 섹션에서 파싱된 오브젝트 배열
 * @param title 변환할 악보의 제목
 * @returns MusicSheet 객체
 */
export function convertHitObjectsToMusicSheet(
  hitObjects: BaseHitObject[],
  title: string = "Converted Music Sheet",
): MusicSheet {
  const notes: Note[] = [];

  // X 좌표를 4개의 키 포지션(1, 2, 3, 4)으로 변환하는 함수
  const mapXToPosition = (x: number): number => {
    // osu!의 맵 영역은 512x384 (X: 0~512, Y: 0~384)
    // 512를 4등분하여 0~3은 1, 4~7은 2 등으로 매핑
    // X * 4 / 512 = X / 128
    // Math.floor(X / 128) + 1
    const position = Math.floor(x / 128) + 1;
    // 결과가 1~4 범위 내에 있도록 보장
    return Math.max(1, Math.min(4, position));
  };

  for (const obj of hitObjects) {
    // 1. Position 계산
    const position = mapXToPosition(obj.x);

    // 2. Note 타입 결정 (여기서는 모든 히트 오브젝트 시작점을 'short'으로 처리)
    // osu!mania의 Long Note (LN) 처리는 더 복잡하며, 슬라이더/스피너와는 별도의 로직이 필요합니다.
    // 현재는 주어진 예시를 기반으로 모든 노트를 'short'으로 변환합니다.

    const noteType: Note["type"] = "short";

    // 실제 osu! 비트맵에서 슬라이더(Type 2)나 스피너(Type 8)도 4키 모드에서는 단타(Short Note)로 처리되거나,
    // 롱 노트(LN)로 매핑되거나 완전히 무시될 수 있습니다.
    // 주어진 예시 포맷이 롱 노트의 시작/끝을 구분하는 타입("long_start", "long_end" 등)을 지원한다고 가정하고,
    // 현재는 단순하게 모두 "short"으로 매핑합니다.
    // 만약 슬라이더(Type 2)를 롱 노트로 처리하려면 if (obj.type & 2) {} 로직을 추가해야 합니다.

    notes.push({
      type: noteType,
      position: position as NotePosition,
      time: obj.time,
    });
  }

  return {
    title: title,
    notes: notes,
  };
}
