/**
 * @function: throttle
 * @param: {Function} func 要执行的函数
 * @description: 当函数在短时间内多次触发时，做节流，间隔delay时长再去执行
 * @author: hruomei
 * @date: 2020-10-29 10:38:06
 * @version: V1.0.0
 */
export function throttle(func, delay) {
    if (delay === void 0) { delay = 300; }
    var timeoutId, startTime = Date.now();
    return function debouncedFunction() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var curTime = Date.now(), remaining = delay - (curTime - startTime), 
        // @ts-ignore
        context = this;
        timeoutId && clearTimeout(timeoutId);
        if (remaining <= 0) {
            func.apply(context, args);
            startTime = Date.now();
        }
        else {
            timeoutId = setTimeout(function () {
                func.apply(context, args);
                startTime = Date.now();
            }, remaining);
        }
    };
}
