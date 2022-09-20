import { ReactNode } from "react";

interface IIconProps {
  svg: ReactNode;
  width: number;
  height: number;
  viewBox?: string;
  fill?: string;
  stroke?: string;
}

const Icon = ({ svg, width, height, viewBox, fill = "currentColor", stroke = "none" }: IIconProps) => {
  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      fill={fill}
      stroke={stroke}
      viewBox={viewBox ?? `0 0 ${width} ${height}`}
    >
      {svg}
    </svg>
  );
};

export default Icon;
