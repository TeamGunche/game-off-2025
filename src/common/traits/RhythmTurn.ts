import { trait } from "koota";

export type RhythmPhase = "attack" | "defense" | "prepare";

export const RhythmTurn = trait({
  phase: "attack" as RhythmPhase,
});
