import { world } from "@/common/world.ts";
import { RhythmNoteViewRef } from "@/common/traits/RhythmNoteViewRef.ts";
import { RhythmNote } from "@/common/traits/RhythmNote.ts";
import { RhythmTurn } from "@/common/traits/RhythmTurn.ts";

export const updateNoteViews = () => {
  const rhythm = world.queryFirst(RhythmTurn)?.get(RhythmTurn);

  if (!rhythm) return;

  world.query(RhythmNoteViewRef, RhythmNote).updateEach(([view, note], entity) => {
    if (note.type === "short") {
      if (note.position < -0.5) {
        entity.destroy();
        if (!note.hit) rhythm.accuracy -= (1 / rhythm.total) * 100;
        return;
      }

      if (note.position > 1.5) {
        view.style.display = "none";
        return;
      }
    }

    if (note.type === "long") {
      if (note.position + note.length < -0.5) {
        entity.destroy();
        if (!note.hit) rhythm.accuracy -= (1 / rhythm.total) * 100;
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
