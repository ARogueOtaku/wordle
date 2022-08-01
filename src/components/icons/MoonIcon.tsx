import Icon from ".";

const MoonIcon = ({ width, height }: { width: number; height: number }) => {
  return (
    <Icon
      width={width}
      height={height}
      viewBox="0 0 20 20"
      svg={
        <>
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
        </>
      }
    ></Icon>
  );
};

export default MoonIcon;
