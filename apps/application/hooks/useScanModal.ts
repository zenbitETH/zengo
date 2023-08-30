import { useState } from "react";

export const useScanModal = (startingVisibility: boolean) => {
  const [visible, setVisible] = useState(startingVisibility);
  function toggle() {
    setVisible(!visible);
  }
  return { toggle, visible };
};
