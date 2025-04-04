// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const debounce = (fn: Function, wait: number) => {
  let timer: NodeJS.Timeout;

  return (...args: unknown[]) => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      fn.apply(this, args);
    }, wait);
  };
};
