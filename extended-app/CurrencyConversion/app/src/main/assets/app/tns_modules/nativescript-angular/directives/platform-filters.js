Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_1 = require("tns-core-modules/platform");
var platform_providers_1 = require("../platform-providers");
var AndroidFilterComponent = /** @class */ (function () {
    function AndroidFilterComponent(device) {
        this.show = (device.os === platform_1.platformNames.android);
    }
    AndroidFilterComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: "android",
                    template: "<ng-content *ngIf=\"show\"></ng-content>",
                },] },
    ];
    /** @nocollapse */
    AndroidFilterComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: core_1.Inject, args: [platform_providers_1.DEVICE,] }] }
    ]; };
    return AndroidFilterComponent;
}());
exports.AndroidFilterComponent = AndroidFilterComponent;
var IosFilterComponent = /** @class */ (function () {
    function IosFilterComponent(device) {
        this.show = (device.os === platform_1.platformNames.ios);
    }
    IosFilterComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: "ios",
                    template: "<ng-content *ngIf=\"show\"></ng-content>",
                },] },
    ];
    /** @nocollapse */
    IosFilterComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: core_1.Inject, args: [platform_providers_1.DEVICE,] }] }
    ]; };
    return IosFilterComponent;
}());
exports.IosFilterComponent = IosFilterComponent;
//# sourceMappingURL=platform-filters.js.map