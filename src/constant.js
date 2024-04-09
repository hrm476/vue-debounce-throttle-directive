// KeyboardEvent.keyCode aliases
export var keyCodes = {
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
export var keyNames = {
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
export var ModifierHandler = {
    stop: function ($event) {
        $event.stopPropagation();
    },
    prevent: function ($event) {
        $event.preventDefault();
    },
    self: function ($event) {
        if ($event.target !== $event.currentTarget)
            return null;
    },
    ctrl: function ($event) {
        if (!$event.ctrlKey)
            return null;
    },
    shift: function ($event) {
        if (!$event.shiftKey)
            return null;
    },
    alt: function ($event) {
        if (!$event.altKey)
            return null;
    },
    meta: function ($event) {
        if (!$event.metaKey)
            return null;
    },
    left: function ($event) {
        if ("button" in $event && $event.button !== 0)
            return null;
    },
    middle: function ($event) {
        if ("button" in $event && $event.button !== 1)
            return null;
    },
    right: function ($event) {
        if ("button" in $event && $event.button !== 2)
            return null;
    },
};
