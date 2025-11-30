import { world } from "@/common/world.ts";
import { RhythmNote } from "@/common/traits/RhythmNote.ts";
import { scrollTime } from "@/common/defs/scrollTime.ts";

export const scrollNotes = (delta: number) => {
  world.query(RhythmNote).updateEach(([note]) => {
    note.position -= delta / scrollTime;
  });
};
