import { trait } from "koota";

type BattleTurnType = {
  turn: "idle" | "user" | "opponent";
};

export const BattleTurn = trait<BattleTurnType>({
  turn: "idle",
});
