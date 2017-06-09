Object.defineProperty(exports, "__esModule", { value: true });
var BaseValueAccessor = (function () {
    function BaseValueAccessor(view) {
        this.view = view;
        this.onChange = function (_) { };
        this.pendingChangeNotification = 0;
    }
    BaseValueAccessor.prototype.registerOnChange = function (fn) {
        var _this = this;
        this.onChange = function (arg) {
            if (_this.pendingChangeNotification) {
                clearTimeout(_this.pendingChangeNotification);
            }
            _this.pendingChangeNotification = setTimeout(function () {
                _this.pendingChangeNotification = 0;
                fn(arg);
            }, 20);
        };
    };
    BaseValueAccessor.prototype.writeValue = function (_) {
        //
    };
    BaseValueAccessor.prototype.registerOnTouched = function (_) {
        //
    };
    return BaseValueAccessor;
}());
exports.BaseValueAccessor = BaseValueAccessor;
//# sourceMappingURL=base-value-accessor.js.map