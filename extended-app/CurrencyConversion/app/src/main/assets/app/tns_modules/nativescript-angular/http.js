Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/http");
var ns_http_1 = require("./http/ns-http");
var ns_file_system_1 = require("./file-system/ns-file-system");
var core_1 = require("@angular/core");
var http_2 = require("@angular/http");
var ns_http_2 = require("./http/ns-http");
exports.NSHttp = ns_http_2.NSHttp;
function nsHttpFactory(backend, options, nsFileSystem) {
    return new ns_http_1.NSHttp(backend, options, nsFileSystem);
}
exports.nsHttpFactory = nsHttpFactory;
function nsXSRFStrategyFactory() {
    return new ns_http_1.NSXSRFStrategy();
}
exports.nsXSRFStrategyFactory = nsXSRFStrategyFactory;
var NativeScriptHttpModule = (function () {
    function NativeScriptHttpModule() {
    }
    return NativeScriptHttpModule;
}());
NativeScriptHttpModule = __decorate([
    core_1.NgModule({
        providers: [
            { provide: http_2.XSRFStrategy, useFactory: nsXSRFStrategyFactory },
            ns_file_system_1.NSFileSystem,
            { provide: http_1.Http, useFactory: nsHttpFactory,
                deps: [http_1.XHRBackend, http_1.RequestOptions, ns_file_system_1.NSFileSystem] }
        ],
        imports: [
            http_2.HttpModule,
        ],
        exports: [
            http_2.HttpModule,
        ]
    })
], NativeScriptHttpModule);
exports.NativeScriptHttpModule = NativeScriptHttpModule;
//# sourceMappingURL=http.js.map