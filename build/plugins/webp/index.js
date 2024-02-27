"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var image_1 = __importDefault(require("../image"));
var WEBPRenderer = function (props) {
    var _a, _b, _c, _d;
    return (react_1.default.createElement(image_1.default, __assign({}, props),
        react_1.default.createElement("picture", null,
            react_1.default.createElement("source", { srcSet: (_a = props.mainState.currentDocument) === null || _a === void 0 ? void 0 : _a.uri }),
            react_1.default.createElement("img", { src: (_b = props.mainState.currentDocument) === null || _b === void 0 ? void 0 : _b.uri, alt: (_d = (_c = props.mainState.currentDocument) === null || _c === void 0 ? void 0 : _c.fileName) !== null && _d !== void 0 ? _d : 'No title' }))));
};
WEBPRenderer.fileTypes = ["webp", "image/webp"];
WEBPRenderer.weight = 0;
exports.default = WEBPRenderer;
