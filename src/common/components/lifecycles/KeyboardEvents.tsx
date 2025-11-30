import type { KeyboardControlType } from "@/common/defs/keyboardControlMap.ts";
import { pressedTransformInput } from "@/common/systems/pressed/pressedTransformInput.ts";
import { pressedInteractInput } from "@/common/systems/pressed/pressedInteractInput.ts";
import useKeyboardControlsCallback from "@/common/hooks/input/useKeyboardControlsCallback.ts";

export default function KeyboardEvents() {
  useKeyboardControlsCallback<KeyboardControlType>("transform", pressedTransformInput);
  useKeyboardControlsCallback<KeyboardControlType>("interact", pressedInteractInput);

  return <></>;
}
