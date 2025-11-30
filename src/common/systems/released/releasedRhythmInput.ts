import { world } from "@/common/world.ts";
import { RhythmInput } from "@/common/traits/RhythmInput.ts";

export const releasedRhythmInput = (index: 0 | 1 | 2 | 3) => {
  world.query(RhythmInput).updateEach(([input], entity) => {
    if (input[index] === true) {
      input[index] = false;
      entity.changed(RhythmInput);
    }
  });
};
