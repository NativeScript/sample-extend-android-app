Object.defineProperty(exports, "__esModule", { value: true });
var defaultViewMeta = {
    skipAddToDom: false,
};
var elementMap = new Map();
var camelCaseSplit = /([a-z0-9])([A-Z])/g;
function registerElement(elementName, resolver, meta) {
    if (elementMap.has(elementName)) {
        throw new Error("Element for " + elementName + " already registered.");
    }
    else {
        var entry = { resolver: resolver, meta: meta };
        elementMap.set(elementName, entry);
        elementMap.set(elementName.toLowerCase(), entry);
        elementMap.set(elementName.replace(camelCaseSplit, "$1-$2").toLowerCase(), entry);
    }
}
exports.registerElement = registerElement;
function getViewClass(elementName) {
    var entry = elementMap.get(elementName) ||
        elementMap.get(elementName.toLowerCase());
    if (!entry) {
        throw new TypeError("No known component for element " + elementName + ".");
    }
    try {
        return entry.resolver();
    }
    catch (e) {
        throw new TypeError("Could not load view for: " + elementName + "." + e);
    }
}
exports.getViewClass = getViewClass;
function getViewMeta(nodeName) {
    var meta = defaultViewMeta;
    var entry = elementMap.get(nodeName) || elementMap.get(nodeName.toLowerCase());
    if (entry && entry.meta) {
        meta = entry.meta;
    }
    return meta;
}
exports.getViewMeta = getViewMeta;
function isKnownView(elementName) {
    return elementMap.has(elementName) ||
        elementMap.has(elementName.toLowerCase());
}
exports.isKnownView = isKnownView;
// Register default NativeScript components
// Note: ActionBar related components are registerd together with action-bar directives.
registerElement("AbsoluteLayout", function () { return require("tns-core-modules/ui/layouts/absolute-layout").AbsoluteLayout; });
registerElement("ActivityIndicator", function () { return require("tns-core-modules/ui/activity-indicator").ActivityIndicator; });
registerElement("Border", function () { return require("tns-core-modules/ui/border").Border; });
registerElement("Button", function () { return require("tns-core-modules/ui/button").Button; });
registerElement("ContentView", function () { return require("tns-core-modules/ui/content-view").ContentView; });
registerElement("DatePicker", function () { return require("tns-core-modules/ui/date-picker").DatePicker; });
registerElement("DockLayout", function () { return require("tns-core-modules/ui/layouts/dock-layout").DockLayout; });
registerElement("GridLayout", function () { return require("tns-core-modules/ui/layouts/grid-layout").GridLayout; });
registerElement("HtmlView", function () { return require("tns-core-modules/ui/html-view").HtmlView; });
registerElement("Image", function () { return require("tns-core-modules/ui/image").Image; });
// Parse5 changes <Image> tags to <img>. WTF!
registerElement("img", function () { return require("tns-core-modules/ui/image").Image; });
registerElement("Label", function () { return require("tns-core-modules/ui/label").Label; });
registerElement("ListPicker", function () { return require("tns-core-modules/ui/list-picker").ListPicker; });
registerElement("ListView", function () { return require("tns-core-modules/ui/list-view").ListView; });
registerElement("Page", function () { return require("tns-core-modules/ui/page").Page; });
registerElement("Placeholder", function () { return require("tns-core-modules/ui/placeholder").Placeholder; });
registerElement("Progress", function () { return require("tns-core-modules/ui/progress").Progress; });
registerElement("ProxyViewContainer", function () { return require("tns-core-modules/ui/proxy-view-container").ProxyViewContainer; });
registerElement("Repeater", function () { return require("tns-core-modules/ui/repeater").Repeater; });
registerElement("ScrollView", function () { return require("tns-core-modules/ui/scroll-view").ScrollView; });
registerElement("SearchBar", function () { return require("tns-core-modules/ui/search-bar").SearchBar; });
registerElement("SegmentedBar", function () { return require("tns-core-modules/ui/segmented-bar").SegmentedBar; });
registerElement("SegmentedBarItem", function () { return require("tns-core-modules/ui/segmented-bar").SegmentedBarItem; });
registerElement("Slider", function () { return require("tns-core-modules/ui/slider").Slider; });
registerElement("StackLayout", function () { return require("tns-core-modules/ui/layouts/stack-layout").StackLayout; });
registerElement("FlexboxLayout", function () { return require("tns-core-modules/ui/layouts/flexbox-layout").FlexboxLayout; });
registerElement("Switch", function () { return require("tns-core-modules/ui/switch").Switch; });
registerElement("TabView", function () { return require("tns-core-modules/ui/tab-view").TabView; });
registerElement("TextField", function () { return require("tns-core-modules/ui/text-field").TextField; });
registerElement("TextView", function () { return require("tns-core-modules/ui/text-view").TextView; });
registerElement("TimePicker", function () { return require("tns-core-modules/ui/time-picker").TimePicker; });
registerElement("WebView", function () { return require("tns-core-modules/ui/web-view").WebView; });
registerElement("WrapLayout", function () { return require("tns-core-modules/ui/layouts/wrap-layout").WrapLayout; });
registerElement("FormattedString", function () { return require("tns-core-modules/text/formatted-string").FormattedString; });
registerElement("Span", function () { return require("tns-core-modules/text/span").Span; });
registerElement("DetachedContainer", function () { return require("tns-core-modules/ui/proxy-view-container").ProxyViewContainer; }, { skipAddToDom: true });
registerElement("DetachedText", function () { return require("ui/placeholder").Placeholder; }, { skipAddToDom: true });
registerElement("Comment", function () { return require("ui/placeholder").Placeholder; }, { skipAddToDom: false });
//# sourceMappingURL=element-registry.js.map