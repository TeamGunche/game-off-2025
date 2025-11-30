import { trait } from "koota";

export const RhythmNote = trait({
  lane: 0 as 0 | 1 | 2 | 3,
  position: 0 as number,
  type: "short" as "short" | "long",
  length: 0.05 as number,
  held: false as boolean,
  hit: false as boolean,
});
