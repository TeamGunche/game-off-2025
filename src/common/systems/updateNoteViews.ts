import { world } from "@/common/world.ts";
import { RhythmNoteViewRef } from "@/common/traits/RhythmNoteViewRef.ts";
import { RhythmNote } from "@/common/traits/RhythmNote.ts";

export const updateNoteViews = () => {
  world.query(RhythmNoteViewRef, RhythmNote).updateEach(([view, note], entity) => {
    if (note.type === "short") {
      if (note.position < -0.5) {
        entity.destroy();
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
        return;
      }
      if (note.position > 1.5) {
        view.style.display = "none";
        return;
      }
    }

    view.style.display = "block";
    view.style.bottom = note.position * 100 + "%";
  });
};
