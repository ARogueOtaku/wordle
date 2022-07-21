export const wait = (time = 1000): Promise<void> => {
  return new Promise((resolve) => {
    window.setTimeout(resolve, time);
  });
};
