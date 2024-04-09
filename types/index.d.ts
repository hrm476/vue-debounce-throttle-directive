import { handleDebounce, handleThrottle } from "./directive";
interface InstallFunction {
    (Vue: any): void;
    installed?: boolean;
}
export declare const debounce: {
    inserted: typeof handleDebounce;
};
export declare const throttle: {
    inserted: typeof handleThrottle;
};
export declare const install: InstallFunction;
declare const _default: {
    install: InstallFunction;
};
export default _default;
