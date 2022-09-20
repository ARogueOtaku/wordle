import { useEffect, useState } from "react";

const useMediaQuery = (query: string) => {
  const [match, setMatch] = useState<boolean>(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const matchSetter = () => setMatch(mediaQueryList.matches);
    matchSetter();
    mediaQueryList.addEventListener("change", matchSetter);
    return () => mediaQueryList.removeEventListener("change", matchSetter);
  }, [query]);

  return match;
};

export default useMediaQuery;
