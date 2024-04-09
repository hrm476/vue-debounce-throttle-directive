import { handleDebounce, handleThrottle } from "./directive";
export var debounce = {
    inserted: handleDebounce,
};
export var throttle = {
    inserted: handleThrottle,
};
export var install = function (Vue) {
    if (install.installed)
        return;
    install.installed = true;
    Vue.directive("debounce", debounce);
    Vue.directive("throttle", throttle);
};
export default {
    install: install,
};
