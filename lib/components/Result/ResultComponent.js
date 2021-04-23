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
        _this.observer = compat_1.useRef();
        _this.endResultsBoxRef = compat_1.useCallback(function (node) {
            if (_this.observer.current instanceof IntersectionObserver) {
                _this.observer.current.disconnect();
            }
            _this.observer.current = new IntersectionObserver(function (entries) {
                if (entries[0].isIntersecting) {
                    var _a = _this.props, environmentId = _a.environmentId, store = _a.store, repository = _a.repository;
                    ResultActions_1.infiniteScrollNextPageAction(environmentId, store.getCurrentQuery(), repository, _this.state.page + 1);
                }
            });
            if ((_this.observer.current instanceof IntersectionObserver) && node) {
                _this.observer.current.observe(node);
            }
        }, []);
        _this.state = {
            items: [],
            page: 0,
            hasNewPage: false,
            focus: props.fadeInSelector === ""
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
                        items: prevState.items,
                        page: prevState.page,
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
        if (props.store.getCurrentResult() == null) {
            this.setState(function (prevState) {
                return {
                    items: [],
                    page: 0,
                    hasNewPage: false
                };
            });
            return;
        }
        var currentResult = props.store.getCurrentResult();
        var currentQuery = props.store.getCurrentQuery();
        var items = currentResult.getItems();
        var currentPage = currentQuery.getPage();
        var hasNewPage = (currentResult.getTotalHits() > (currentPage * currentQuery.getSize()));
        var hasInfiniteScroll = (props.infiniteScroll !== false) &&
            ((props.infiniteScroll === true) ||
                (props.infiniteScroll >= 0));
        if (hasInfiniteScroll && currentPage > 1) {
            items = this.state.items.concat(items);
        }
        this.setState(function (prevState) {
            return {
                items: items,
                page: props.store.getCurrentQuery().getPage(),
                hasNewPage: hasNewPage
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
        ResultActions_1.configureQuery(props.environmentId, props.store.getCurrentQuery(), props.itemsPerPage, props.highlightsEnabled, props.suggestionsEnabled, props.promote.map(function (itemUUID) {
            return itemUUID instanceof ItemUUID_1.ItemUUID
                ? itemUUID
                : ItemUUID_1.ItemUUID.createFromArray(itemUUID);
        }), props.exclude.map(function (itemUUID) {
            return itemUUID instanceof ItemUUID_1.ItemUUID
                ? itemUUID
                : ItemUUID_1.ItemUUID.createFromArray(itemUUID);
        }), props.fields, props.filter, props.minScore);
    };
    /**
     * Render
     *
     * @return {any}
     */
    ResultComponent.prototype.render = function () {
        var _a;
        var props = this.props;
        var dirty = props.store.isDirty();
        var containerClassName = props.classNames.container;
        var itemsListClassName = props.classNames.itemsList;
        var placeholderClassName = props.classNames.placeholder;
        var environmentId = props.environmentId;
        var config = Container_1["default"].get(Constants_1.APISEARCH_CONFIG + "__" + environmentId);
        var apisearchUI = Container_1["default"].get(Constants_1.APISEARCH_UI + "__" + environmentId);
        var apisearchReference = apisearchUI.reference;
        var itemsListTemplate = props.template.itemsList;
        var placeholderTemplate = (_a = props.template.placeholder) !== null && _a !== void 0 ? _a : "";
        var formatData = props.formatData;
        var currentResult = props.store.getCurrentResult();
        var currentQuery = props.store.getCurrentQuery();
        var currentVisibleResults = props.currentVisibleResults;
        var wrapperRef = compat_1.useRef(null);
        var hasInfiniteScrollNextPage = (props.infiniteScroll !== false) &&
            ((props.infiniteScroll === true) ||
                (props.infiniteScroll >= 0)) &&
            this.state.hasNewPage;
        var infiniteScrollMargin = hasInfiniteScrollNextPage
            ? (props.infiniteScroll === true
                ? 0
                : props.infiniteScroll)
            : undefined;
        if (props.fadeInSelector !== "") {
            this.addMouseDownListeners(wrapperRef, props.fadeInSelector);
        }
        if (!currentVisibleResults || !this.state.focus) {
            return (preact_1.h("div", { className: "as-result " + containerClassName }));
        }
        /**
         * Data accessible to the template
         */
        var items = this.state.items;
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
                    var mainFields = {};
                    Object.assign(mainFields, item.getMetadata(), item.getIndexedMetadata(), item.getHighlights());
                    var fieldsConciliation = {};
                    Object.keys(props.fieldsConciliation).map(function (field, index) {
                        var _a;
                        fieldsConciliation[field] = (_a = mainFields[props.fieldsConciliation[field]]) !== null && _a !== void 0 ? _a : undefined;
                    });
                    Object.assign(mainFields, fieldsConciliation);
                    item.fields = mainFields;
                    return __assign(__assign({}, formatData(item)), {
                        key: "item_" + itemId,
                        uuid_composed: itemId,
                        click: apisearchReference + '.click("' + clickParameters + '");',
                        striptags: function () {
                            return function (val, render) { return render(val).replace(/(<([^>]+)>)/ig, ""); };
                        }
                    });
                })
                : [] });
        return (preact_1.h("div", { className: "as-result " + containerClassName, ref: wrapperRef, style: "position: relative" },
            (dirty)
                ? preact_1.h(Template_1["default"], { template: placeholderTemplate, className: "as-result__placeholder " + placeholderClassName, dictionary: this.props.dictionary })
                : preact_1.h(Template_1["default"], { template: itemsListTemplate, data: formattedTemplateData, className: "as-result__itemsList " + itemsListClassName, dictionary: this.props.dictionary }),
            hasInfiniteScrollNextPage
                ? preact_1.h("div", { ref: this.endResultsBoxRef, style: "position: absolute; bottom: " + infiniteScrollMargin + "px;" })
                : ""));
    };
    return ResultComponent;
}(preact_1.Component));
ResultComponent.defaultProps = {
    fields: [],
    itemsPerPage: 10,
    highlightsEnabled: false,
    promote: [],
    exclude: [],
    filter: function (query) { return null; },
    classNames: {
        container: "",
        itemsList: "",
        placeholder: ""
    },
    template: {
        itemsList: defaultTemplates_1.defaultItemsListTemplate,
        placeholder: null
    },
    formatData: function (data) { return data; },
    fadeInSelector: "",
    fieldsConciliation: {}
};
exports["default"] = ResultComponent;
