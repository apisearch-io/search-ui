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
var ItemUUID_1 = require("apisearch/lib/Model/ItemUUID");
var preact_1 = require("preact");
var compat_1 = require("preact/compat");
var Constants_1 = require("../../Constants");
var Container_1 = require("../../Container");
var Template_1 = require("../Template");
var defaultTemplates_1 = require("./defaultTemplates");
var Item_1 = require("./Item");
var ResultActions_1 = require("./ResultActions");
var Common_1 = require("../Common");
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
        _this.observer = (0, compat_1.useRef)();
        _this.endResultsBoxRef = (0, compat_1.useCallback)(function (node) {
            if (_this.observer.current instanceof IntersectionObserver) {
                _this.observer.current.disconnect();
            }
            _this.observer.current = new IntersectionObserver(function (entries) {
                if (entries[0].isIntersecting) {
                    _this.loadNextPage();
                }
            });
            if ((_this.observer.current instanceof IntersectionObserver) && node) {
                _this.observer.current.observe(node);
            }
        }, []);
        /**
         * @param word
         */
        _this.handleAlternativeClick = function (word) {
            var props = _this.props;
            /**
             * Dispatch action
             */
            (0, Common_1.onWordClickAction)(props.environmentId, props.store.getCurrentQuery(), props.repository, word);
        };
        _this.state = {
            customResponse: "",
            focus: props.fadeInSelector === "",
            hasNewPage: false,
            items: [],
            page: 0
        };
        return _this;
    }
    ResultComponent.prototype.loadNextPage = function () {
        var _a = this.props, environmentId = _a.environmentId, store = _a.store, repository = _a.repository;
        this.fromLoadingNextPage = true;
        this.currentExpectedPage = this.state.page + 1;
        (0, ResultActions_1.infiniteScrollNextPageAction)(environmentId, store.getCurrentQuery(), repository, this.currentExpectedPage);
    };
    /**
     * Hook that change state once mouse clicks inside or outside the container
     */
    ResultComponent.prototype.addMouseDownListeners = function (ref, fadeInSelector) {
        var _this = this;
        (0, compat_1.useEffect)(function () {
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
            document.addEventListener("mousedown", handleClickOutside, { passive: true });
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
            this.setState(function (_) {
                return {
                    customResponse: "",
                    hasNewPage: false,
                    items: [],
                    page: 0
                };
            });
            return;
        }
        var currentResult = props.store.getCurrentResult();
        var currentQuery = props.store.getCurrentQuery();
        var items = currentResult.getItems();
        var currentPage = this.page();
        var hasNewPage = (currentResult.getTotalHits() > (currentPage * currentQuery.getSize()));
        var currentItems = this.fromLoadingNextPage
            ? this.state.items.concat(items)
            : items;
        this.fromLoadingNextPage = false;
        this.currentExpectedPage = undefined;
        this.setState(function (_) {
            return {
                customResponse: currentResult.getMetadataValue("custom_response"),
                hasNewPage: hasNewPage,
                items: currentItems,
                page: currentPage
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
        (0, ResultActions_1.configureQuery)(props.environmentId, props.store.getCurrentQuery(), props.itemsPerPage, props.highlightsEnabled, props.promote.map(function (itemUUID) {
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
     * @private
     */
    ResultComponent.prototype.page = function () {
        var _a;
        return (_a = this.currentExpectedPage) !== null && _a !== void 0 ? _a : this.props.store.getCurrentQuery().getPage();
    };
    /**
     * Render
     *
     * @return {any}
     */
    ResultComponent.prototype.render = function () {
        var _this = this;
        var _a;
        var that = this;
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
        var subResults = Object.values(currentResult.getSubresults());
        var wrapperRef = (0, compat_1.useRef)(null);
        var customResponse = currentResult.getMetadataValue("custom_response");
        var redirection = currentResult.getMetadataValue("redirection");
        // Check for custom response html
        var customResponseBody;
        if (customResponse) {
            customResponseBody = ((0, preact_1.h)(Template_1["default"], { template: customResponse.content, className: "as-result__custom_response", dictionary: this.props.dictionary }));
            if (customResponse.only) {
                return customResponseBody;
            }
        }
        var resetRedirectionOnEnter = true;
        if (redirection) {
            if (redirection.type === "automatic") {
                window.top.location.href = redirection.url;
            }
            else if (redirection.type === "on_enter") {
                window.postMessage({
                    name: "apisearch_bind_enter_redirection",
                    url: redirection.url
                }, "*");
                resetRedirectionOnEnter = false;
            }
            if (this.props.template.redirection) {
                customResponseBody = (0, preact_1.h)("div", null,
                    (0, preact_1.h)(Template_1["default"], { template: this.props.template.redirection, data: {
                            url: redirection.url,
                            query: currentQuery.getQueryText()
                        }, className: "as-result__redirection", dictionary: this.props.dictionary }),
                    customResponseBody);
            }
        }
        if (resetRedirectionOnEnter) {
            window.postMessage({
                name: "apisearch_bind_enter_redirection",
                url: undefined
            }, "*");
        }
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
            return ((0, preact_1.h)("div", { className: "as-result ".concat(containerClassName) }));
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
        var page = this.state.page;
        var isInfiniteActive = page > 1;
        var firstItem = ((this.state.page - 1) * currentQuery.getSize());
        var itemsForEvent = items;
        if (isInfiniteActive) {
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
            page: this.state.page,
            site: props.store.getSite(),
            device: props.store.getDevice(),
            userType: props.store.getUserType(),
            items: itemsForEvent.map(function (item) {
                return {
                    fields: item.fields,
                    uuid: item.uuid
                };
            })
        }, "*");
        /**
         * Uses defined a custom items list. Old version
         */
        if (props.template.itemsList !== defaultTemplates_1.defaultItemsListTemplate) {
            return ((0, preact_1.h)("div", { className: "as-result ".concat(containerClassName), ref: wrapperRef, style: "position: relative" },
                (dirty)
                    ? (0, preact_1.h)(Template_1["default"], { template: placeholderTemplate, className: "as-result__placeholder ".concat(placeholderClassName), dictionary: this.props.dictionary })
                    : (0, preact_1.h)(Template_1["default"], { template: itemsListTemplate, data: __assign(__assign({}, reducedTemplateData), { items: (items)
                                ? items.map(function (item, position) { return _this.hydrateItem(item, position); })
                                : [] }), className: "as-result__itemsList ".concat(itemsListClassName), dictionary: this.props.dictionary }),
                hasInfiniteScrollNextPage
                    ? (props.infiniteScrollButton
                        ? (0, preact_1.h)("div", { onClick: function (e) {
                                that.loadNextPage();
                            } },
                            (0, preact_1.h)(Template_1["default"], { template: props.template.next_page_button, data: {
                                    page: this.state.page + 1
                                } }))
                        : (0, preact_1.h)("div", { ref: this.endResultsBoxRef, style: "bottom: ".concat(infiniteScrollMargin, "px; position: relative;") }))
                    : ""));
        }
        if (dirty) {
            return ((0, preact_1.h)("div", { className: "as-result ".concat(containerClassName), ref: wrapperRef },
                (0, preact_1.h)(Template_1["default"], { template: placeholderTemplate, className: "as-result__placeholder ".concat(placeholderClassName), dictionary: props.dictionary })));
        }
        /**
         * New version
         */
        return ((0, preact_1.h)("div", { className: "as-result ".concat(containerClassName), ref: wrapperRef },
            customResponseBody,
            (dirty)
                ? (0, preact_1.h)(Template_1["default"], { template: placeholderTemplate, className: "as-result__placeholder ".concat(placeholderClassName), dictionary: this.props.dictionary })
                : ((items.length > 0)
                    ? ((0, preact_1.h)("div", { className: "as-result__itemsList ".concat(props.classNames.itemsList) },
                        items.map(function (item, position) {
                            return (0, preact_1.h)(Item_1["default"], { data: __assign(__assign(__assign({}, reducedTemplateData), _this.hydrateItem(item, position)), { query: currentQuery.getQueryText() }), template: props.template.item, className: "as-result__item ".concat(props.classNames.item), dictionary: props.dictionary });
                        }),
                        hasInfiniteScrollNextPage
                            ? (props.infiniteScrollButton
                                ? ""
                                : ((0, preact_1.h)("div", { id: "as-result__infinite_scroll_inspector", ref: this.endResultsBoxRef, style: "bottom: ".concat(infiniteScrollMargin, "px; position: relative; width: 100%;") })))
                            : ""))
                    : ""),
            hasInfiniteScrollNextPage
                ? (props.infiniteScrollButton
                    ? ((0, preact_1.h)("div", { onClick: function (e) {
                            that.loadNextPage();
                        } },
                        (0, preact_1.h)(Template_1["default"], { template: props.template.next_page_button, data: {
                                page: this.state.page + 1
                            } })))
                    : "")
                : "",
            (subResults.length > 0)
                ? (0, preact_1.h)("div", { className: "as-result__alternativeList" }, subResults.map(function (subResult) {
                    return (0, preact_1.h)("div", { className: "as-result__alternative" },
                        (0, preact_1.h)("div", { className: "as-result__alternative_query" },
                            (0, preact_1.h)("span", { onClick: function (e) {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    that.handleAlternativeClick(subResult.metadata.query_text);
                                } },
                                (0, preact_1.h)(Template_1["default"], { template: props.template.alternative_title, data: {
                                        word: subResult.metadata.query_text_html
                                    }, dictionary: props.dictionary })),
                            (0, preact_1.h)("a", { onClick: function (e) {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    that.handleAlternativeClick(subResult.metadata.query_text);
                                } },
                                (0, preact_1.h)(Template_1["default"], { template: props.template.alternative_all_results, data: {
                                        num: subResult.getTotalHits()
                                    }, dictionary: props.dictionary }))),
                        (0, preact_1.h)("div", { className: "as-result__alternative_items" }, subResult.items.map(function (item, position) {
                            return (0, preact_1.h)(Item_1["default"], { data: __assign(__assign({}, reducedTemplateData), _this.hydrateItem(item, position)), template: props.template.item, className: "as-result__alternative_item ".concat(props.classNames.item), dictionary: _this.props.dictionary });
                        })));
                }))
                : (((items.length === 0) && customResponseBody === undefined)
                    ? (0, preact_1.h)(Template_1["default"], { template: props.template.noResults, data: {
                            query: currentQuery.getQueryText()
                        }, className: "as-result__noresults ".concat(props.classNames.noResults), dictionary: props.dictionary })
                    : "")));
    };
    /**
     * @param item
     * @param position
     * @private
     */
    ResultComponent.prototype.hydrateItem = function (item, position) {
        var props = this.props;
        var environmentId = props.environmentId;
        var config = Container_1["default"].get("".concat(Constants_1.APISEARCH_CONFIG, "__").concat(environmentId));
        var apisearchUI = Container_1["default"].get("".concat(Constants_1.APISEARCH_UI, "__").concat(environmentId));
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
            click: apisearchReference + '.click("' + appId + '", "' + indexId + '", "' + itemId + '", ' + position + ");",
            add_to_cart: apisearchReference + '.interact("add_cart", "' + appId + '", "' + indexId + '", "' + itemId + '", ' + position + ");",
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
    subResult: false,
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
        placeholder: null,
        alternative_title: defaultTemplates_1.defaultAlternativeTitleTemplate,
        alternative_all_results: defaultTemplates_1.defaultAlternativeAllResultsTemplate,
        next_page_button: defaultTemplates_1.defaultNextPageButtonTemplate,
        redirection: null
    },
    formatData: function (data) { return data; },
    fadeInSelector: "",
    fieldsConciliation: {}
};
exports["default"] = ResultComponent;
