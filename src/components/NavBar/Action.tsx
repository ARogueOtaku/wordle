import { ReactNode } from "react";

export interface IActionProps {
  onClick: () => void;
  icon?: ReactNode;
  highlight?: boolean;
  title?: string;
}

const Action = ({ onClick, icon, highlight = false, title }: IActionProps) => {
  return (
    <button type="button" title={title ?? ""} className={`action${highlight ? " highlight" : ""}`} onClick={onClick}>
      {icon ?? icon}
    </button>
  );
};

export default Action;
