import { world } from "@/common/world.ts";
import { RhythmTurn } from "@/common/traits/RhythmTurn.ts";
import { RhythmNote } from "@/common/traits/RhythmNote.ts";

export const endRhythm = () => {
  world.query(RhythmTurn).updateEach(([rhythm], entity) => {
    if (world.query(RhythmNote).length === 0) {
      if (rhythm.phase === "attack") {
        rhythm.phase = "defense";
      }
      if (rhythm.phase === "defense") {
        entity.remove(RhythmTurn);
      }
    }
  });
};
