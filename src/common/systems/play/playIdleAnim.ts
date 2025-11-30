import { world } from "@/common/world.ts";
import { IdleAnim } from "@/common/traits/IdleAnim.ts";
import { SpriteAnim } from "@/common/traits/SpriteAnim.ts";
import { MoveInput } from "@/common/traits/MoveInput.ts";
import { BattleStartAnim } from "@/common/traits/BattleStartAnim.ts";
import { RhythmAnims } from "@/common/traits/RhythmAnims.ts";

export const playIdleAnim = () => {
  world.query(IdleAnim, SpriteAnim, MoveInput).updateEach(([idleAnim, spriteAnim, moveInput], entity) => {
    if (spriteAnim.isPlaying(idleAnim)) return;
    if (moveInput.x !== 0) return;
    if (entity.has(RhythmAnims)) {
      const rhythmAnims = entity.get(RhythmAnims)!;
      for (const num of [0, 1, 2, 3, 4, 5, 6, 7] as const) {
        if (spriteAnim.isPlaying(rhythmAnims[num])) {
          return;
        }
      }
    }

    if (entity.has(BattleStartAnim)) {
      const battleStartAnim = entity.get(BattleStartAnim)!;
      if (spriteAnim.isPlaying(battleStartAnim)) return;
      if (spriteAnim.isPlaying({ ...battleStartAnim, reverse: true })) return;
    }

    spriteAnim.changeDef(idleAnim);
  });
};
