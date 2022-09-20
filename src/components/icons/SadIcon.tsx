import Icon from ".";

const SadIcon = ({ width, height }: { width: number; height: number }) => {
  return (
    <Icon
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      svg={
        <>
          <path
            strokeLinecap="round"
            strokeWidth="2"
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </>
      }
    ></Icon>
  );
};

export default SadIcon;
