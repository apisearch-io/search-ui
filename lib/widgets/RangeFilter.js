"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
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
var RangeFilterComponent_1 = require("../components/RangeFilter/RangeFilterComponent");
var Widget_1 = require("./Widget");
/**
 * RangeFilter
 */
var RangeFilter = /** @class */ (function (_super) {
    __extends(RangeFilter, _super);
    function RangeFilter(_a) {
        var target = _a.target, filterName = _a.filterName, filterField = _a.filterField, minValue = _a.minValue, maxValue = _a.maxValue, from = _a.from, to = _a.to;
        var _this = _super.call(this) || this;
        _this.target = target;
        _this.component = preact_1.h(RangeFilterComponent_1["default"], { target: target, filterName: filterName, filterField: filterField, minValue: minValue, maxValue: maxValue, from: __assign(__assign({}, RangeFilterComponent_1["default"].defaultProps.from), from), to: __assign(__assign({}, RangeFilterComponent_1["default"].defaultProps.to), to) });
        return _this;
    }
    /**
     * Widget
     *
     * @param environmentId
     * @param store
     * @param repository
     */
    RangeFilter.prototype.render = function (environmentId, store, repository) {
        this.component.props = __assign(__assign({}, this.component.props), { environmentId: environmentId, repository: repository, dirty: store.isDirty(), currentResult: store.getCurrentResult(), currentQuery: store.getCurrentQuery() });
        var targetNode = document.querySelector(this.target);
        preact_1.render(this.component, targetNode);
    };
    return RangeFilter;
}(Widget_1["default"]));
/**
 * CheckboxFilter widget
 *
 * @param settings
 */
exports["default"] = (function (settings) { return new RangeFilter(settings); });
