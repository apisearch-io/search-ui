"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
exports.__esModule = true;
var preact_1 = require("preact");
var ResultComponent_1 = require("../components/Result/ResultComponent");
var Widget_1 = require("./Widget");
/**
 * Result
 */
var Result = /** @class */ (function (_super) {
    __extends(Result, _super);
    function Result(_a) {
        var target = _a.target, itemsPerPage = _a.itemsPerPage, promote = _a.promote, exclude = _a.exclude, highlightsEnabled = _a.highlightsEnabled, classNames = _a.classNames, template = _a.template, formatData = _a.formatData;
        var _this = _super.call(this) || this;
        _this.target = target;
        _this.component = preact_1.h(ResultComponent_1["default"], { target: target, itemsPerPage: itemsPerPage, promote: promote, exclude: exclude, highlightsEnabled: highlightsEnabled, classNames: __assign({}, ResultComponent_1["default"].defaultProps.classNames, classNames), template: __assign({}, ResultComponent_1["default"].defaultProps.template, template), formatData: formatData });
        return _this;
    }
    /**
     * Widget
     *
     * @param environmentId
     * @param store
     * @param repository
     */
    Result.prototype.render = function (environmentId, store, repository) {
        this.component.attributes = __assign({}, this.component.attributes, { environmentId: environmentId, repository: repository, dirty: store.isDirty(), currentResult: store.getCurrentResult(), currentQuery: store.getCurrentQuery() });
        var targetNode = document.querySelector(this.target);
        preact_1.render(this.component, targetNode, targetNode.lastChild);
    };
    return Result;
}(Widget_1["default"]));
/**
 * Result widget
 *
 * @param settings
 */
exports["default"] = (function (settings) { return new Result(settings); });
