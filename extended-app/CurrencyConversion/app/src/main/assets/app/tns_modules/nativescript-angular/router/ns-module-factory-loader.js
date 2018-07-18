Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var NSModuleFactoryLoader = /** @class */ (function (_super) {
    __extends(NSModuleFactoryLoader, _super);
    function NSModuleFactoryLoader(compiler, config) {
        var _this = _super.call(this, compiler, config) || this;
        console.log("NSModuleFactoryLoader is deprecated! " +
            "You no longer need to provide it as a module loader.");
        return _this;
    }
    NSModuleFactoryLoader.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    NSModuleFactoryLoader.ctorParameters = function () { return [
        { type: core_1.Compiler },
        { type: core_1.SystemJsNgModuleLoaderConfig, decorators: [{ type: core_1.Optional }] }
    ]; };
    return NSModuleFactoryLoader;
}(core_1.SystemJsNgModuleLoader));
exports.NSModuleFactoryLoader = NSModuleFactoryLoader;
//# sourceMappingURL=ns-module-factory-loader.js.map