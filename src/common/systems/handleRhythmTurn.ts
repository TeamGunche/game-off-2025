import { world } from "@/common/world.ts";
import { RhythmTurn } from "@/common/traits/RhythmTurn.ts";
import { RhythmNote } from "@/common/traits/RhythmNote.ts";
import { spawnNotes } from "@/common/systems/pressed/pressedAttackInput.ts";

export const handleRhythmTurn = () => {
  world.query(RhythmTurn).updateEach(async ([rhythm], entity) => {
    if (world.query(RhythmNote).length === 0) {
      if (rhythm.phase === "attack") {
        rhythm.phase = "prepare";
        await spawnNotes();
        rhythm.phase = "defense";
        entity.set(RhythmTurn, { ...rhythm });
        return;
      }
      if (rhythm.phase === "defense") {
        entity.remove(RhythmTurn);
      }
    }
  });
};
