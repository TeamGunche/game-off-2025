import { world } from "@/common/world.ts";
import { RhythmInput } from "@/common/traits/RhythmInput.ts";
import { RhythmNote } from "@/common/traits/RhythmNote.ts";
import type { InstrumentType } from "@/store/useAppStore.ts";
import { shuffle } from "es-toolkit";

export const pressedRhythmInput = (index: 0 | 1 | 2 | 3, playSound: (instrument: InstrumentType) => void) => {
  world.query(RhythmInput).updateEach(([input], entity) => {
    if (input[index] === false) {
      input[index] = true;
      entity.changed(RhythmInput);
    }
  });

  world.query(RhythmNote).updateEach(([note]) => {
    ([0, 1, 2, 3] as const).forEach((num) => {
      if (note.lane === num && num === index) {
        if (note.type === "short") {
          if (note.position >= -0.05 && note.position <= 0.15) {
            note.hit = true;
            playSound(shuffle(["click", "hihat", "bottle"] as InstrumentType[])[0]);
            return;
          }
        }

        if (note.type === "long") {
          if (note.position >= -0.05 && note.position <= 0.15) {
            note.held = true;
            playSound("kick");
            return;
          }
        }
      }
    });
  });
};
