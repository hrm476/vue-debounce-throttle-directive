/**
 * @description 防抖节流指令
 * @author: hruomei
 * @date: 2021-07-21 12:50:45
 * @demo
 * v-debounce.keydown.enter.prevent="() => handleKeyDown('enter')" // 如果要传参，这样写
 * v-debounce.keydown.up.prevent="handleKeyDown" // 如果默认接受event参数，可以直接这样写
 * v-debounce.keydown.down.prevent="[handleKeyDown, 1000, true]" // debounce传数组可以接收三个参数[func:执行函数，delay:延时时间，imediate:是否立即执行]
 * v-throttle.keydown.delete.prevent="() => handleKeyDown('delete')"
 *
 * v-debounce.click.stop="() => handleKeyDown('down')"
 * v-debounce.click.stop="handleKeyDown"
 * v-throttle.click.prevent="[handleKeyDown, 1000]" // throttle如果传递数组，接收两个参数[func:执行函数，delay:延时时间]
 */
import { debounce } from "./utils/debounce";
import { throttle } from "./utils/throttle";
import { ModifierHandler, keyCodes, keyNames } from "./constant";
/**
 * Create a cached version of a pure function.
 */
function cached(fn) {
    var cache = Object.create(null);
    return function cachedFn(str) {
        var hit = cache[str];
        return hit || (cache[str] = fn(str));
    };
}
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
    return str.replace(hyphenateRE, "-$1").toLowerCase();
});
function isKeyNotMatch(expect, actual) {
    if (Array.isArray(expect)) {
        return expect.indexOf(actual) === -1;
    }
    else {
        return expect !== actual;
    }
}
/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes(eventKeyCode, key, builtInKeyCode, eventKeyName, builtInKeyName) {
    var mappedKeyCode = builtInKeyCode;
    if (builtInKeyName && eventKeyName) {
        return isKeyNotMatch(builtInKeyName, eventKeyName);
    }
    else if (mappedKeyCode) {
        return isKeyNotMatch(mappedKeyCode, eventKeyCode);
    }
    else if (eventKeyName) {
        return hyphenate(eventKeyName) !== key;
    }
}
function genFilterCode($event, key) {
    var keyVal = parseInt(key, 10);
    if (keyVal)
        return $event.keyCode !== keyVal;
    var keyCode = keyCodes[key];
    var keyName = keyNames[key];
    return checkKeyCodes($event.keyCode, key, keyCode, $event.key, keyName);
}
// make sure the key filters only apply to KeyboardEvents
// key events that do not have keyCode property...
function needReturn4Codes($event, keys) {
    if ($event.type.indexOf("key") === -1)
        return false;
    var filterKeys = keys.filter(function (key) { return keyCodes[key] || keyNames[key]; });
    if (!filterKeys.length)
        return false;
    return filterKeys.every(function (key) { return genFilterCode($event, key); });
}
function needReturnModifiers($event, keys) {
    var filterModifiers = keys.filter(function (key) { return ModifierHandler[key]; });
    if (!filterModifiers.length)
        return false;
    return filterModifiers.some(function (key) { return ModifierHandler[key]($event) === null; });
}
export function handleDebounce(el, binding) {
    var bindingValue = binding.value; // func or [func, delay, immediate]
    if (!Array.isArray(binding.value)) {
        bindingValue = [bindingValue];
    }
    var func = bindingValue[0], _a = bindingValue[1], delay = _a === void 0 ? 500 : _a, _b = bindingValue[2], immediate = _b === void 0 ? true : _b;
    var decorators = binding.rawName.split(".");
    var event = decorators[1];
    var modifiers = decorators.slice(2);
    var actualFunc = debounce(func, delay, immediate);
    el.addEventListener(event, function ($event) {
        if (needReturn4Codes($event, modifiers))
            return null;
        if (needReturnModifiers($event, modifiers))
            return null;
        actualFunc($event);
    });
}
export function handleThrottle(el, binding) {
    var bindingValue = binding.value; // func or [func, delay, immediate]
    if (!Array.isArray(binding.value)) {
        bindingValue = [bindingValue];
    }
    var func = bindingValue[0], _a = bindingValue[1], delay = _a === void 0 ? 500 : _a;
    var decorators = binding.rawName.split(".");
    var event = decorators[1];
    var modifiers = decorators.slice(2);
    var actualFunc = throttle(func, delay);
    el.addEventListener(event, function ($event) {
        if (needReturn4Codes($event, modifiers))
            return null;
        if (needReturnModifiers($event, modifiers))
            return null;
        actualFunc($event);
    });
}
