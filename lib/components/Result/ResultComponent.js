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
var Template_1 = require("../Template");
var defaultTemplates_1 = require("./defaultTemplates");
var ResultActions_1 = require("./ResultActions");
var ItemUUID_1 = require("apisearch/lib/Model/ItemUUID");
/**
 * Result Component
 */
var ResultComponent = /** @class */ (function (_super) {
    __extends(ResultComponent, _super);
    function ResultComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Component will mount
     */
    ResultComponent.prototype.componentWillMount = function () {
        var props = this.props;
        /**
         * Dispatch action
         */
        ResultActions_1.configureQuery(props.environmentId, props.currentQuery, props.itemsPerPage, props.highlightsEnabled, props.promote.map(function (itemUUID) {
            return itemUUID instanceof ItemUUID_1.ItemUUID
                ? itemUUID
                : ItemUUID_1.ItemUUID.createFromArray(itemUUID);
        }), props.exclude.map(function (itemUUID) {
            return itemUUID instanceof ItemUUID_1.ItemUUID
                ? itemUUID
                : ItemUUID_1.ItemUUID.createFromArray(itemUUID);
        }), props.filter);
    };
    /**
     * Render
     *
     * @return {any}
     */
    ResultComponent.prototype.render = function () {
        var props = this.props;
        var dirty = props.dirty;
        var containerClassName = props.classNames.container;
        var itemsListClassName = props.classNames.itemsList;
        var placeholderClassName = props.classNames.placeholder;
        var itemsListTemplate = props.template.itemsList;
        var placeholderTemplate = props.template.placeholder;
        var formatData = props.formatData;
        var currentResult = props.currentResult;
        var currentQuery = props.currentQuery;
        /**
         * Data accessible to the template
         */
        var reducedTemplateData = {
            query: currentQuery.getQueryText(),
            items: currentResult.getItems()
        };
        /**
         * Format each item data
         */
        var formattedTemplateData = __assign({}, reducedTemplateData, { items: (reducedTemplateData.items)
                ? reducedTemplateData
                    .items
                    .map(function (item) { return formatData(item); })
                : [] });
        return (preact_1.h("div", { className: "as-result " + containerClassName }, (placeholderTemplate && dirty)
            ? preact_1.h(Template_1["default"], { template: placeholderTemplate, className: "as-result__placeholder " + placeholderClassName })
            : preact_1.h(Template_1["default"], { template: itemsListTemplate, data: formattedTemplateData, className: "as-result__itemsList " + itemsListClassName })));
    };
    return ResultComponent;
}(preact_1.Component));
ResultComponent.defaultProps = {
    itemsPerPage: 10,
    highlightsEnabled: false,
    promote: [],
    exclude: [],
    filter: function (query) { },
    classNames: {
        container: '',
        itemsList: '',
        placeholder: ''
    },
    template: {
        itemsList: defaultTemplates_1.defaultItemsListTemplate,
        placeholder: null
    },
    formatData: function (data) { return data; }
};
exports["default"] = ResultComponent;
