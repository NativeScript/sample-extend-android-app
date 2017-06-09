var frame_1 = require("ui/frame");
require("./MyCustomNativeScriptFragment");
var MyCustomNativeScriptActivity = (function (_super) {
    __extends(MyCustomNativeScriptActivity, _super);
    function MyCustomNativeScriptActivity() {
        _super.call(this);
        return global.__native(this);
    }
    MyCustomNativeScriptActivity.prototype.onCreate = function (savedInstanceState) {
        if (!this._callbacks) {
            frame_1.setActivityCallbacks(this);
        }
        this._callbacks.onCreate(this, savedInstanceState, _super.prototype.onCreate);
    };
    MyCustomNativeScriptActivity.prototype.onSaveInstanceState = function (outState) {
        this._callbacks.onSaveInstanceState(this, outState, _super.prototype.onSaveInstanceState);
    };
    MyCustomNativeScriptActivity.prototype.onStart = function () {
        this._callbacks.onStart(this, _super.prototype.onStart);
    };
    MyCustomNativeScriptActivity.prototype.onStop = function () {
        this._callbacks.onStop(this, _super.prototype.onStop);
    };
    MyCustomNativeScriptActivity.prototype.onDestroy = function () {
        this._callbacks.onDestroy(this, _super.prototype.onDestroy);
    };
    MyCustomNativeScriptActivity.prototype.onBackPressed = function () {
        this._callbacks.onBackPressed(this, _super.prototype.onBackPressed);
    };
    MyCustomNativeScriptActivity.prototype.onRequestPermissionsResult = function (requestCode, permissions, grantResults) {
        this._callbacks.onRequestPermissionsResult(this, requestCode, permissions, grantResults, undefined);
    };
    MyCustomNativeScriptActivity.prototype.onActivityResult = function (requestCode, resultCode, data) {
        this._callbacks.onActivityResult(this, requestCode, resultCode, data, _super.prototype.onActivityResult);
    };
    MyCustomNativeScriptActivity = __decorate([
        JavaProxy("org.nativescript.currencyconversion.MyCustomNativeScriptActivity")
    ], MyCustomNativeScriptActivity);
    return MyCustomNativeScriptActivity;
}(android.app.Activity));