import { IsCamera } from "@/common/traits/IsCamera";
import { RhythmViewRef } from "@/common/traits/RhythmViewRef";
import { RootRef } from "@/common/traits/RootRef";
import { world } from "@/common/world";

export const syncCameraAndRhythmView = () => {
  const camera = world.queryFirst(IsCamera)?.get(RootRef);

  if (!camera) return;
  world.query(RhythmViewRef).updateEach(([object]) => {
    object.position.set(camera.position.x, camera.position.y, object.position.z);
  });
};
