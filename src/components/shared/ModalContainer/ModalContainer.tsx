import React from "react";
import styles from "./modalContainer.module.scss";
import { IPropsModal } from "../ModalAddNewTask/Modal";

const ModalContainer = ({ children, isOpen, onClose }: IPropsModal) => {
  if (!isOpen) {
    return null;
  }
  return (
    <div className={styles.modalWrapper} onClick={onClose}>
      <div className={styles.modalBlock} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export { ModalContainer };
