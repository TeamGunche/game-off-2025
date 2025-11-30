import type { RhythmControlType } from "@/common/defs/keyboardControlMap.ts";
import { pressedRhythmInput } from "@/common/systems/pressed/pressedRhythmInput.ts";
import useKeyboardControlsCallback from "@/common/hooks/input/useKeyboardControlsCallback.ts";
import { releasedRhythmInput } from "@/common/systems/released/releasedRhythmInput.ts";

export default function RhythmKeyboardEvents() {
  ([1, 2, 3, 4] as const)
    .forEach((num) => {
      useKeyboardControlsCallback<RhythmControlType>(`rhythm ${num}`,
        () => {
          pressedRhythmInput(num - 1 as 0 | 1 | 2 | 3);
        }, () => {
          releasedRhythmInput(num - 1 as 0 | 1 | 2 | 3);
        });
    });
  return <></>;
}
