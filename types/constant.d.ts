export type KeyNameAlias = "esc" | "tab" | "enter" | "space" | "up" | "left" | "right" | "down" | "delete";
export type ModifierType = "stop" | "prevent" | "self" | "ctrl" | "shift" | "alt" | "meta" | "left" | "middle" | "right";
export type MouseEventType = KeyboardEvent | MouseEvent | TouchEvent;
export declare const keyCodes: Record<KeyNameAlias, number | number[]>;
export declare const keyNames: Record<KeyNameAlias, string | string[]>;
export declare const ModifierHandler: Record<ModifierType, Function>;
