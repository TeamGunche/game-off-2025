import type { RhythmControlType } from "@/common/defs/keyboardControlMap.ts";
import { pressedRhythmInput } from "@/common/systems/pressed/pressedRhythmInput.ts";
import useKeyboardControlsCallback from "@/common/hooks/input/useKeyboardControlsCallback.ts";
import { releasedRhythmInput } from "@/common/systems/released/releasedRhythmInput.ts";
import { useApp } from "@/store/useAppStore.ts";

export default function RhythmKeyboardEvents() {
  const { playSound } = useApp();

  ([1, 2, 3, 4] as const)
    .forEach((num) => {
      useKeyboardControlsCallback<RhythmControlType>(`rhythm ${num}`,
        () => {
          pressedRhythmInput(num - 1 as 0 | 1 | 2 | 3, playSound);
        }, () => {
          releasedRhythmInput(num - 1 as 0 | 1 | 2 | 3, playSound);
        });
    });
  return <></>;
}
