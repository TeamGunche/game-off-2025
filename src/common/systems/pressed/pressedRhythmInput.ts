import { world } from "@/common/world.ts";
import { RhythmInput } from "@/common/traits/RhythmInput.ts";

export const pressedRhythmInput = (index: 0 | 1 | 2 | 3) => {
  world.query(RhythmInput).updateEach(([input]) => {
    if (input[index] === false) {
      input[index] = true;
    }
  });
};
