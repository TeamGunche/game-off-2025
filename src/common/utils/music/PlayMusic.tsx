import { Snare } from "@/common/sound-engines/snare.ts";
import { HiHat } from "@/common/sound-engines/hat.ts";
import { Kick } from "@/common/sound-engines/kick.ts";
import { Bottle } from "@/common/sound-engines/bottle.ts";
import { Click } from "@/common/sound-engines/click.ts";

export const playMelody = (bpm: number) => {
  const ctx = new AudioContext();
  const beatDuration = 60 / bpm; // 0.5초
  const startTime = ctx.currentTime;

  const bass = new Kick(ctx);
  const snare = new Snare(ctx);
  const hihat = new HiHat(ctx);
  const bottle = new Bottle(ctx);
  const click = new Click(ctx);

  // 킥: 1, 5, 9, 13 비트
  [0, 2, 4, 6].forEach((beat) => {
    bass.trigger(startTime + beat * beatDuration);
  });

  // 스네어: 5, 13 비트
  [2, 6].forEach((beat) => {
    snare.trigger(startTime + beat * beatDuration);
  });

  // 하이햇: 모든 8분음표
  [0.5, 1, 1.2, 1.4, 1.6, 1.8, 2, 3, 4, 5, 6, 7].forEach((beat) => {
    hihat.trigger(startTime + beat * beatDuration);
  });

  // 병: 액센트 비트
  [0, 4].forEach((beat) => {
    bottle.trigger(startTime + beat * beatDuration);
  });

  // 클릭: 오프비트 액센트
  [1.5, 3.5, 5.5, 7.5].forEach((beat) => {
    click.trigger(startTime + beat * beatDuration);
  });
};
