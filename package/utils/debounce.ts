/**
 * @desc 函数防抖
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param immediate true 表立即执行，false 表非立即执行
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait = 300,
  immediate = false
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null;

  return function debouncedFunction(...args: Parameters<T>): void {
    // @ts-ignore
    const context: any = this;

    timeoutId && clearTimeout(timeoutId);

    if (immediate) {
      let callNow = !timeoutId;
      timeoutId = setTimeout(() => {
        timeoutId = null;
      }, wait);
      if (callNow) func.apply(context, args);
    } else {
      timeoutId = setTimeout(() => {
        func.apply(context, args);
      }, wait);
    }
  };
}