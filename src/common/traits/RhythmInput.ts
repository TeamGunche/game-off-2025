import { trait } from "koota";

export type RhythmInputType = [boolean, boolean, boolean, boolean];

export const RhythmInput = trait<() => RhythmInputType>(() => [
  false,
  false,
  false,
  false,
]);
