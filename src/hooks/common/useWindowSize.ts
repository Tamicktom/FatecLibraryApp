//* Libraries imports
import { useState, useEffect } from "react";
import { Dimensions } from "react-native";

/**
 * This hook is used to get the window size of the device.
 * It update the state when the window size change.
 * @returns {width: number, height: number}
 */

export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState(Dimensions.get("window"));

  useEffect(() => {
    const onResize = () => {
      setWindowSize(Dimensions.get("window"));
    };

    Dimensions.addEventListener("change", onResize);
  }, []);

  return windowSize;
}
