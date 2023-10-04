import React, { useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import styles from "./modal.module.scss";

interface IPropsModal {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}

const modalRootElement = document.querySelector("#modalForAddNewTask");

const Modal = ({ children, open, onClose }: IPropsModal) => {
  const element = useMemo(() => document.createElement("div"), []);
  useEffect(() => {
    if (open) {
      modalRootElement?.appendChild(element);

      return () => {
        modalRootElement?.removeChild(element);
      };
    }
  });
  if (open) {
    return createPortal(
      <div className={styles.modalWrapper} onClick={onClose}>
        <div className={styles.modalBlock} onClick={e => e.stopPropagation()}>
          {children}
        </div>
      </div>,
      element,
    );
  }
  return null;
};

export { Modal };
