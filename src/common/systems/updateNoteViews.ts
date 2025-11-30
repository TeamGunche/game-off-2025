import { world } from "@/common/world.ts";
import { RhythmNoteViewRef } from "@/common/traits/RhythmNoteViewRef.ts";
import { RhythmNote } from "@/common/traits/RhythmNote.ts";
import { RhythmTurn } from "@/common/traits/RhythmTurn.ts";
import { IsBattle } from "@/common/traits/IsBattle.ts";
import { HealthPoint } from "@/common/traits/HealthPoint.ts";
import { IsPlayer } from "@/common/traits/IsPlayer.ts";

export const updateNoteViews = () => {
  const rhythm = world.queryFirst(RhythmTurn)?.get(RhythmTurn);
  const opponent = world.queryFirst(IsBattle);
  const opponentHealth = opponent?.get(HealthPoint);

  const player = world.queryFirst(IsPlayer);
  const playerHealth = player?.get(HealthPoint);

  if (!rhythm) return;
  if (!opponent) return;
  if (!opponentHealth) return;
  if (!player) return;
  if (!playerHealth) return;

  world.query(RhythmNoteViewRef, RhythmNote).updateEach(([view, note], entity) => {
    if (note.type === "short") {
      if (note.position < -0.2) {
        entity.destroy();
        if (note.hit && rhythm.phase === "attack") {
          opponentHealth.health -= 1;
          opponent.set(HealthPoint, { ...opponentHealth });
        }
        if (!note.hit && rhythm.phase === "defense") {
          playerHealth.health -= 1;
          player.set(HealthPoint, { ...playerHealth });
        }
        return;
      }

      if (note.position > 1.5) {
        view.style.display = "none";
        return;
      }
    }

    if (note.type === "long") {
      if (note.position + note.length < -0.3) {
        entity.destroy();
        if (note.hit && rhythm.phase === "attack") {
          opponentHealth.health -= 1;
          opponent.set(HealthPoint, { ...opponentHealth });
        }
        if (!note.hit && rhythm.phase === "defense") {
          playerHealth.health -= 1;
          player.set(HealthPoint, { ...playerHealth });
        }
        return;
      }
      if (note.position > 1.5) {
        view.style.display = "none";
        return;
      }
    }

    if (note.held) {
      view.style.background = "rgba(255, 255, 255, 0.5)";
    }
    if (note.hit) {
      view.style.background = "rgba(255, 255, 0, 0.8)";
    }
    view.style.display = "block";
    view.style.bottom = note.position * 100 + "%";
  });
};
