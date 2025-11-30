import { world } from "@/common/world.ts";
import { RhythmInput } from "@/common/traits/RhythmInput.ts";

export const releasedRhythmInput = (index: 0 | 1 | 2 | 3) => {
  console.log(`released rhythm input: ${index}`);
  world.query(RhythmInput).updateEach(([input]) => {
    if (input[index] === true) {
      input[index] = false;
    }
  });
};
