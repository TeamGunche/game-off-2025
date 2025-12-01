import { world } from "@/common/world.ts";
import { RhythmNote } from "@/common/traits/RhythmNote.ts";
import { scrollTime } from "@/common/defs/scrollTime.ts";
import { IsPlayer } from "@/common/traits/IsPlayer.ts";
import { MoveInput } from "@/common/traits/MoveInput.ts";

export const scrollNotes = (delta: number) => {
  const player = world.queryFirst(IsPlayer);

  world.query(RhythmNote).updateEach(([note]) => {
    if (player?.get(MoveInput)?.x !== 0) return;
    note.position -= delta / scrollTime;
  });
};
