Object.defineProperty(exports, "__esModule", { value: true });
require("tns-core-modules/globals");
require("tns-core-modules/application");
require("./zone-js/dist/zone-nativescript");
require("reflect-metadata");
require("./polyfills/array");
require("./polyfills/console");
var profiling_1 = require("tns-core-modules/profiling");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var trace_1 = require("./trace");
var platform_providers_1 = require("./platform-providers");
var app_host_view_1 = require("./app-host-view");
var application_1 = require("tns-core-modules/application");
var text_view_1 = require("tns-core-modules/ui/text-view");
require("nativescript-intl");
var view_1 = require("tns-core-modules/ui/core/view/view");
var frame_1 = require("tns-core-modules/ui/frame");
exports.onBeforeLivesync = new core_1.EventEmitter();
exports.onAfterLivesync = new core_1.EventEmitter();
var lastBootstrappedModule;
// Work around a TS bug requiring an import of OpaqueToken without using it
if (global.___TS_UNUSED) {
    (function () {
        return core_1.InjectionToken;
    })();
}
var NativeScriptSanitizer = /** @class */ (function (_super) {
    __extends(NativeScriptSanitizer, _super);
    function NativeScriptSanitizer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NativeScriptSanitizer.prototype.sanitize = function (_context, value) {
        return value;
    };
    return NativeScriptSanitizer;
}(core_1.Sanitizer));
exports.NativeScriptSanitizer = NativeScriptSanitizer;
// Add a fake polyfill for the document object
global.document = global.document || {
    getElementById: function () { return undefined; }
};
var doc = global.document;
doc.body = Object.assign(doc.body || {}, {
    isOverride: true,
});
var NativeScriptDocument = /** @class */ (function () {
    function NativeScriptDocument() {
    }
    NativeScriptDocument.prototype.createElement = function (tag) {
        throw new Error("NativeScriptDocument is not DOM Document. There is no createElement() method.");
    };
    return NativeScriptDocument;
}());
exports.NativeScriptDocument = NativeScriptDocument;
exports.COMMON_PROVIDERS = [
    platform_providers_1.defaultPageFactoryProvider,
    { provide: core_1.Sanitizer, useClass: NativeScriptSanitizer, deps: [] },
    { provide: common_1.DOCUMENT, useValue: doc },
];
var NativeScriptPlatformRef = /** @class */ (function (_super) {
    __extends(NativeScriptPlatformRef, _super);
    function NativeScriptPlatformRef(platform, appOptions) {
        if (appOptions === void 0) { appOptions = {}; }
        var _this = _super.call(this) || this;
        _this.platform = platform;
        _this.appOptions = appOptions;
        return _this;
    }
    NativeScriptPlatformRef.prototype.bootstrapModuleFactory = function (moduleFactory) {
        var _this = this;
        this._bootstrapper = function () { return _this.platform.bootstrapModuleFactory(moduleFactory); };
        this.bootstrapApp();
        return null; // Make the compiler happy
    };
    NativeScriptPlatformRef.prototype.bootstrapModule = function (moduleType, compilerOptions) {
        var _this = this;
        if (compilerOptions === void 0) { compilerOptions = []; }
        this._bootstrapper = function () { return _this.platform.bootstrapModule(moduleType, compilerOptions); };
        this.bootstrapApp();
        return null; // Make the compiler happy
    };
    NativeScriptPlatformRef.prototype.bootstrapApp = function () {
        var _this = this;
        global.__onLiveSyncCore = function () {
            _this.livesync();
        };
        if (this.appOptions && typeof this.appOptions.cssFile === "string") {
            application_1.setCssFileName(this.appOptions.cssFile);
        }
        this.bootstrapNativeScriptApp();
    };
    NativeScriptPlatformRef.prototype.onDestroy = function (callback) {
        this.platform.onDestroy(callback);
    };
    Object.defineProperty(NativeScriptPlatformRef.prototype, "injector", {
        get: function () {
            return this.platform.injector;
        },
        enumerable: true,
        configurable: true
    });
    NativeScriptPlatformRef.prototype.destroy = function () {
        this.platform.destroy();
    };
    Object.defineProperty(NativeScriptPlatformRef.prototype, "destroyed", {
        get: function () {
            return this.platform.destroyed;
        },
        enumerable: true,
        configurable: true
    });
    NativeScriptPlatformRef.prototype.bootstrapNativeScriptApp = function () {
        var _this = this;
        var autoCreateFrame = !!this.appOptions.createFrameOnBootstrap;
        var tempAppHostView;
        var rootContent;
        if (autoCreateFrame) {
            var _a = this.createFrameAndPage(false), page = _a.page, frame = _a.frame;
            platform_providers_1.setRootPage(page);
            rootContent = frame;
        }
        else {
            // Create a temp page for root of the renderer
            tempAppHostView = new app_host_view_1.AppHostView();
            platform_providers_1.setRootPage(tempAppHostView);
        }
        trace_1.bootstrapLog("NativeScriptPlatform bootstrap started.");
        var launchCallback = profiling_1.profile("nativescript-angular/platform-common.launchCallback", function (args) {
            trace_1.bootstrapLog("Application launch event fired");
            var bootstrapPromiseCompleted = false;
            _this._bootstrapper().then(function (moduleRef) {
                bootstrapPromiseCompleted = true;
                trace_1.bootstrapLog("Angular bootstrap bootstrap done. uptime: " + profiling_1.uptime());
                if (!autoCreateFrame) {
                    rootContent = tempAppHostView.content;
                }
                lastBootstrappedModule = new WeakRef(moduleRef);
            }, function (err) {
                bootstrapPromiseCompleted = true;
                var errorMessage = err.message + "\n\n" + err.stack;
                trace_1.bootstrapLogError("ERROR BOOTSTRAPPING ANGULAR");
                trace_1.bootstrapLogError(errorMessage);
                rootContent = _this.createErrorUI(errorMessage);
            });
            trace_1.bootstrapLog("bootstrapAction called, draining micro tasks queue. Root: " + rootContent);
            global.Zone.drainMicroTaskQueue();
            trace_1.bootstrapLog("bootstrapAction called, draining micro tasks queue finished! Root: " + rootContent);
            if (!bootstrapPromiseCompleted) {
                var errorMessage = "Bootstrap promise didn't resolve";
                trace_1.bootstrapLogError(errorMessage);
                rootContent = _this.createErrorUI(errorMessage);
            }
            args.root = rootContent;
        });
        application_1.on(application_1.launchEvent, launchCallback);
        application_1.run();
    };
    NativeScriptPlatformRef.prototype.livesync = function () {
        var _this = this;
        trace_1.bootstrapLog("Angular livesync started.");
        exports.onBeforeLivesync.next(lastBootstrappedModule ? lastBootstrappedModule.get() : null);
        var autoCreateFrame = !!this.appOptions.createFrameOnBootstrap;
        var tempAppHostView;
        var rootContent;
        if (autoCreateFrame) {
            var _a = this.createFrameAndPage(true), page = _a.page, frame = _a.frame;
            platform_providers_1.setRootPage(page);
            rootContent = frame;
        }
        else {
            // Create a temp page for root of the renderer
            tempAppHostView = new app_host_view_1.AppHostView();
            platform_providers_1.setRootPage(tempAppHostView);
        }
        var bootstrapPromiseCompleted = false;
        this._bootstrapper().then(function (moduleRef) {
            bootstrapPromiseCompleted = true;
            trace_1.bootstrapLog("Angular livesync done.");
            exports.onAfterLivesync.next({ moduleRef: moduleRef });
            if (!autoCreateFrame) {
                rootContent = tempAppHostView.content;
            }
            lastBootstrappedModule = new WeakRef(moduleRef);
        }, function (error) {
            bootstrapPromiseCompleted = true;
            trace_1.bootstrapLogError("ERROR LIVESYNC BOOTSTRAPPING ANGULAR");
            var errorMessage = error.message + "\n\n" + error.stack;
            trace_1.bootstrapLogError(errorMessage);
            rootContent = _this.createErrorUI(errorMessage);
            exports.onAfterLivesync.next({ error: error });
        });
        trace_1.bootstrapLog("livesync bootstrapAction called, draining micro tasks queue. Root: " + rootContent);
        global.Zone.drainMicroTaskQueue();
        trace_1.bootstrapLog("livesync bootstrapAction called, draining micro tasks queue finished! Root: " + rootContent);
        if (!bootstrapPromiseCompleted) {
            var result = "Livesync bootstrap promise didn't resolve";
            trace_1.bootstrapLogError(result);
            rootContent = this.createErrorUI(result);
            exports.onAfterLivesync.next({ error: new Error(result) });
        }
        application_1._resetRootView({
            create: function () { return rootContent; },
        });
    };
    NativeScriptPlatformRef.prototype.createErrorUI = function (message) {
        var errorTextBox = new text_view_1.TextView();
        errorTextBox.text = message;
        errorTextBox.color = new view_1.Color("red");
        return errorTextBox;
    };
    NativeScriptPlatformRef.prototype.createFrameAndPage = function (isLivesync) {
        var frame = new frame_1.Frame();
        var pageFactory = this.platform.injector.get(platform_providers_1.PAGE_FACTORY);
        var page = pageFactory({ isBootstrap: true, isLivesync: isLivesync });
        frame.navigate({ create: function () { return page; } });
        return { page: page, frame: frame };
    };
    __decorate([
        profiling_1.profile,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [core_1.NgModuleFactory]),
        __metadata("design:returntype", Promise)
    ], NativeScriptPlatformRef.prototype, "bootstrapModuleFactory", null);
    __decorate([
        profiling_1.profile,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [core_1.Type, Object]),
        __metadata("design:returntype", Promise)
    ], NativeScriptPlatformRef.prototype, "bootstrapModule", null);
    __decorate([
        profiling_1.profile,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], NativeScriptPlatformRef.prototype, "bootstrapApp", null);
    __decorate([
        profiling_1.profile,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], NativeScriptPlatformRef.prototype, "bootstrapNativeScriptApp", null);
    __decorate([
        profiling_1.profile,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], NativeScriptPlatformRef.prototype, "livesync", null);
    return NativeScriptPlatformRef;
}(core_1.PlatformRef));
exports.NativeScriptPlatformRef = NativeScriptPlatformRef;
//# sourceMappingURL=platform-common.js.map