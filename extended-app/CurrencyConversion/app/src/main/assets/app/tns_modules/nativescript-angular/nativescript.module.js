Object.defineProperty(exports, "__esModule", { value: true });
require("tns-core-modules/globals");
require("tns-core-modules/application");
require("./zone-js/dist/zone-nativescript");
require("reflect-metadata");
require("./polyfills/array");
require("./polyfills/console");
var core_1 = require("@angular/core");
var common_1 = require("./common");
var renderer_1 = require("./renderer");
var detached_loader_1 = require("./common/detached-loader");
var utils_1 = require("./common/utils");
function errorHandlerFactory() {
    return new core_1.ErrorHandler();
}
exports.errorHandlerFactory = errorHandlerFactory;
var NativeScriptModule = /** @class */ (function () {
    function NativeScriptModule(parentModule) {
        // Prevents NativeScriptModule from getting imported multiple times
        utils_1.throwIfAlreadyLoaded(parentModule, "NativeScriptModule");
    }
    NativeScriptModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [
                        detached_loader_1.DetachedLoader,
                    ],
                    providers: [
                        renderer_1.NativeScriptRendererFactory,
                        core_1.SystemJsNgModuleLoader,
                        { provide: core_1.ErrorHandler, useFactory: errorHandlerFactory },
                        { provide: core_1.RendererFactory2, useExisting: renderer_1.NativeScriptRendererFactory },
                    ],
                    entryComponents: [
                        detached_loader_1.DetachedLoader,
                    ],
                    imports: [
                        core_1.ApplicationModule,
                        common_1.NativeScriptCommonModule,
                    ],
                    exports: [
                        core_1.ApplicationModule,
                        common_1.NativeScriptCommonModule,
                        detached_loader_1.DetachedLoader,
                    ],
                    schemas: [core_1.NO_ERRORS_SCHEMA]
                },] },
    ];
    /** @nocollapse */
    NativeScriptModule.ctorParameters = function () { return [
        { type: NativeScriptModule, decorators: [{ type: core_1.Optional }, { type: core_1.SkipSelf }] }
    ]; };
    return NativeScriptModule;
}());
exports.NativeScriptModule = NativeScriptModule;
//# sourceMappingURL=nativescript.module.js.map