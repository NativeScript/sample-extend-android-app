Object.defineProperty(exports, "__esModule", { value: true });
var animations_1 = require("@angular/animations");
var view_1 = require("tns-core-modules/ui/core/view");
// overriden to use the default 'unsetValue'
// instead of empty string ''
function eraseStylesOverride(element, styles) {
    if (element["style"]) {
        Object.keys(styles).forEach(function (prop) {
            element.style[prop] = view_1.unsetValue;
        });
    }
}
exports.eraseStylesOverride = eraseStylesOverride;
function cssClasses(element) {
    if (!element.ngCssClasses) {
        element.ngCssClasses = new Map();
    }
    return element.ngCssClasses;
}
exports.cssClasses = cssClasses;
// The following functions are from
// the original DomAnimationEngine
function getOrSetAsInMap(map, key, defaultValue) {
    var value = map.get(key);
    if (!value) {
        map.set(key, value = defaultValue);
    }
    return value;
}
exports.getOrSetAsInMap = getOrSetAsInMap;
function deleteFromArrayMap(map, key, value) {
    var arr = map.get(key);
    if (arr) {
        var index = arr.indexOf(value);
        if (index >= 0) {
            arr.splice(index, 1);
            if (arr.length === 0) {
                map.delete(key);
            }
        }
    }
}
exports.deleteFromArrayMap = deleteFromArrayMap;
function optimizeGroupPlayer(players) {
    switch (players.length) {
        case 0:
            return new animations_1.NoopAnimationPlayer();
        case 1:
            return players[0];
        default:
            return new animations_1.ɵAnimationGroupPlayer(players);
    }
}
exports.optimizeGroupPlayer = optimizeGroupPlayer;
function copyArray(source) {
    return source ? source.splice(0) : [];
}
exports.copyArray = copyArray;
function makeAnimationEvent(element, triggerName, fromState, toState, phaseName, totalTime) {
    return { element: element, triggerName: triggerName, fromState: fromState, toState: toState, phaseName: phaseName, totalTime: totalTime };
}
exports.makeAnimationEvent = makeAnimationEvent;
function setStyles(element, styles) {
    if (element["style"]) {
        Object.keys(styles).forEach(function (prop) { return element.style[prop] = styles[prop]; });
    }
}
exports.setStyles = setStyles;
//# sourceMappingURL=dom-utils.js.map