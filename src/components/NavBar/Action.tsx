import { ReactNode } from "react";

export interface IActionProps {
  onClick: () => void;
  icon?: ReactNode;
  highlight?: boolean;
}

const Action = ({ onClick, icon, highlight = false }: IActionProps) => {
  return (
    <button className={`action${highlight ? " highlight" : ""}`} onClick={onClick}>
      {icon ?? icon}
    </button>
  );
};

export default Action;
