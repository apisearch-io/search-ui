"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.__esModule = true;
var preact_1 = require("preact");
var PriorityFilterComponent_1 = require("../components/PriorityFilter/PriorityFilterComponent");
var Widget_1 = require("./Widget");
/**
 * PriorityFilter
 */
var PriorityFilter = /** @class */ (function (_super) {
    __extends(PriorityFilter, _super);
    /**
     *
     * @param target
     * @param filters
     * @param template
     */
    function PriorityFilter(_a) {
        var target = _a.target, filters = _a.filters, template = _a.template;
        var _this = _super.call(this) || this;
        _this.target = target;
        _this.component = (0, preact_1.h)(PriorityFilterComponent_1["default"], { target: target, filters: filters, template: __assign(__assign({}, PriorityFilterComponent_1["default"].defaultProps.template), template) });
        return _this;
    }
    /**
     * @param environmentId
     * @param store
     * @param repository
     * @param dictionary
     */
    PriorityFilter.prototype.render = function (environmentId, store, repository, dictionary) {
        this.component.props = __assign(__assign({}, this.component.props), { dictionary: dictionary, environmentId: environmentId, repository: repository, store: store });
        (0, preact_1.render)(this.component, document.querySelector(this.target));
    };
    return PriorityFilter;
}(Widget_1["default"]));
/**
 * Multiple filter widget
 *
 * @param settings
 */
exports["default"] = (function (settings) { return new PriorityFilter(settings); });
