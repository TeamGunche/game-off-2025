import { useKeyboardControls } from "@react-three/drei";
import { useEffect } from "react";

export default function useKeyboardControlsCallback<T extends string>(key: T, onPress: () => void, onRelease?: () => void) {
  const [subInput] = useKeyboardControls<T>();

  useEffect(() => {
    return subInput(
      state => state[key],
      (pressed) => {
        if (pressed) onPress();
        else if (onRelease) onRelease();
      },
    );
  }, []);
}
