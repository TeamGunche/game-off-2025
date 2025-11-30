import { world } from "@/common/world";
import { HealthBarViewRef } from "@/common/traits/HealthBarViewRef";
import { RootRef } from "@/common/traits/RootRef";
import { MeshRef } from "@/common/traits/MeshRef";

const GAP = 0.5 as const;

export const syncHealthBarView = () => {
  world.query(HealthBarViewRef, RootRef, MeshRef).updateEach(([healthBar, root, mesh]) => {
    const { x, y, z } = root.position;
    healthBar.position.set(x, y + mesh.scale.y + GAP, z);
  });
};
