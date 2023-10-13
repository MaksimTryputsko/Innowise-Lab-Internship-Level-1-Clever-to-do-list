import React from "react";
import ButtonMUI from "@mui/material/Button";
import styles from "./button.module.scss";

interface IPropsButton {
  variant: "text" | "outlined" | "contained";
  children: React.ReactNode;
  onClick?: () => void;
}

const Button = ({ variant, children, onClick }: IPropsButton) => {
  return (
    <div className={styles.wrapperForButtonMUI}>
      <ButtonMUI variant={variant} onClick={onClick}>
        {children}
      </ButtonMUI>
    </div>
  );
};

export { Button };
