import { world } from "@/common/world.ts";
import { RhythmInput } from "@/common/traits/RhythmInput.ts";
import { RhythmAnims } from "@/common/traits/RhythmAnims.ts";
import { SpriteAnim } from "@/common/traits/SpriteAnim.ts";

export const playRhythmAnim = () => {
  world.query(RhythmInput, RhythmAnims, SpriteAnim).updateEach(([rhythmInput, rhythmAnims, anim]) => {
    for (const num of [1, 2, 3, 4] as const) {
      if (rhythmInput[num - 1]) {
        const animCandidates = [(num - 1) * 2, (num - 1) * 2 + 1];
        if (anim.isPlaying(rhythmAnims[animCandidates[0]])) {
          continue;
        }
        if (anim.isPlaying(rhythmAnims[animCandidates[1]])) {
          continue;
        }
        const animIndex = Math.floor(Math.random() * 2);
        anim.changeDef(rhythmAnims[animCandidates[animIndex]]);
        break;
      }
    }
  });
};
