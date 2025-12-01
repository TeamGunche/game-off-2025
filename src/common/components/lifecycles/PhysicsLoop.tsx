import { useWorld } from "koota/react";
import { applyCharacterGravity } from "@/common/systems/physics/applyCharacterGravity.ts";
import { applyCharacterVelocity } from "@/common/systems/physics/applyCharacterVelocity.ts";
import useBeforePhysicsStep from "@/common/hooks/physics/useBeforePhysicsStep.tsx";
import { useApp } from "@/store/useAppStore.ts";

export default function PhysicsLoop() {
  const world = useWorld();
  const { isPaused } = useApp();

  useBeforePhysicsStep(() => {
    if (isPaused) return;

    applyCharacterGravity(world);
    applyCharacterVelocity(world);
  });
  return <></>;
}
