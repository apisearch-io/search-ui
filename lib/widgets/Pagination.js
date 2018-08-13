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
var PaginationComponent_1 = require("../components/Pagination/PaginationComponent");
var Widget_1 = require("./Widget");
/**
 * Pagination
 */
var Pagination = /** @class */ (function (_super) {
    __extends(Pagination, _super);
    /**
     * Constructor
     *
     * @param target
     * @param padding
     * @param goFirstLast
     * @param classNames
     * @param template
     */
    function Pagination(_a) {
        var target = _a.target, padding = _a.padding, goFirstLast = _a.goFirstLast, classNames = _a.classNames, template = _a.template;
        var _this = _super.call(this) || this;
        _this.target = target;
        _this.component = preact_1.h(PaginationComponent_1["default"], { target: target, padding: padding, goFirstLast: goFirstLast, classNames: __assign({}, PaginationComponent_1["default"].defaultProps.classNames, classNames), template: __assign({}, PaginationComponent_1["default"].defaultProps.template, template) });
        return _this;
    }
    /**
     * Widget
     *
     * @param environmentId
     * @param store
     * @param repository
     */
    Pagination.prototype.render = function (environmentId, store, repository) {
        this.component.attributes = __assign({}, this.component.attributes, { environmentId: environmentId, repository: repository, dirty: store.isDirty(), currentResult: store.getCurrentResult(), currentQuery: store.getCurrentQuery() });
        var targetNode = document.querySelector(this.target);
        preact_1.render(this.component, targetNode, targetNode.lastChild);
    };
    return Pagination;
}(Widget_1["default"]));
/**
 * Pagination widget
 *
 * @param settings
 */
exports["default"] = (function (settings) { return new Pagination(settings); });
