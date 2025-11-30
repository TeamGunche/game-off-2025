import { world } from "@/common/world.ts";
import { RhythmInput } from "@/common/traits/RhythmInput.ts";
import { RhythmNote } from "@/common/traits/RhythmNote.ts";

export const pressedRhythmInput = (index: 0 | 1 | 2 | 3) => {
  world.query(RhythmInput).updateEach(([input], entity) => {
    if (input[index] === false) {
      input[index] = true;
      entity.changed(RhythmInput);
    }
  });

  world.query(RhythmNote).updateEach(([note]) => {
    ([0, 1, 2, 3] as const).forEach((num) => {
      if (note.lane === num && num === index) {
        if (note.type === "short") {
          if (note.position >= -0.05 && note.position <= 0.15) {
            note.hit = true;
            return;
          }
        }

        if (note.type === "long") {
          if (note.position >= -0.05 && note.position <= 0.15) {
            note.held = true;
            return;
          }
        }
      }
    });
  });
};
