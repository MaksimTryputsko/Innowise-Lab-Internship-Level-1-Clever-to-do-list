import React from "react";
import { createPortal } from "react-dom";
import { ModalContainer } from "../ModalContainer/ModalContainer";

export interface IPropsModal {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const modalRootElement = document.querySelector("#modalForAddNewTask");

const Modal = ({ children, isOpen, onClose }: IPropsModal) => {
  if (!modalRootElement) {
    return null;
  }
  return createPortal(
    <ModalContainer onClose={onClose} isOpen={isOpen}>
      {children}
    </ModalContainer>,
    modalRootElement,
  );
};

export { Modal };
