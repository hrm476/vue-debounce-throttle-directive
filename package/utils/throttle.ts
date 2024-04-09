/**
 * @function: throttle
 * @param: {Function} func 要执行的函数
 * @description: 当函数在短时间内多次触发时，做节流，间隔delay时长再去执行
 * @author: hruomei
 * @date: 2020-10-29 10:38:06
 * @version: V1.0.0
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  delay = 300
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null,
    startTime = Date.now();

  return function debouncedFunction(...args: Parameters<T>): void {
    let curTime = Date.now(),
      remaining = delay - (curTime - startTime),
      // @ts-ignore
      context = this;

    timeoutId && clearTimeout(timeoutId);

    if (remaining <= 0) {
      func.apply(context, args);
      startTime = Date.now();
    } else {
      timeoutId = setTimeout(() => {
        func.apply(context, args);
        startTime = Date.now();
      }, remaining);
    }
  };
}
