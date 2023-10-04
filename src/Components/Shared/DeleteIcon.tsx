import React from "react";
import { AiOutlineDelete } from "react-icons/ai";

interface IPropsDeleteIcon {
  onClick: () => void;
}

const DeleteIcon = ({ onClick }: IPropsDeleteIcon) => {
  return <AiOutlineDelete onClick={onClick} />;
};

export { DeleteIcon };
