import { world } from "@/common/world.ts";
import { RhythmInput } from "@/common/traits/RhythmInput.ts";

export const pressedRhythmInput = (index: 1 | 2 | 3 | 4) => {
  world.query(RhythmInput).updateEach(([input]) => {
    if (input[index] === true) {
      input[index] = false;
    }
  });
};
