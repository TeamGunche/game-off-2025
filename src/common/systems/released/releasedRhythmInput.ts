import { world } from "@/common/world.ts";
import { RhythmInput } from "@/common/traits/RhythmInput.ts";
import { RhythmNote } from "@/common/traits/RhythmNote.ts";

export const releasedRhythmInput = (index: 0 | 1 | 2 | 3) => {
  world.query(RhythmInput).updateEach(([input], entity) => {
    if (input[index] === true) {
      input[index] = false;
      entity.changed(RhythmInput);
    }
  });

  world.query(RhythmNote).updateEach(([note]) => {
    ([0, 1, 2, 3] as const).forEach((num) => {
      if (note.lane === num && num === index) {
        if (note.type === "long") {
          if (note.position + note.length >= -0.05 && note.position + note.length <= 0.15 && note.held) {
            note.hit = true;
            return;
          }
        }
      }
    });
  });
};
