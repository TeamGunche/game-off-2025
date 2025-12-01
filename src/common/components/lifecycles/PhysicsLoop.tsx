import { useWorld } from "koota/react";
import { applyCharacterGravity } from "@/common/systems/physics/applyCharacterGravity.ts";
import { applyCharacterVelocity } from "@/common/systems/physics/applyCharacterVelocity.ts";
import useBeforePhysicsStep from "@/common/hooks/physics/useBeforePhysicsStep.tsx";

export default function PhysicsLoop() {
  const world = useWorld();

  useBeforePhysicsStep(() => {
    applyCharacterGravity(world);
    applyCharacterVelocity(world);
  });
  return <></>;
}
