import { world } from "@/common/world";
import { IsBattle } from "@/common/traits/IsBattle";
import { HealthBarViewRef } from "@/common/traits/HealthBarViewRef";
import { RootRef } from "@/common/traits/RootRef";
import { MeshRef } from "@/common/traits/MeshRef";

const GAP = 0.5 as const;

export const syncHealthBarView = () => {
  const opponent = world.queryFirst(IsBattle);

  if (!opponent) return;

  const opponentObj = opponent.get(RootRef);
  const opponentMesh = opponent.get(MeshRef);

  if (!opponentObj || !opponentMesh) return;

  world.query(HealthBarViewRef).updateEach(([object]) => {
    const { x, y, z } = opponentObj.position;
    object.position.set(x, y + opponentMesh.scale.y + GAP, z);
  });
};
