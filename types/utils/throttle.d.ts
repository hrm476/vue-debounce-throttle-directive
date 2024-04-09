/**
 * @function: throttle
 * @param: {Function} func 要执行的函数
 * @description: 当函数在短时间内多次触发时，做节流，间隔delay时长再去执行
 * @author: hruomei
 * @date: 2020-10-29 10:38:06
 * @version: V1.0.0
 */
export declare function throttle<T extends (...args: any[]) => any>(func: T, delay?: number): (...args: Parameters<T>) => void;
