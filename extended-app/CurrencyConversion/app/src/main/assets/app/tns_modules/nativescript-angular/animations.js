Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var browser_1 = require("@angular/animations/browser");
var animations_1 = require("@angular/platform-browser/animations");
var animation_engine_1 = require("./animations/animation-engine");
var animation_driver_1 = require("./animations/animation-driver");
var nativescript_module_1 = require("./nativescript.module");
var renderer_1 = require("./renderer");
var InjectableAnimationEngine = (function (_super) {
    __extends(InjectableAnimationEngine, _super);
    function InjectableAnimationEngine(driver, normalizer) {
        return _super.call(this, driver, normalizer) || this;
    }
    return InjectableAnimationEngine;
}(animation_engine_1.NativeScriptAnimationEngine));
InjectableAnimationEngine = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [browser_1.AnimationDriver, browser_1.ɵAnimationStyleNormalizer])
], InjectableAnimationEngine);
exports.InjectableAnimationEngine = InjectableAnimationEngine;
function instantiateSupportedAnimationDriver() {
    return new animation_driver_1.NativeScriptAnimationDriver();
}
exports.instantiateSupportedAnimationDriver = instantiateSupportedAnimationDriver;
function instantiateRendererFactory(renderer, engine, zone) {
    return new animations_1.ɵAnimationRendererFactory(renderer, engine, zone);
}
exports.instantiateRendererFactory = instantiateRendererFactory;
function instanciateDefaultStyleNormalizer() {
    return new browser_1.ɵWebAnimationsStyleNormalizer();
}
exports.instanciateDefaultStyleNormalizer = instanciateDefaultStyleNormalizer;
exports.NATIVESCRIPT_ANIMATIONS_PROVIDERS = [
    { provide: browser_1.AnimationDriver, useFactory: instantiateSupportedAnimationDriver },
    { provide: browser_1.ɵAnimationStyleNormalizer, useFactory: instanciateDefaultStyleNormalizer },
    { provide: browser_1.ɵAnimationEngine, useClass: InjectableAnimationEngine }, {
        provide: core_1.RendererFactory2,
        useFactory: instantiateRendererFactory,
        deps: [renderer_1.NativeScriptRendererFactory, browser_1.ɵAnimationEngine, core_1.NgZone]
    }
];
var NativeScriptAnimationsModule = (function () {
    function NativeScriptAnimationsModule() {
    }
    return NativeScriptAnimationsModule;
}());
NativeScriptAnimationsModule = __decorate([
    core_1.NgModule({
        imports: [nativescript_module_1.NativeScriptModule],
        providers: exports.NATIVESCRIPT_ANIMATIONS_PROVIDERS,
    })
], NativeScriptAnimationsModule);
exports.NativeScriptAnimationsModule = NativeScriptAnimationsModule;
//# sourceMappingURL=animations.js.map