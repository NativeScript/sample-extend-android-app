Object.defineProperty(exports, "__esModule", { value: true });
var animation_player_1 = require("./animation-player");
var AnimationDriver = (function () {
    function AnimationDriver() {
    }
    return AnimationDriver;
}());
exports.AnimationDriver = AnimationDriver;
var NativeScriptAnimationDriver = (function () {
    function NativeScriptAnimationDriver() {
    }
    NativeScriptAnimationDriver.prototype.computeStyle = function (element, prop) {
        return element.style["css-" + prop];
    };
    NativeScriptAnimationDriver.prototype.animate = function (element, keyframes, duration, delay, easing) {
        return new animation_player_1.NativeScriptAnimationPlayer(element, keyframes, duration, delay, easing);
    };
    return NativeScriptAnimationDriver;
}());
exports.NativeScriptAnimationDriver = NativeScriptAnimationDriver;
//# sourceMappingURL=animation-driver.js.map