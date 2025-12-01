import type { KeyboardControlType } from "@/common/defs/keyboardControlMap.ts";
import { pressedTransformInput } from "@/common/systems/pressed/pressedTransformInput.ts";
import { pressedInteractInput } from "@/common/systems/pressed/pressedInteractInput.ts";
import useKeyboardControlsCallback from "@/common/hooks/input/useKeyboardControlsCallback.ts";
import { useApp } from "@/store/useAppStore.ts";

export default function KeyboardEvents() {
  const { showMenu } = useApp();

  useKeyboardControlsCallback<KeyboardControlType>("transform", pressedTransformInput);
  useKeyboardControlsCallback<KeyboardControlType>("interact", () => pressedInteractInput(showMenu));

  return <></>;
}
