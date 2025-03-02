"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var ScrollContext_1 = require("./ScrollContext");
var environment_1 = __importDefault(require("./utils/environment"));
var ScrollAnimatorContainer = function (_a) {
    var children = _a.children, _b = _a.scrollParent, scrollParent = _b === void 0 ? window : _b;
    var _c = react_1.useState({
        currentY: 0,
        viewportHeight: 0,
        totalPage: 0,
        totalHeight: 0,
        totalProgress: 0,
        realPage: 0,
        currentPage: 0,
        currentProgress: 0, // 현재 페이지 진행률 (%)
    }), scrollData = _c[0], setScrollData = _c[1];
    var scrollEvent = react_1.useCallback(function () {
        var currentY = scrollParent === window ? window.pageYOffset : scrollParent.scrollTop;
        var viewportHeight = scrollParent === window ? environment_1.default.height : scrollParent.clientHeight;
        var totalPage = children.length || 0;
        var totalHeight = totalPage * (viewportHeight - 1);
        var totalProgress = currentY / totalHeight; // 전체 페이지 진행률 0 ~ 1
        var realPage = currentY / viewportHeight; // 실수 페이지
        var currentPage = Math.floor(realPage); // 정수 페이지
        var currentProgress = realPage - currentPage; // 현재 페이지 진행률
        setScrollData({
            currentY: currentY,
            viewportHeight: viewportHeight,
            totalPage: totalPage,
            totalHeight: totalHeight,
            totalProgress: totalProgress,
            realPage: realPage,
            currentPage: currentPage,
            currentProgress: currentProgress,
        });
    }, []);
    react_1.useEffect(function () {
        scrollEvent();
        scrollParent.addEventListener("scroll", scrollEvent);
        scrollParent.addEventListener("resize", scrollEvent);
        return function () { return scrollParent.removeEventListener("scroll", scrollEvent); };
    }, []);
    return (react_1.default.createElement("div", { style: { margin: 0, padding: 0, userSelect: "none" } },
        react_1.default.createElement(ScrollContext_1.ScrollContainerContext.Provider, { value: scrollData }, children)));
};
exports.default = ScrollAnimatorContainer;
