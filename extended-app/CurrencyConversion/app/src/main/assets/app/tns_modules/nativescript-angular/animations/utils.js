Object.defineProperty(exports, "__esModule", { value: true });
var properties_1 = require("tns-core-modules/ui/core/properties");
var enums_1 = require("tns-core-modules/ui/enums");
var TRANSFORM_MATCHER = new RegExp(/(.+)\((.+)\)/);
var TRANSFORM_SPLITTER = new RegExp(/[\s,]+/);
var STYLE_TRANSFORMATION_MAP = Object.freeze({
    "scale": function (value) { return ({ property: "scale", value: value }); },
    "scale3d": function (value) { return ({ property: "scale", value: value }); },
    "scaleX": function (value) { return ({ property: "scale", value: { x: value, y: 1 } }); },
    "scaleY": function (value) { return ({ property: "scale", value: { x: 1, y: value } }); },
    "translate": function (value) { return ({ property: "translate", value: value }); },
    "translate3d": function (value) { return ({ property: "translate", value: value }); },
    "translateX": function (value) { return ({ property: "translate", value: { x: value, y: 0 } }); },
    "translateY": function (value) { return ({ property: "translate", value: { x: 0, y: value } }); },
    "rotate": function (value) { return ({ property: "rotate", value: value }); },
    "none": function (_value) { return [
        { property: "scale", value: { x: 1, y: 1 } },
        { property: "translate", value: { x: 0, y: 0 } },
        { property: "rotate", value: 0 },
    ]; },
});
var STYLE_CURVE_MAP = Object.freeze({
    "ease": enums_1.AnimationCurve.ease,
    "linear": enums_1.AnimationCurve.linear,
    "ease-in": enums_1.AnimationCurve.easeIn,
    "ease-out": enums_1.AnimationCurve.easeOut,
    "ease-in-out": enums_1.AnimationCurve.easeInOut,
    "spring": enums_1.AnimationCurve.spring,
});
function getAnimationCurve(value) {
    if (!value) {
        return enums_1.AnimationCurve.ease;
    }
    var curve = STYLE_CURVE_MAP[value];
    if (curve) {
        return curve;
    }
    var _a = TRANSFORM_MATCHER.exec(value) || [], _b = _a[1], property = _b === void 0 ? "" : _b, _c = _a[2], pointsString = _c === void 0 ? "" : _c;
    var coords = pointsString.split(TRANSFORM_SPLITTER).map(stringToBezieCoords);
    if (property !== "cubic-bezier" || coords.length !== 4) {
        throw new Error("Invalid value for animation: " + value);
    }
    else {
        return (_d = enums_1.AnimationCurve).cubicBezier.apply(_d, coords);
    }
    var _d;
}
exports.getAnimationCurve = getAnimationCurve;
function parseAnimationKeyframe(styles) {
    var keyframeInfo = {};
    keyframeInfo.duration = styles.offset;
    keyframeInfo.declarations = Object.keys(styles).reduce(function (declarations, prop) {
        var value = styles[prop];
        var property = properties_1.CssAnimationProperty._getByCssName(prop);
        if (property) {
            if (typeof value === "string" && property._valueConverter) {
                value = property._valueConverter(value);
            }
            declarations.push({ property: property.name, value: value });
        }
        else if (typeof value === "string" && prop === "transform") {
            declarations.push.apply(declarations, parseTransformation(value));
        }
        return declarations;
    }, new Array());
    return keyframeInfo;
}
exports.parseAnimationKeyframe = parseAnimationKeyframe;
function stringToBezieCoords(value) {
    var result = parseFloat(value);
    if (result < 0) {
        return 0;
    }
    else if (result > 1) {
        return 1;
    }
    return result;
}
function parseTransformation(styleString) {
    return parseStyle(styleString)
        .reduce(function (transformations, style) {
        var transform = STYLE_TRANSFORMATION_MAP[style.property](style.value);
        if (Array.isArray(transform)) {
            transformations.push.apply(transformations, transform);
        }
        else if (typeof transform !== "undefined") {
            transformations.push(transform);
        }
        return transformations;
    }, new Array());
}
function parseStyle(text) {
    return text.split(TRANSFORM_SPLITTER).map(stringToTransformation).filter(function (t) { return !!t; });
}
function stringToTransformation(text) {
    var _a = TRANSFORM_MATCHER.exec(text) || [], _b = _a[1], property = _b === void 0 ? "" : _b, _c = _a[2], stringValue = _c === void 0 ? "" : _c;
    if (!property) {
        return;
    }
    var _d = stringValue.split(",").map(parseFloat), x = _d[0], y = _d[1];
    if (x && y) {
        return { property: property, value: { x: x, y: y } };
    }
    else {
        var value = x;
        if (stringValue.slice(-3) === "rad") {
            value *= 180.0 / Math.PI;
        }
        return { property: property, value: value };
    }
}
//# sourceMappingURL=utils.js.map