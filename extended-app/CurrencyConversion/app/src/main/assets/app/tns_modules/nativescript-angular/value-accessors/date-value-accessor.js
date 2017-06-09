Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var lang_facade_1 = require("../lang-facade");
var base_value_accessor_1 = require("./base-value-accessor");
var DATE_VALUE_ACCESSOR = { provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return DateValueAccessor; }), multi: true };
/**
 * The accessor for setting a date and listening to changes that is used by the
 * {@link NgModel} directives.
 *
 *  ### Example
 *  ```
 *  <DatePicker [(ngModel)]="model.test">
 *  ```
 */
var DateValueAccessor = (function (_super) {
    __extends(DateValueAccessor, _super);
    function DateValueAccessor(elementRef) {
        var _this = _super.call(this, elementRef.nativeElement) || this;
        _this.onTouched = function () { };
        return _this;
    }
    DateValueAccessor.prototype.dateChangeListener = function (event) {
        this.onChange(event.value);
    };
    DateValueAccessor.prototype.writeValue = function (value) {
        var normalizedValue = lang_facade_1.isBlank(value) ? new Date() : value;
        if (!lang_facade_1.isDate(normalizedValue)) {
            if (typeof normalizedValue === "string") {
                normalizedValue = new Date(normalizedValue);
            }
            else if (typeof normalizedValue === "number") {
                normalizedValue = new Date(normalizedValue);
            }
            if (!lang_facade_1.isDate(normalizedValue)) {
                normalizedValue = new Date();
            }
        }
        this.view.date = normalizedValue;
    };
    DateValueAccessor.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    return DateValueAccessor;
}(base_value_accessor_1.BaseValueAccessor));
__decorate([
    core_1.HostListener("dateChange", ["$event"]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DateValueAccessor.prototype, "dateChangeListener", null);
DateValueAccessor = __decorate([
    core_1.Directive({
        // tslint:disable-next-line:max-line-length directive-selector
        selector: "DatePicker[ngModel], DatePicker[formControlName], datePicker[ngModel], datePicker[formControlName], date-picker[ngModel], date-picker[formControlName]",
        providers: [DATE_VALUE_ACCESSOR]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], DateValueAccessor);
exports.DateValueAccessor = DateValueAccessor;
//# sourceMappingURL=date-value-accessor.js.map