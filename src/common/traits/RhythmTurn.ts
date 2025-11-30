import { trait } from "koota";

export type RhythmPhase = "attack" | "defense";

export const RhythmTurn = trait({
  phase: "attack" as RhythmPhase,
  accuracy: 100 as number,
  total: 0 as number,
});
