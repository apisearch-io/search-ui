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
var compat_1 = require("preact/compat");
var Template_1 = require("../Template");
var defaultTemplates_1 = require("./defaultTemplates");
var ResultActions_1 = require("./ResultActions");
var ItemUUID_1 = require("apisearch/lib/Model/ItemUUID");
var Container_1 = require("../../Container");
var Constants_1 = require("../../Constants");
/**
 * Result Component
 */
var ResultComponent = /** @class */ (function (_super) {
    __extends(ResultComponent, _super);
    /**
     * Constructor
     */
    function ResultComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            itemsId: [],
            focus: props.fadeInSelector == ''
        };
        return _this;
    }
    /**
     * Hook that change state once mouse clicks inside or outside the container
     */
    ResultComponent.prototype.addMouseDownListeners = function (ref, fadeInSelector) {
        var _this = this;
        compat_1.useEffect(function () {
            var self = _this;
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                self.setState(function (prevState) {
                    return {
                        itemsId: prevState.itemsId,
                        focus: event.target.closest(fadeInSelector) != null
                    };
                });
            }
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return function () {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    };
    /**
     * Component will receive props
     *
     * @param props
     */
    ResultComponent.prototype.componentWillReceiveProps = function (props) {
        var itemsId = [];
        if (props.currentResult == null) {
            this.setState(function (prevState) {
                return {
                    itemsId: itemsId
                };
            });
            return;
        }
        var items = props.currentResult.getItems();
        items.map(function (item) {
            itemsId.push(item.uuid.composedUUID());
        });
        this.setState(function (prevState) {
            return {
                itemsId: itemsId
            };
        });
    };
    /**
     * Component will mount
     */
    ResultComponent.prototype.componentWillMount = function () {
        var props = this.props;
        /**
         * Dispatch action
         */
        ResultActions_1.configureQuery(props.environmentId, props.currentQuery, props.itemsPerPage, props.highlightsEnabled, props.suggestionsEnabled, props.promote.map(function (itemUUID) {
            return itemUUID instanceof ItemUUID_1.ItemUUID
                ? itemUUID
                : ItemUUID_1.ItemUUID.createFromArray(itemUUID);
        }), props.exclude.map(function (itemUUID) {
            return itemUUID instanceof ItemUUID_1.ItemUUID
                ? itemUUID
                : ItemUUID_1.ItemUUID.createFromArray(itemUUID);
        }), props.fields, props.filter);
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
        var environmentId = props.environmentId;
        var config = Container_1["default"].get(Constants_1.APISEARCH_CONFIG + "__" + environmentId);
        var apisearchUI = Container_1["default"].get(Constants_1.APISEARCH_UI + "__" + environmentId);
        var apisearchReference = apisearchUI.reference;
        var itemsListTemplate = props.template.itemsList;
        var placeholderTemplate = props.template.placeholder;
        var formatData = props.formatData;
        var currentResult = props.currentResult;
        var currentQuery = props.currentQuery;
        var currentVisibleResults = props.currentVisibleResults;
        var wrapperRef = compat_1.useRef(null);
        if (props.fadeInSelector != '') {
            this.addMouseDownListeners(wrapperRef, props.fadeInSelector);
        }
        if (!currentVisibleResults || !this.state.focus) {
            return (preact_1.h("div", { className: "as-result " + containerClassName }));
        }
        /**
         * Data accessible to the template
         */
        var items = currentResult.getItems();
        var reducedTemplateData = {
            query: currentQuery.getQueryText(),
            suggestions: currentResult.getSuggestions()
        };
        /**
         * Format each item data
         */
        var formattedTemplateData = __assign(__assign({}, reducedTemplateData), { items: (items)
                ? items.map(function (item) {
                    var appId = config.app_id;
                    var appUUID = item.getAppUUID();
                    if (typeof appUUID === "object") {
                        appId = appUUID.composedUUID();
                    }
                    var indexId = config.index_id;
                    var indexUUID = item.getIndexUUID();
                    if (typeof indexUUID === "object") {
                        indexId = indexUUID.composedUUID();
                    }
                    var itemId = item.getUUID().composedUUID();
                    var userId = config.user_id;
                    var clickParameters = typeof userId === "string"
                        ? appId + '", "' + indexId + '", "' + itemId + '", "' + userId
                        : appId + '", "' + indexId + '", "' + itemId;
                    var fields = Object.assign(item.getMetadata(), item.getIndexedMetadata(), item.getHighlights());
                    return __assign(__assign({}, formatData(item)), {
                        'fields': fields,
                        'click': apisearchReference + '.click("' + clickParameters + '");'
                    });
                })
                : [] });
        return (preact_1.h("div", { className: "as-result " + containerClassName, ref: wrapperRef }, (placeholderTemplate && dirty)
            ? preact_1.h(Template_1["default"], { template: placeholderTemplate, className: "as-result__placeholder " + placeholderClassName })
            : preact_1.h(Template_1["default"], { template: itemsListTemplate, data: formattedTemplateData, className: "as-result__itemsList " + itemsListClassName })));
    };
    return ResultComponent;
}(preact_1.Component));
ResultComponent.defaultProps = {
    fields: [],
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
    formatData: function (data) { return data; },
    fadeInSelector: ''
};
exports["default"] = ResultComponent;
