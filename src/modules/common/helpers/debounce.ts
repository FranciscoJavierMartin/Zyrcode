// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function debounce(fn: Function, wait: number) {
  let timer: NodeJS.Timeout;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function (...args: any) {
    if (timer) {
      clearTimeout(timer);
    }
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this;
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, wait);
  };
}
