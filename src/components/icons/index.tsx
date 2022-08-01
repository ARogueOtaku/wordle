import { ReactNode } from "react";

interface IIconProps {
  svg: ReactNode;
  width: number;
  height: number;
  viewBox?: string;
}

const Icon = ({ svg, width, height, viewBox }: IIconProps) => {
  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox={viewBox ?? `0 0 ${width} ${height}`}
    >
      {svg}
    </svg>
  );
};

export default Icon;
