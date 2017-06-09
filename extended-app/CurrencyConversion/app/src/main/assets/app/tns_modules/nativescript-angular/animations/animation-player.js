Object.defineProperty(exports, "__esModule", { value: true });
var keyframe_animation_1 = require("tns-core-modules/ui/animation/keyframe-animation");
var utils_1 = require("./utils");
var NativeScriptAnimationPlayer = (function () {
    function NativeScriptAnimationPlayer(target, keyframes, duration, delay, easing) {
        this.target = target;
        this.parentPlayer = null;
        this._startSubscriptions = [];
        this._doneSubscriptions = [];
        this._finished = false;
        this._started = false;
        this.initKeyframeAnimation(keyframes, duration, delay, easing);
    }
    NativeScriptAnimationPlayer.prototype.init = function () {
    };
    NativeScriptAnimationPlayer.prototype.hasStarted = function () {
        return this._started;
    };
    NativeScriptAnimationPlayer.prototype.onStart = function (fn) { this._startSubscriptions.push(fn); };
    NativeScriptAnimationPlayer.prototype.onDone = function (fn) { this._doneSubscriptions.push(fn); };
    NativeScriptAnimationPlayer.prototype.onDestroy = function (fn) { this._doneSubscriptions.push(fn); };
    NativeScriptAnimationPlayer.prototype.play = function () {
        var _this = this;
        if (!this.animation) {
            return;
        }
        if (!this._started) {
            this._started = true;
            this._startSubscriptions.forEach(function (fn) { return fn(); });
            this._startSubscriptions = [];
        }
        this.animation.play(this.target)
            .then(function () { return _this.onFinish(); })
            .catch(function (_e) { });
    };
    NativeScriptAnimationPlayer.prototype.pause = function () {
        throw new Error("AnimationPlayer.pause method is not supported!");
    };
    NativeScriptAnimationPlayer.prototype.finish = function () {
        throw new Error("AnimationPlayer.finish method is not supported!");
    };
    NativeScriptAnimationPlayer.prototype.reset = function () {
        if (this.animation && this.animation.isPlaying) {
            this.animation.cancel();
        }
    };
    NativeScriptAnimationPlayer.prototype.restart = function () {
        this.reset();
        this.play();
    };
    NativeScriptAnimationPlayer.prototype.destroy = function () {
        this.reset();
        this.onFinish();
    };
    NativeScriptAnimationPlayer.prototype.setPosition = function (_p) {
        throw new Error("AnimationPlayer.setPosition method is not supported!");
    };
    NativeScriptAnimationPlayer.prototype.getPosition = function () {
        return 0;
    };
    NativeScriptAnimationPlayer.prototype.initKeyframeAnimation = function (keyframes, duration, delay, easing) {
        var info = new keyframe_animation_1.KeyframeAnimationInfo();
        info.isForwards = true;
        info.iterations = 1;
        info.duration = duration === 0 ? 0.01 : duration;
        info.delay = delay;
        info.curve = utils_1.getAnimationCurve(easing);
        info.keyframes = keyframes.map(utils_1.parseAnimationKeyframe);
        this.animation = keyframe_animation_1.KeyframeAnimation.keyframeAnimationFromInfo(info);
    };
    NativeScriptAnimationPlayer.prototype.onFinish = function () {
        if (!this._finished) {
            this._finished = true;
            this._started = false;
            this._doneSubscriptions.forEach(function (fn) { return fn(); });
            this._doneSubscriptions = [];
        }
    };
    return NativeScriptAnimationPlayer;
}());
exports.NativeScriptAnimationPlayer = NativeScriptAnimationPlayer;
//# sourceMappingURL=animation-player.js.map