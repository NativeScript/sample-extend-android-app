Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var testing_1 = require("@angular/core/testing");
var frame_1 = require("tns-core-modules/ui/frame");
var proxy_view_container_1 = require("tns-core-modules/ui/proxy-view-container");
/**
 * A NativeScript based implementation of the TestComponentRenderer.
 */
var NativeScriptTestComponentRenderer = /** @class */ (function (_super) {
    __extends(NativeScriptTestComponentRenderer, _super);
    function NativeScriptTestComponentRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NativeScriptTestComponentRenderer.prototype.insertRootElement = function (rootElId) {
        var page = frame_1.topmost().currentPage;
        var layout = new proxy_view_container_1.ProxyViewContainer();
        layout.id = rootElId;
        var rootLayout = page.layoutView;
        rootLayout.addChild(layout);
    };
    NativeScriptTestComponentRenderer.decorators = [
        { type: core_1.Injectable },
    ];
    return NativeScriptTestComponentRenderer;
}(testing_1.TestComponentRenderer));
exports.NativeScriptTestComponentRenderer = NativeScriptTestComponentRenderer;
//# sourceMappingURL=nativescript_test_component_renderer.js.map