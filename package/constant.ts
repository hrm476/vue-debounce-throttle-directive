export type KeyNameAlias =
  | "esc"
  | "tab"
  | "enter"
  | "space"
  | "up"
  | "left"
  | "right"
  | "down"
  | "delete";

export type ModifierType =
  | "stop"
  | "prevent"
  | "self"
  | "ctrl"
  | "shift"
  | "alt"
  | "meta"
  | "left"
  | "middle"
  | "right";

export type MouseEventType = KeyboardEvent | MouseEvent | TouchEvent;

// KeyboardEvent.keyCode aliases
export const keyCodes: Record<KeyNameAlias, number | number[]> = {
  esc: 27,
  tab: 9,
  enter: 13,
  space: 32,
  up: 38,
  left: 37,
  right: 39,
  down: 40,
  delete: [8, 46],
};

// KeyboardEvent.key aliases
export const keyNames: Record<KeyNameAlias, string | string[]> = {
  esc: ["Esc", "Escape"],
  tab: "Tab",
  enter: "Enter",
  space: [" ", "Spacebar"],
  up: ["Up", "ArrowUp"],
  left: ["Left", "ArrowLeft"],
  right: ["Right", "ArrowRight"],
  down: ["Down", "ArrowDown"],
  delete: ["Backspace", "Delete", "Del"],
};

export const ModifierHandler: Record<ModifierType, Function> = {
  stop($event: MouseEventType) {
    $event.stopPropagation();
  },
  prevent($event: MouseEventType) {
    $event.preventDefault();
  },
  self($event: MouseEventType) {
    if ($event.target !== $event.currentTarget) return null;
  },
  ctrl($event: MouseEventType) {
    if (!$event.ctrlKey) return null;
  },
  shift($event: MouseEventType) {
    if (!$event.shiftKey) return null;
  },
  alt($event: MouseEventType) {
    if (!$event.altKey) return null;
  },
  meta($event: MouseEventType) {
    if (!$event.metaKey) return null;
  },
  left($event: MouseEventType) {
    if ("button" in $event && $event.button !== 0) return null;
  },
  middle($event: MouseEventType) {
    if ("button" in $event && $event.button !== 1) return null;
  },
  right($event: MouseEventType) {
    if ("button" in $event && $event.button !== 2) return null;
  },
};
