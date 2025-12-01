import { CharacterVisualPosition } from "@/common/traits/CharacterVisualPosition.ts";
import { InteractableRef } from "@/common/traits/InteractableRef.ts";
import { InteractionRef } from "@/common/traits/InteractionRef.ts";
import { IsInteractionFocused } from "@/common/traits/IsInteractionFocused.ts";
import type { World } from "koota";

export const updateInteractionPos = (world: World) => {
  const focusedEntityPos = world
    .queryFirst(IsInteractionFocused, InteractableRef)
    ?.get(CharacterVisualPosition);
  if (!focusedEntityPos) return;
  world
    .query(IsInteractionFocused, InteractionRef)
    .updateEach(([interactionRef]) => {
      const pos = interactionRef.position;
      interactionRef.position.set(focusedEntityPos.x, focusedEntityPos.y, pos.z);
    });
};
