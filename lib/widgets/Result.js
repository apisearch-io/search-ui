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
var ResultComponent_1 = require("../components/Result/ResultComponent");
var Widget_1 = require("./Widget");
/**
 * Result
 */
var Result = /** @class */ (function (_super) {
    __extends(Result, _super);
    /**
     * Constructor
     *
     * @param target
     * @param fields
     * @param itemsPerPage
     * @param promote
     * @param exclude
     * @param filter
     * @param highlightsEnabled
     * @param classNames
     * @param template
     * @param formatData
     * @param fadeInSelector
     * @param infiniteScroll
     * @param infiniteScrollButton
     * @param fieldsConciliation
     * @param minScore
     */
    function Result(_a) {
        var target = _a.target, fields = _a.fields, itemsPerPage = _a.itemsPerPage, promote = _a.promote, exclude = _a.exclude, filter = _a.filter, highlightsEnabled = _a.highlightsEnabled, classNames = _a.classNames, template = _a.template, formatData = _a.formatData, fadeInSelector = _a.fadeInSelector, infiniteScroll = _a.infiniteScroll, infiniteScrollButton = _a.infiniteScrollButton, fieldsConciliation = _a.fieldsConciliation, minScore = _a.minScore;
        var _this = _super.call(this) || this;
        _this.target = target;
        _this.targetNode = document.querySelector(_this.target);
        _this.component = (0, preact_1.h)(ResultComponent_1["default"], { target: target, fields: fields, itemsPerPage: itemsPerPage, promote: promote, exclude: exclude, filter: filter, highlightsEnabled: highlightsEnabled, classNames: __assign(__assign({}, ResultComponent_1["default"].defaultProps.classNames), classNames), template: __assign(__assign({}, ResultComponent_1["default"].defaultProps.template), template), formatData: formatData, fadeInSelector: fadeInSelector, infiniteScroll: infiniteScroll, infiniteScrollButton: infiniteScrollButton, fieldsConciliation: fieldsConciliation, minScore: minScore });
        return _this;
    }
    /**
     * @param environmentId
     * @param store
     * @param repository
     * @param dictionary
     */
    Result.prototype.render = function (environmentId, store, repository, dictionary) {
        this.component.props = __assign(__assign({}, this.component.props), { environmentId: environmentId, repository: repository, store: store, currentVisibleResults: store.resultsAreVisible(), dictionary: dictionary });
        (0, preact_1.render)(this.component, this.targetNode);
    };
    /**
     * @param query
     */
    Result.prototype.reset = function (query) {
        delete query.page;
        this.component.state = {
            page: 1
        };
    };
    return Result;
}(Widget_1["default"]));
/**
 * Result widget
 *
 * @param settings
 */
exports["default"] = (function (settings) { return new Result(settings); });
