import { IsBattle } from "@/common/traits/IsBattle";
import { IsInteracting } from "@/common/traits/IsInteracting";
import { IsRhythm } from "@/common/traits/IsRhythm";
import type { World } from "koota";
import { RhythmSheet } from "@/common/traits/RhythmSheet.ts";
import { getSafePath } from "@/common/utils/electronUtils.ts";
import type { MusicSheet } from "@/common/model/MusicSheet.ts";
import { world } from "@/common/world.ts";
import { RhythmNote } from "@/common/traits/RhythmNote.ts";
import { scrollTime } from "@/common/defs/scrollTime.ts";

const startOffset = 2; // seconds

export const pressedAttackInput = (world: World) => {
  world.query(IsInteracting, IsBattle).updateEach((_, entity) => {
    entity.add(IsRhythm({ phase: "attack" }), RhythmSheet());
    spawnNotes();
  });
};

const spawnNotes = async () => {
  const sheet = await fetch(getSafePath("/assets/sheets/candle.json")).then(res => res.json()) as MusicSheet;
  sheet.notes.forEach((n) => {
    world.spawn(RhythmNote({
      type: n.type,
      lane: n.position - 1 as 0 | 1 | 2 | 3,
      position: n.time / (1000 * scrollTime) + startOffset,
      length: n.type === "short" ? 0.05 : (n.endTime - n.time) / (1000 * scrollTime) + 0.05,
    }));
  });
};
