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
var ItemUUID_1 = require("apisearch/lib/Model/ItemUUID");
var preact_1 = require("preact");
var compat_1 = require("preact/compat");
var Constants_1 = require("../../Constants");
var Container_1 = require("../../Container");
var Template_1 = require("../Template");
var defaultTemplates_1 = require("./defaultTemplates");
var Item_1 = require("./Item");
var ResultActions_1 = require("./ResultActions");
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
        _this.fromLoadingNextPage = false;
        _this.observer = compat_1.useRef();
        _this.endResultsBoxRef = compat_1.useCallback(function (node) {
            if (_this.observer.current instanceof IntersectionObserver) {
                _this.observer.current.disconnect();
            }
            _this.observer.current = new IntersectionObserver(function (entries) {
                if (entries[0].isIntersecting) {
                    var _a = _this.props, environmentId = _a.environmentId, store = _a.store, repository = _a.repository;
                    _this.fromLoadingNextPage = true;
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
                self.setState(function () {
                    return {
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
        var currentItems = this.fromLoadingNextPage
            ? this.state.items.concat(items)
            : items;
        this.fromLoadingNextPage = false;
        this.setState(function (prevState) {
            return {
                items: currentItems,
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
        ResultActions_1.configureQuery(props.environmentId, props.store.getCurrentQuery(), props.itemsPerPage, props.highlightsEnabled, props.promote.map(function (itemUUID) {
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
        var _this = this;
        var _a;
        var props = this.props;
        var dirty = props.store.isDirty();
        var containerClassName = props.classNames.container;
        var itemsListClassName = props.classNames.itemsList;
        var placeholderClassName = props.classNames.placeholder;
        var itemsListTemplate = props.template.itemsList;
        var placeholderTemplate = (_a = props.template.placeholder) !== null && _a !== void 0 ? _a : "";
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
         * We should add positions to items
         * When the number of items to render is higher than the page size, we are in front of infinite scroll
         */
        var isInfinite = (currentQuery.getPage() === 1) || items.length > currentQuery.getSize();
        var firstItem = ((currentQuery.getPage() - 1) * currentQuery.getSize());
        var itemsForEvent = items;
        if (isInfinite) {
            itemsForEvent = Array.prototype.slice.call(items, firstItem);
        }
        Array.prototype.forEach.call(itemsForEvent, function (item) {
            item.position = ++firstItem;
            item.id = item.getId();
        });
        window.postMessage({
            name: "apisearch_result_items",
            query: currentQuery.toArray(),
            query_text: currentQuery.getQueryText(),
            with_results: items.length > 0,
            page: currentQuery.getPage(),
            site: props.store.getSite(),
            device: props.store.getDevice(),
            items: itemsForEvent
        }, "*");
        /**
         * Uses defined a custom items list. Old version
         */
        if (props.template.itemsList !== defaultTemplates_1.defaultItemsListTemplate) {
            return (preact_1.h("div", { className: "as-result " + containerClassName, ref: wrapperRef, style: "position: relative" },
                (dirty)
                    ? preact_1.h(Template_1["default"], { template: placeholderTemplate, className: "as-result__placeholder " + placeholderClassName, dictionary: this.props.dictionary })
                    : preact_1.h(Template_1["default"], { template: itemsListTemplate, data: __assign(__assign({}, reducedTemplateData), { items: (items)
                                ? items.map(function (item) { return _this.hydrateItem(item); })
                                : [] }), className: "as-result__itemsList " + itemsListClassName, dictionary: this.props.dictionary }),
                hasInfiniteScrollNextPage
                    ? preact_1.h("div", { ref: this.endResultsBoxRef, style: "bottom: " + infiniteScrollMargin + "px; position: relative;" })
                    : ""));
        }
        /**
         * New version
         */
        return (preact_1.h("div", { className: "as-result " + containerClassName, ref: wrapperRef }, (dirty)
            ? preact_1.h(Template_1["default"], { template: placeholderTemplate, className: "as-result__placeholder " + placeholderClassName, dictionary: this.props.dictionary })
            : ((items.length > 0)
                ? (preact_1.h("div", { className: "as-result__itemsList " + props.classNames.itemsList },
                    items.map(function (item) {
                        return preact_1.h(Item_1["default"], { data: __assign(__assign({}, reducedTemplateData), _this.hydrateItem(item)), template: props.template.item, className: "as-result__item " + props.classNames.item, dictionary: _this.props.dictionary });
                    }),
                    hasInfiniteScrollNextPage
                        ? preact_1.h("div", { id: "as-result__infinite_scroll_inspector", ref: this.endResultsBoxRef, style: "bottom: " + infiniteScrollMargin + "px; position: relative; width: 100%;" })
                        : ""))
                : preact_1.h(Template_1["default"], { template: props.template.noResults, data: {
                        query: currentQuery.getQueryText()
                    }, className: "as-result__noresults " + props.classNames.noResults, dictionary: this.props.dictionary }))));
    };
    /**
     * @param item
     */
    ResultComponent.prototype.hydrateItem = function (item) {
        var props = this.props;
        var environmentId = props.environmentId;
        var config = Container_1["default"].get(Constants_1.APISEARCH_CONFIG + "__" + environmentId);
        var apisearchUI = Container_1["default"].get(Constants_1.APISEARCH_UI + "__" + environmentId);
        var apisearchReference = apisearchUI.reference;
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
        var mainFields = {};
        Object.assign(mainFields, item.getMetadata(), item.getIndexedMetadata());
        var fieldsConciliation = {};
        Object.keys(props.fieldsConciliation).map(function (field, index) {
            var _a;
            fieldsConciliation[field] = (_a = mainFields[props.fieldsConciliation[field]]) !== null && _a !== void 0 ? _a : undefined;
        });
        Object.assign(mainFields, fieldsConciliation);
        item.fields = mainFields;
        var queryText = "";
        if (this.props.store.getCurrentQuery()) {
            queryText = this.props.store.getCurrentQuery().getQueryText();
        }
        return __assign(__assign({}, props.formatData(item)), {
            key: "item_" + itemId,
            uuid_composed: itemId,
            click: apisearchReference + '.click("' + appId + '", "' + indexId + '", "' + itemId + '");',
            add_to_cart: apisearchReference + '.interact("add_cart", "' + appId + '", "' + indexId + '", "' + itemId + '");',
            query_text: queryText,
            highlights_enabled: this.props.highlightsEnabled,
            striptags: function () {
                return function (val, render) { return render(val).replace(/(<([^>]+)>)/ig, ""); };
            }
        });
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
        item: "",
        noResults: "",
        placeholder: ""
    },
    template: {
        itemsList: defaultTemplates_1.defaultItemsListTemplate,
        item: defaultTemplates_1.defaultItemTemplate,
        noResults: defaultTemplates_1.defaultNoResultsItemTemplate,
        placeholder: null
    },
    formatData: function (data) { return data; },
    fadeInSelector: "",
    fieldsConciliation: {}
};
exports["default"] = ResultComponent;
