Object.defineProperty(exports, "__esModule", { value: true });
var browser_1 = require("@angular/animations/browser");
var dom_utils_1 = require("./dom-utils");
var MARKED_FOR_ANIMATION_CLASSNAME = "ng-animating";
var MARKED_FOR_ANIMATION_SELECTOR = ".ng-animating";
// we are extending Angular's animation engine and
// overriding a few methods that work on the DOM
var NativeScriptAnimationEngine = (function (_super) {
    __extends(NativeScriptAnimationEngine, _super);
    function NativeScriptAnimationEngine() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // this method is almost completely copied from
    // the original animation engine, just replaced
    // a few method invocations with overriden ones
    NativeScriptAnimationEngine.prototype.animateTransition = function (element, instruction) {
        var _this = this;
        var triggerName = instruction.triggerName;
        var previousPlayers;
        if (instruction.isRemovalTransition) {
            previousPlayers = this._onRemovalTransitionOverride(element);
        }
        else {
            previousPlayers = [];
            var existingTransitions = this._getTransitionAnimation(element);
            var existingPlayer = existingTransitions ? existingTransitions[triggerName] : null;
            if (existingPlayer) {
                previousPlayers.push(existingPlayer);
            }
        }
        // it's important to do this step before destroying the players
        // so that the onDone callback below won"t fire before this
        dom_utils_1.eraseStylesOverride(element, instruction.fromStyles);
        // we first run this so that the previous animation player
        // data can be passed into the successive animation players
        var totalTime = 0;
        var players = instruction.timelines.map(function (timelineInstruction, i) {
            totalTime = Math.max(totalTime, timelineInstruction.totalTime);
            return _this._buildPlayer(element, timelineInstruction, previousPlayers, i);
        });
        previousPlayers.forEach(function (previousPlayer) { return previousPlayer.destroy(); });
        var player = dom_utils_1.optimizeGroupPlayer(players);
        player.onDone(function () {
            player.destroy();
            var elmTransitionMap = _this._getTransitionAnimation(element);
            if (elmTransitionMap) {
                delete elmTransitionMap[triggerName];
                if (Object.keys(elmTransitionMap).length === 0) {
                    _this._activeTransitionAnimations.delete(element);
                }
            }
            dom_utils_1.deleteFromArrayMap(_this._activeElementAnimations, element, player);
            dom_utils_1.setStyles(element, instruction.toStyles);
        });
        var elmTransitionMap = dom_utils_1.getOrSetAsInMap(this._activeTransitionAnimations, element, {});
        elmTransitionMap[triggerName] = player;
        this._queuePlayerOverride(element, triggerName, player, dom_utils_1.makeAnimationEvent(element, triggerName, instruction.fromState, instruction.toState, null, // this will be filled in during event creation
        totalTime));
        return player;
    };
    // overriden to use eachChild method of View
    // instead of DOM querySelectorAll
    NativeScriptAnimationEngine.prototype._onRemovalTransitionOverride = function (element) {
        // when a parent animation is set to trigger a removal we want to
        // find all of the children that are currently animating and clear
        // them out by destroying each of them.
        var elms = [];
        element.eachChild(function (child) {
            if (dom_utils_1.cssClasses(child).get(MARKED_FOR_ANIMATION_SELECTOR)) {
                elms.push(child);
            }
            return true;
        });
        var _loop_1 = function (i) {
            var elm = elms[i];
            var activePlayers = this_1._getElementAnimation(elm);
            if (activePlayers) {
                activePlayers.forEach(function (player) { return player.destroy(); });
            }
            var activeTransitions = this_1._getTransitionAnimation(elm);
            if (activeTransitions) {
                Object.keys(activeTransitions).forEach(function (triggerName) {
                    var player = activeTransitions[triggerName];
                    if (player) {
                        player.destroy();
                    }
                });
            }
        };
        var this_1 = this;
        for (var i = 0; i < elms.length; i++) {
            _loop_1(i);
        }
        // we make a copy of the array because the actual source array is modified
        // each time a player is finished/destroyed (the forEach loop would fail otherwise)
        return dom_utils_1.copyArray(this._getElementAnimation(element));
    };
    // overriden to use cssClasses method to access native element's styles
    // instead of DOM element's classList
    NativeScriptAnimationEngine.prototype._queuePlayerOverride = function (element, triggerName, player, event) {
        var tuple = { element: element, player: player, triggerName: triggerName, event: event };
        this._queuedTransitionAnimations.push(tuple);
        player.init();
        dom_utils_1.cssClasses(element).set(MARKED_FOR_ANIMATION_CLASSNAME, true);
        player.onDone(function () { return dom_utils_1.cssClasses(element).set(MARKED_FOR_ANIMATION_CLASSNAME, false); });
    };
    NativeScriptAnimationEngine.prototype._getElementAnimation = function (element) {
        return this._activeElementAnimations.get(element);
    };
    NativeScriptAnimationEngine.prototype._getTransitionAnimation = function (element) {
        return this._activeTransitionAnimations.get(element);
    };
    return NativeScriptAnimationEngine;
}(browser_1.ɵDomAnimationEngine));
exports.NativeScriptAnimationEngine = NativeScriptAnimationEngine;
//# sourceMappingURL=animation-engine.js.map