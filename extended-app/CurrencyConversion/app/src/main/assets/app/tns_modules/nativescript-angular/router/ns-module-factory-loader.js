Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var file_system_1 = require("tns-core-modules/file-system");
var SEPARATOR = "#";
var NSModuleFactoryLoader = (function () {
    function NSModuleFactoryLoader(compiler, ngModuleLoader) {
        this.compiler = compiler;
        this.ngModuleLoader = ngModuleLoader;
        this.offlineMode = compiler instanceof core_1.Compiler;
    }
    NSModuleFactoryLoader.prototype.load = function (path) {
        if (this.offlineMode) {
            return this.ngModuleLoader.load(path);
        }
        else {
            return this.loadAndCompile(path);
        }
    };
    NSModuleFactoryLoader.prototype.loadAndCompile = function (path) {
        var _a = splitPath(path), modulePath = _a.modulePath, exportName = _a.exportName;
        var loadedModule = global.require(modulePath)[exportName];
        checkNotEmpty(loadedModule, modulePath, exportName);
        return Promise.resolve(this.compiler.compileModuleAsync(loadedModule));
    };
    return NSModuleFactoryLoader;
}());
NSModuleFactoryLoader = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [core_1.Compiler, core_1.SystemJsNgModuleLoader])
], NSModuleFactoryLoader);
exports.NSModuleFactoryLoader = NSModuleFactoryLoader;
function splitPath(path) {
    var _a = path.split(SEPARATOR), modulePath = _a[0], exportName = _a[1];
    modulePath = getAbsolutePath(modulePath);
    if (typeof exportName === "undefined") {
        exportName = "default";
    }
    return { modulePath: modulePath, exportName: exportName };
}
function getAbsolutePath(relativePath) {
    return file_system_1.path.normalize(file_system_1.path.join(file_system_1.knownFolders.currentApp().path, relativePath));
}
function checkNotEmpty(value, modulePath, exportName) {
    if (!value) {
        throw new Error("Cannot find '" + exportName + "' in '" + modulePath + "'");
    }
    return value;
}
//# sourceMappingURL=ns-module-factory-loader.js.map