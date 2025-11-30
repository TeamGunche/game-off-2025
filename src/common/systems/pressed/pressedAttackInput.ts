import { IsBattle } from "@/common/traits/IsBattle";
import { IsInteracting } from "@/common/traits/IsInteracting";
import { IsRhythm } from "@/common/traits/IsRhythm";
import type { World } from "koota";

export const pressedAttackInput = (world: World) => {
  world.query(IsInteracting, IsBattle).updateEach((_, entity) => {
    entity.add(IsRhythm({ phase: "attack" }));
  });
};
