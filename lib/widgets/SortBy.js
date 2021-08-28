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
var apisearch_1 = require("apisearch");
var preact_1 = require("preact");
var SortByComponent_1 = require("../components/SortBy/SortByComponent");
var Widget_1 = require("./Widget");
/**
 * SortBy
 */
var SortBy = /** @class */ (function (_super) {
    __extends(SortBy, _super);
    function SortBy(_a) {
        var target = _a.target, classNames = _a.classNames, options = _a.options;
        var _this = _super.call(this) || this;
        _this.target = target;
        _this.targetNode = document.querySelector(_this.target);
        _this.component = preact_1.h(SortByComponent_1["default"], { target: target, classNames: __assign(__assign({}, SortByComponent_1["default"].defaultProps.classNames), classNames), options: options });
        return _this;
    }
    /**
     * @param environmentId
     * @param store
     * @param repository
     * @param dictionary
     */
    SortBy.prototype.render = function (environmentId, store, repository, dictionary) {
        this.component.props = __assign(__assign({}, this.component.props), { environmentId: environmentId, repository: repository, store: store });
        preact_1.render(this.component, this.targetNode);
    };
    /**
     * @param query
     * @param object
     */
    SortBy.prototype.toUrlObject = function (query, object) {
        if (query.sort !== undefined) {
            var sort = query.sort[0];
            var sortInstance = apisearch_1.SortBy.createFromArray(query.sort);
            var sortAsString = sortInstance.getFirstSortAsString();
            var firstSortAsString = this.component.props.options[0].value;
            if (sortAsString !== firstSortAsString) {
                if (sort.type == 'distance') {
                    object.sort = 'distance:' + sort.unit + ':' + sort.coordinate.lat + ':' + sort.coordinate.lon;
                }
                else {
                    object.sort = sort.field.substr(17) + ':' + sort.order;
                }
            }
        }
    };
    /**
     * @param object
     * @param query
     */
    SortBy.prototype.fromUrlObject = function (object, query) {
        if (object.sort !== undefined) {
            if (query.sort == undefined) {
                query.sort = [{}];
            }
            if (object.sort === 'score') {
                query.sort[0].field = '_score';
                query.sort[0].order = 'desc';
                return;
            }
            if (object.sort.indexOf('distance:') === 0) {
                var distanceSortParts = object.sort.split(':');
                query.sort[0].type = distanceSortParts[0];
                query.sort[0].unit = distanceSortParts[1];
                query.sort[0].coordinate = {
                    'lat': distanceSortParts[2],
                    'lon': distanceSortParts[3]
                };
                return;
            }
            var sortParts = object.sort.split(':');
            query.sort[0].field = 'indexed_metadata.' + sortParts[0];
            query.sort[0].order = sortParts[1];
        }
    };
    /**
     * @param query
     */
    SortBy.prototype.reset = function (query) {
        delete query.sort;
    };
    return SortBy;
}(Widget_1["default"]));
/**
 * SortBy widget
 *
 * @param settings
 */
exports["default"] = (function (settings) { return new SortBy(settings); });
