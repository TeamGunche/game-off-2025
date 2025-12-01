import { world } from "@/common/world.ts";
import { HealthPoint } from "@/common/traits/HealthPoint.ts";
import { IsBattle } from "@/common/traits/IsBattle.ts";
import { LdtkEntityInstance } from "@/common/traits/LdtkEntityInstance.ts";
import { InteractLine } from "@/common/traits/InteractLine.ts";
import { stripEntityInstanceFields } from "@/common/ldtk/utils/entityUtils.ts";
import { IsChat } from "@/common/traits/IsChat.ts";
import { IsDefeat } from "@/common/traits/IsDefeat.ts";
import { IsPlayer } from "@/common/traits/IsPlayer.ts";
import { RhythmTurn } from "@/common/traits/RhythmTurn.ts";
import { RhythmNote } from "@/common/traits/RhythmNote.ts";
import { IsVictory } from "@/common/traits/IsVictory.ts";

export const onHPZero = () => {
  world.query(HealthPoint, IsBattle, LdtkEntityInstance, InteractLine).updateEach(([health, ldtkEntity, interactLine], entity) => {
    if (health.health <= 0) {
      entity.remove(IsBattle);
      entity.add(IsChat);
      entity.add(IsDefeat);
      entity.remove(RhythmTurn);
      destroyAllNotes();
      const { DefeatLines } = stripEntityInstanceFields<{
        DefeatLines: string[]
      }>(ldtkEntity);
      interactLine.lines = DefeatLines;
    }
    world.query(HealthPoint, IsPlayer).updateEach(([playerHealth]) => {
      if (playerHealth.health <= 0) {
        const { VictoryLines } = stripEntityInstanceFields<{
          VictoryLines: string[]
        }>(ldtkEntity);
        interactLine.lines = VictoryLines;
        entity.add(IsChat);
        entity.add(IsVictory);
        entity.remove(IsBattle);
        entity.remove(RhythmTurn);
        destroyAllNotes();
      }
    });
  });
};

const destroyAllNotes = () => {
  world.query(RhythmNote).forEach((e) => {
    e.destroy();
  });
};
