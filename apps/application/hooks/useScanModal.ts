import { useState } from "react";

export const useScanModal = () => {
  const [visible, setVisible] = useState(false);

  function closeModal() {
    setVisible(false);
  }

  function showModal() {
    setVisible(true);
  }
  return { closeModal, showModal, visible };
};
