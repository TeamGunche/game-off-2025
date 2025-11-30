import type { KeyboardControlType } from "@/common/defs/keyboardControlMap.ts";
import { addJumpBuffer } from "@/common/systems/addJumpBuffer.ts";
import { applyCharacterInputToVelocity } from "@/common/systems/applyCharacterInputToVelocity.ts";
import { applyFacingDirection } from "@/common/systems/applyFacingDirection.ts";
import { applySpriteAnim } from "@/common/systems/applySpriteAnim.ts";
import { doJump } from "@/common/systems/doJump.ts";
import { freeJumpBuffer } from "@/common/systems/freeJumpBuffer.ts";
import { playBattleStartAnim } from "@/common/systems/playBattleStartAnim.ts";
import { playIdleAnim } from "@/common/systems/playIdleAnim.ts";
import { playWalkAnim } from "@/common/systems/playWalkAnim.ts";
import pollPlayerInput from "@/common/systems/pollPlayerInput.ts";
import { syncCameraAndBattleView } from "@/common/systems/syncCameraAndBattleView";
import { syncCameraAndRhythmView } from "@/common/systems/syncCameraAndRhythmView";
import { syncControllerAndVisualPosition } from "@/common/systems/syncControllerAndVisualPosition.ts";
import { syncHealthBarView } from "@/common/systems/syncHealthBarView";
import { syncVisualPositionAndMesh } from "@/common/systems/syncVisualPositionAndMesh.ts";
import { tickSpriteAnim } from "@/common/systems/tickSpriteAnim.ts";
import { updateElapsedTime } from "@/common/systems/updateElapsedTime.ts";
import { updateFacingDirection } from "@/common/systems/updateFacingDirection.ts";
import { updateInteractionCamera } from "@/common/systems/updateInteractionCamera.ts";
import { updateInteractionMoveInput } from "@/common/systems/updateInteractionMoveInput.ts";
import { updateInteractLineAnimation } from "@/common/systems/updateInteractLineAnimation.ts";
import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useWorld } from "koota/react";

export default function FrameLoop() {
  const world = useWorld();
  const [, getInput] = useKeyboardControls<KeyboardControlType>();

  useFrame((_, delta) => {
    // TODO: Devtools
    // console.log(world.query().map(entity => {
    //     var traits = Array.from(world.traits).map(tr => {
    //         if (entity.has(tr)) {
    //             return {name: tr.name, data: entity.get(tr)}
    //         }
    //     })
    //     return { id: entity.id, traits: traits.filter(Boolean) }
    // }))
    // TODO: GPU Info
    // const ctx = gl.getContext();
    // const debugInfo = ctx.getExtension('WEBGL_debug_renderer_info');
    // if (debugInfo) {
    //     const renderer = ctx.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
    //     console.log('Active GPU:', renderer);
    // }

    const input = getInput();

    updateElapsedTime(world, delta);

    pollPlayerInput(world, input);
    updateInteractionMoveInput();
    applyCharacterInputToVelocity(world);
    syncControllerAndVisualPosition(world);
    syncVisualPositionAndMesh(world);

    addJumpBuffer(world);
    doJump(world);
    freeJumpBuffer(world);

    playIdleAnim();
    playWalkAnim();
    playBattleStartAnim();

    tickSpriteAnim(world);
    applySpriteAnim(world);
    updateFacingDirection();
    applyFacingDirection();

    updateInteractLineAnimation(world, delta);
    updateInteractionCamera(delta);
    syncCameraAndBattleView();
    syncCameraAndRhythmView();
    syncHealthBarView();
  });

  return <></>;
}
