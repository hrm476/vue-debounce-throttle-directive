/**
 * @desc 函数防抖
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param immediate true 表立即执行，false 表非立即执行
 */
export function debounce(func, wait, immediate) {
    if (wait === void 0) { wait = 300; }
    if (immediate === void 0) { immediate = false; }
    var timeoutId;
    return function debouncedFunction() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        // @ts-ignore
        var context = this;
        timeoutId && clearTimeout(timeoutId);
        if (immediate) {
            var callNow = !timeoutId;
            timeoutId = setTimeout(function () {
                timeoutId = null;
            }, wait);
            if (callNow)
                func.apply(context, args);
        }
        else {
            timeoutId = setTimeout(function () {
                func.apply(context, args);
            }, wait);
        }
    };
}
