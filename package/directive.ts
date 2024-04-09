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
import type { KeyNameAlias, ModifierType, MouseEventType } from "./constant";

/**
 * Create a cached version of a pure function.
 */
function cached(fn: (str: string) => string) {
  const cache = Object.create(null);
  return function cachedFn(str: string) {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cached(function (str: string) {
  return str.replace(hyphenateRE, "-$1").toLowerCase();
});

function isKeyNotMatch<T>(expect: T | T[], actual: T) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1;
  } else {
    return expect !== actual;
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes(
  eventKeyCode: number,
  key: KeyNameAlias,
  builtInKeyCode: number | number[],
  eventKeyName: string,
  builtInKeyName: string | string[]
) {
  const mappedKeyCode = builtInKeyCode;
  if (builtInKeyName && eventKeyName) {
    return isKeyNotMatch(builtInKeyName, eventKeyName);
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode);
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key;
  }
}

function genFilterCode($event: MouseEventType, key: KeyNameAlias) {
  const keyVal = parseInt(key, 10);
  if (keyVal) return (<KeyboardEvent>$event).keyCode !== keyVal;
  const keyCode = keyCodes[key];
  const keyName = keyNames[key];
  return checkKeyCodes(
    (<KeyboardEvent>$event).keyCode,
    key,
    keyCode,
    (<KeyboardEvent>$event).key,
    keyName
  );
}

// make sure the key filters only apply to KeyboardEvents
// key events that do not have keyCode property...
function needReturn4Codes($event: MouseEventType, keys: KeyNameAlias[]) {
  if ($event.type.indexOf("key") === -1) return false;
  const filterKeys = keys.filter((key) => keyCodes[key] || keyNames[key]);
  if (!filterKeys.length) return false;
  return filterKeys.every((key) => genFilterCode($event, key));
}

function needReturnModifiers($event: MouseEventType, keys: ModifierType[]) {
  const filterModifiers = keys.filter((key) => ModifierHandler[key]);
  if (!filterModifiers.length) return false;
  return filterModifiers.some((key) => ModifierHandler[key]($event) === null);
}

export function handleDebounce(el: HTMLElement, binding: any) {
  let bindingValue = binding.value; // func or [func, delay, immediate]

  if (!Array.isArray(binding.value)) {
    bindingValue = [bindingValue];
  }

  const [func, delay = 500, immediate = true] = bindingValue;
  const decorators = binding.rawName.split(".");
  const event = decorators[1];
  const modifiers = decorators.slice(2);
  const actualFunc = debounce(func, delay, immediate);

  el.addEventListener(event, ($event: MouseEventType) => {
    if (needReturn4Codes($event, modifiers)) return null;
    if (needReturnModifiers($event, modifiers)) return null;
    actualFunc($event);
  });
}

export function handleThrottle(el: HTMLElement, binding: any) {
  let bindingValue = binding.value; // func or [func, delay, immediate]

  if (!Array.isArray(binding.value)) {
    bindingValue = [bindingValue];
  }

  const [func, delay = 500] = bindingValue;
  const decorators = binding.rawName.split(".");
  const event = decorators[1];
  const modifiers = decorators.slice(2);
  const actualFunc = throttle(func, delay);

  el.addEventListener(event, ($event: MouseEventType) => {
    if (needReturn4Codes($event, modifiers)) return null;
    if (needReturnModifiers($event, modifiers)) return null;
    actualFunc($event);
  });
}
