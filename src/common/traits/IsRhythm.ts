import { trait } from "koota";

export type RhythmPhase = "attack" | "defense";

export const IsRhythm = trait({
  phase: "attack" as RhythmPhase,
});
