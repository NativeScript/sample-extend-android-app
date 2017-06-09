var frame_1 = require("ui/frame");
var MyCustomNativeScriptFragment = (function (_super) {
    __extends(MyCustomNativeScriptFragment, _super);
    function MyCustomNativeScriptFragment() {
        _super.call(this);
        return global.__native(this);
    }
    MyCustomNativeScriptFragment.prototype.onHiddenChanged = function (hidden) {
        this._callbacks.onHiddenChanged(this, hidden, _super.prototype.onHiddenChanged);
    };
    MyCustomNativeScriptFragment.prototype.onCreateAnimator = function (transit, enter, nextAnim) {
        var result = this._callbacks.onCreateAnimator(this, transit, enter, nextAnim, _super.prototype.onCreateAnimator);
        return result;
    };
    MyCustomNativeScriptFragment.prototype.onCreate = function (savedInstanceState) {
        if (!this._callbacks) {
            frame_1.setFragmentCallbacks(this);
        }
        this.setHasOptionsMenu(true);
        this._callbacks.onCreate(this, savedInstanceState, _super.prototype.onCreate);
    };
    MyCustomNativeScriptFragment.prototype.onCreateView = function (inflater, container, savedInstanceState) {
        var result = this._callbacks.onCreateView(this, inflater, container, savedInstanceState, _super.prototype.onCreateView);
        return result;
    };
    MyCustomNativeScriptFragment.prototype.onSaveInstanceState = function (outState) {
        this._callbacks.onSaveInstanceState(this, outState, _super.prototype.onSaveInstanceState);
    };
    MyCustomNativeScriptFragment.prototype.onDestroyView = function () {
        this._callbacks.onDestroyView(this, _super.prototype.onDestroyView);
    };
    MyCustomNativeScriptFragment.prototype.onDestroy = function () {
        this._callbacks.onDestroy(this, _super.prototype.onDestroy);
    };
    MyCustomNativeScriptFragment.prototype.toString = function () {
        return this._callbacks.toStringOverride(this, _super.prototype.toString);
    };
    MyCustomNativeScriptFragment = __decorate([
        JavaProxy("org.nativescript.currencyconversion.MyCustomNativeScriptFragment")
    ], MyCustomNativeScriptFragment);
    return MyCustomNativeScriptFragment;
}(android.app.Fragment));
frame_1.setFragmentClass(MyCustomNativeScriptFragment);