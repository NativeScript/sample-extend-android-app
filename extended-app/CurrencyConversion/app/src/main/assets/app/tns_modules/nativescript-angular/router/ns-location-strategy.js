Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var trace_1 = require("../trace");
var lang_facade_1 = require("../lang-facade");
var platform_providers_1 = require("../platform-providers");
var defaultNavOptions = {
    clearHistory: false,
    animated: true
};
var NSLocationStrategy = /** @class */ (function (_super) {
    __extends(NSLocationStrategy, _super);
    function NSLocationStrategy(frameService) {
        var _this = _super.call(this) || this;
        _this.frameService = frameService;
        _this.statesByOutlet = {};
        _this.popStateCallbacks = new Array();
        _this._isPageNavigationBack = false;
        _this._isModalClosing = false;
        _this._isModalNavigation = false;
        trace_1.routerLog("NSLocationStrategy.constructor()");
        return _this;
    }
    NSLocationStrategy.prototype.path = function () {
        if (!this.currentUrlTree) {
            return "/";
        }
        var state = this.peekState(this.currentOutlet);
        if (!state) {
            return "/";
        }
        var tree = this.currentUrlTree;
        // Handle case where the user declares a component at path "/".
        // The url serializer doesn't parse this url as having a primary outlet.
        if (state.isRootSegmentGroup) {
            tree.root = state.segmentGroup;
        }
        else {
            tree.root.children[this.currentOutlet] = state.segmentGroup;
        }
        var urlSerializer = new router_1.DefaultUrlSerializer();
        var url = urlSerializer.serialize(tree);
        trace_1.routerLog("NSLocationStrategy.path(): " + url);
        return url;
    };
    NSLocationStrategy.prototype.prepareExternalUrl = function (internal) {
        trace_1.routerLog("NSLocationStrategy.prepareExternalUrl() internal: " + internal);
        return internal;
    };
    NSLocationStrategy.prototype.pushState = function (state, title, url, queryParams) {
        trace_1.routerLog("NSLocationStrategy.pushState state: " +
            (state + ", title: " + title + ", url: " + url + ", queryParams: " + queryParams));
        this.pushStateInternal(state, title, url, queryParams);
    };
    NSLocationStrategy.prototype.pushStateInternal = function (state, title, url, queryParams) {
        var _this = this;
        var urlSerializer = new router_1.DefaultUrlSerializer();
        var stateUrlTree = urlSerializer.parse(url);
        var rootOutlets = stateUrlTree.root.children;
        this.currentUrlTree = stateUrlTree;
        // Handle case where the user declares a component at path "/".
        // The url serializer doesn't parse this url as having a primary outlet.
        if (!Object.keys(rootOutlets).length) {
            var outletStates = this.statesByOutlet["primary"] = this.statesByOutlet["primary"] || [];
            var isNewPage = outletStates.length === 0;
            outletStates.push({
                state: state,
                title: title,
                queryParams: queryParams,
                segmentGroup: stateUrlTree.root,
                isRootSegmentGroup: true,
                isPageNavigation: isNewPage,
                isModalNavigation: false
            });
            this.currentOutlet = "primary";
        }
        Object.keys(rootOutlets).forEach(function (outletName) {
            var outletStates = _this.statesByOutlet[outletName] = _this.statesByOutlet[outletName] || [];
            var isNewPage = outletStates.length === 0;
            var lastState = _this.peekState(outletName);
            if (!lastState || lastState.segmentGroup.toString() !== rootOutlets[outletName].toString()) {
                outletStates.push({
                    state: state,
                    title: title,
                    queryParams: queryParams,
                    segmentGroup: rootOutlets[outletName],
                    isRootSegmentGroup: false,
                    isPageNavigation: isNewPage,
                    isModalNavigation: false
                });
                _this.currentOutlet = outletName;
            }
        });
    };
    NSLocationStrategy.prototype.replaceState = function (state, title, url, queryParams) {
        var _this = this;
        var states = this.statesByOutlet[this.currentOutlet];
        if (states && states.length > 0) {
            trace_1.routerLog("NSLocationStrategy.replaceState changing existing state: " +
                (state + ", title: " + title + ", url: " + url + ", queryParams: " + queryParams));
            var tree = this.currentUrlTree;
            if (url !== tree.toString()) {
                var urlSerializer = new router_1.DefaultUrlSerializer();
                var stateUrlTree = urlSerializer.parse(url);
                var rootOutlets_1 = stateUrlTree.root.children;
                Object.keys(rootOutlets_1).forEach(function (outletName) {
                    var topState = _this.peekState(outletName);
                    topState.segmentGroup = rootOutlets_1[outletName];
                    topState.state = state;
                    topState.title = title;
                    topState.queryParams = queryParams;
                });
            }
        }
        else {
            trace_1.routerLog("NSLocationStrategy.replaceState pushing new state: " +
                (state + ", title: " + title + ", url: " + url + ", queryParams: " + queryParams));
            this.pushStateInternal(state, title, url, queryParams);
        }
    };
    NSLocationStrategy.prototype.forward = function () {
        throw new Error("NSLocationStrategy.forward() - not implemented");
    };
    NSLocationStrategy.prototype.back = function () {
        if (this._isModalClosing) {
            var states = this.statesByOutlet[this.currentOutlet];
            // We are closing modal view
            // clear the stack until we get to the page that opened the modal view
            var state = void 0;
            var modalStatesCleared = false;
            var count = 1;
            while (!modalStatesCleared) {
                state = this.peekState(this.currentOutlet);
                if (!state) {
                    modalStatesCleared = true;
                    this.callPopState(null, true);
                    continue;
                }
                if (!state.isModalNavigation) {
                    states.pop();
                    count++;
                }
                else {
                    modalStatesCleared = true;
                    state.isModalNavigation = false;
                }
            }
            trace_1.routerLog("NSLocationStrategy.back() while closing modal. States popped: " + count);
            if (state) {
                this.callPopState(state, true);
            }
        }
        else if (this._isPageNavigationBack) {
            var states = this.statesByOutlet[this.currentOutlet];
            // We are navigating to the previous page
            // clear the stack until we get to a page navigation state
            var state = states.pop();
            var count = 1;
            while (!state.isPageNavigation) {
                state = states.pop();
                count++;
            }
            trace_1.routerLog("NSLocationStrategy.back() while navigating back. States popped: " + count);
            this.callPopState(state, true);
        }
        else {
            var state = this.peekState(this.currentOutlet);
            if (state.isPageNavigation) {
                // This was a page navigation - so navigate through frame.
                trace_1.routerLog("NSLocationStrategy.back() while not navigating back but top" +
                    " state is page - will call frame.goBack()");
                var frame = this.frameService.getFrame();
                frame.goBack();
            }
            else {
                // Nested navigation - just pop the state
                trace_1.routerLog("NSLocationStrategy.back() while not navigating back but top" +
                    " state is not page - just pop");
                this.callPopState(this.statesByOutlet[this.currentOutlet].pop(), true);
            }
        }
    };
    NSLocationStrategy.prototype.canGoBack = function () {
        return this.statesByOutlet[this.currentOutlet].length > 1;
    };
    NSLocationStrategy.prototype.onPopState = function (fn) {
        trace_1.routerLog("NSLocationStrategy.onPopState");
        this.popStateCallbacks.push(fn);
    };
    NSLocationStrategy.prototype.getBaseHref = function () {
        trace_1.routerLog("NSLocationStrategy.getBaseHref()");
        return "";
    };
    NSLocationStrategy.prototype.callPopState = function (state, pop) {
        if (pop === void 0) { pop = true; }
        var urlSerializer = new router_1.DefaultUrlSerializer();
        if (state) {
            this.currentUrlTree.root.children[this.currentOutlet] = state.segmentGroup;
        }
        else {
            // when closing modal view there are scenarios (e.g. root viewContainerRef) when we need
            // to clean up the named page router outlet to make sure we will open the modal properly again if needed.
            delete this.statesByOutlet[this.currentOutlet];
            delete this.currentUrlTree.root.children[this.currentOutlet];
            this.currentOutlet = Object.keys(this.statesByOutlet)[0];
        }
        var url = urlSerializer.serialize(this.currentUrlTree);
        var change = { url: url, pop: pop };
        for (var _i = 0, _a = this.popStateCallbacks; _i < _a.length; _i++) {
            var fn = _a[_i];
            fn(change);
        }
    };
    NSLocationStrategy.prototype.peekState = function (name) {
        var states = this.statesByOutlet[name] || [];
        if (states.length > 0) {
            return states[states.length - 1];
        }
        return null;
    };
    NSLocationStrategy.prototype.toString = function () {
        var _this = this;
        var result = [];
        Object.keys(this.statesByOutlet).forEach(function (outletName) {
            var outletStates = _this.statesByOutlet[outletName];
            var outletLog = outletStates
                .map(function (v, i) { return outletName + "." + i + ".[" + (v.isPageNavigation ? "PAGE" : "INTERNAL") + "].[" + (v.isModalNavigation ? "MODAL" : "BASE") + "] \"" + v.segmentGroup.toString() + "\""; })
                .reverse();
            result = result.concat(outletLog);
        });
        return result.join("\n");
    };
    // Methods for syncing with page navigation in PageRouterOutlet
    NSLocationStrategy.prototype._beginBackPageNavigation = function (name) {
        trace_1.routerLog("NSLocationStrategy.startGoBack()");
        if (this._isPageNavigationBack) {
            throw new Error("Calling startGoBack while going back.");
        }
        this._isPageNavigationBack = true;
        this.currentOutlet = name;
    };
    NSLocationStrategy.prototype._finishBackPageNavigation = function () {
        trace_1.routerLog("NSLocationStrategy.finishBackPageNavigation()");
        if (!this._isPageNavigationBack) {
            throw new Error("Calling endGoBack while not going back.");
        }
        this._isPageNavigationBack = false;
    };
    NSLocationStrategy.prototype._isPageNavigatingBack = function () {
        return this._isPageNavigationBack;
    };
    NSLocationStrategy.prototype._beginModalNavigation = function () {
        trace_1.routerLog("NSLocationStrategy._beginModalNavigation()");
        var lastState = this.peekState(this.currentOutlet);
        if (lastState) {
            lastState.isModalNavigation = true;
        }
        this._isModalNavigation = true;
    };
    NSLocationStrategy.prototype._beginCloseModalNavigation = function () {
        trace_1.routerLog("NSLocationStrategy.startCloseModal()");
        if (this._isModalClosing) {
            throw new Error("Calling startCloseModal while closing modal.");
        }
        this._isModalClosing = true;
    };
    NSLocationStrategy.prototype._finishCloseModalNavigation = function () {
        trace_1.routerLog("NSLocationStrategy.finishCloseModalNavigation()");
        if (!this._isModalClosing) {
            throw new Error("Calling startCloseModal while not closing modal.");
        }
        this._isModalNavigation = false;
        this._isModalClosing = false;
    };
    NSLocationStrategy.prototype._beginPageNavigation = function (name) {
        trace_1.routerLog("NSLocationStrategy._beginPageNavigation()");
        var lastState = this.peekState(name);
        if (lastState) {
            lastState.isPageNavigation = true;
        }
        this.currentOutlet = name;
        var navOptions = this._currentNavigationOptions || defaultNavOptions;
        if (navOptions.clearHistory) {
            trace_1.routerLog("NSLocationStrategy._beginPageNavigation clearing states history");
            this.statesByOutlet[name] = [lastState];
        }
        this._currentNavigationOptions = undefined;
        return navOptions;
    };
    NSLocationStrategy.prototype._setNavigationOptions = function (options) {
        this._currentNavigationOptions = {
            clearHistory: lang_facade_1.isPresent(options.clearHistory) ? options.clearHistory : false,
            animated: lang_facade_1.isPresent(options.animated) ? options.animated : true,
            transition: options.transition
        };
        trace_1.routerLog("NSLocationStrategy._setNavigationOptions(" +
            (JSON.stringify(this._currentNavigationOptions) + ")"));
    };
    NSLocationStrategy.prototype._getStates = function () {
        return this.statesByOutlet;
    };
    NSLocationStrategy.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    NSLocationStrategy.ctorParameters = function () { return [
        { type: platform_providers_1.FrameService }
    ]; };
    return NSLocationStrategy;
}(common_1.LocationStrategy));
exports.NSLocationStrategy = NSLocationStrategy;
//# sourceMappingURL=ns-location-strategy.js.map