import type { KeyboardControlType } from "@/common/defs/keyboardControlMap.ts";
import { addJumpBuffer } from "@/common/systems/addJumpBuffer.ts";
import { applyCharacterInputToVelocity } from "@/common/systems/applyCharacterInputToVelocity.ts";
import { applyFacingDirection } from "@/common/systems/applyFacingDirection.ts";
import { applySpriteAnim } from "@/common/systems/applySpriteAnim.ts";
import { doJump } from "@/common/systems/doJump.ts";
import { freeJumpBuffer } from "@/common/systems/freeJumpBuffer.ts";
import { playBattleStartAnim } from "@/common/systems/play/playBattleStartAnim.ts";
import { playIdleAnim } from "@/common/systems/play/playIdleAnim.ts";
import { playWalkAnim } from "@/common/systems/play/playWalkAnim.ts";
import pollPlayerInput from "@/common/systems/pollPlayerInput.ts";
import { syncCameraAndBattleView } from "@/common/systems/syncCameraAndBattleView";
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
import { playRhythmAnim } from "@/common/systems/play/playRhythmAnim.ts";
import { scrollNotes } from "@/common/systems/scrollNotes.ts";
import { updateNoteViews } from "@/common/systems/updateNoteViews.ts";
import { handleRhythmTurn } from "@/common/systems/handleRhythmTurn.ts";
import { useRef } from "react";

const FPS = 60;

export default function FrameLoop() {
  const world = useWorld();
  const [, getInput] = useKeyboardControls<KeyboardControlType>();
  const accDelta = useRef(0);

  useFrame(({ gl, scene, camera }, delta) => {
    accDelta.current += delta;

    if (accDelta.current > 1 / FPS) {
      const input = getInput();
      const delta = accDelta.current;

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
      playRhythmAnim();

      tickSpriteAnim(world);
      applySpriteAnim(world);
      updateFacingDirection();
      applyFacingDirection();

      updateInteractLineAnimation(world, delta);
      updateInteractionCamera(delta);
      syncCameraAndBattleView();

      scrollNotes(delta);
      updateNoteViews();
      handleRhythmTurn();

      gl.render(scene, camera);
      accDelta.current = 0;
    }
  }, 1);

  return <></>;
}
