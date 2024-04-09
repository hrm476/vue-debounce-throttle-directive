import { handleDebounce, handleThrottle } from "./directive";

interface InstallFunction {
  (Vue: any): void;
  installed?: boolean;
}

export const debounce = {
  inserted: handleDebounce,
};

export const throttle = {
  inserted: handleThrottle,
};

export const install: InstallFunction = function (Vue: any) {
  if (install.installed) return;
  install.installed = true;
  Vue.directive("debounce", debounce);
  Vue.directive("throttle", throttle);
};

export default {
  install,
};
