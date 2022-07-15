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
var SearchInputActions_1 = require("./SearchInputActions");
var Template_1 = require("../Template");
var AutocompleteComponent_1 = require("./AutocompleteComponent");
var compat_1 = require("preact/compat");
/**
 * SearchInput Component
 */
var SearchInputComponent = /** @class */ (function (_super) {
    __extends(SearchInputComponent, _super);
    /**
     * Constructor
     */
    function SearchInputComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.inputRef = compat_1.useRef(null);
        /**
         * @param search
         */
        _this.handleSearch = function (search) {
            var props = _this.props;
            var startSearchOn = props.startSearchOn;
            var finalSpace = search.charAt(search.length - 1) === " " ? " " : "";
            var targetValueNoSpaces = search.trim() + finalSpace;
            SearchInputActions_1.simpleSearchAction(props.environmentId, props.store.getCurrentQuery(), props.repository, targetValueNoSpaces === " " ? "" : targetValueNoSpaces, search.length >= startSearchOn);
        };
        /**
         * Clear search
         */
        _this.clearSearch = function () {
            var props = _this.props;
            var startSearchOn = props.startSearchOn;
            var environmentId = props.environmentId;
            var currentQuery = props.store.getCurrentQuery();
            var repository = props.repository;
            var visibleResults = 0 === startSearchOn;
            SearchInputActions_1.simpleSearchAction(environmentId, currentQuery, repository, "", visibleResults);
        };
        if (props.autocomplete) {
            _this.state = { queryText: "" };
        }
        var that = _this;
        window.addEventListener('beforeunload', function () {
            that.dispatchQueryStringEvent(props, 0);
        });
        return _this;
    }
    /**
     * Components will mount
     */
    SearchInputComponent.prototype.componentWillMount = function () {
        var props = this.props;
        /**
         * Dispatch action
         */
        SearchInputActions_1.initialSearchSetup(props.environmentId, props.store.getCurrentQuery(), props.autocomplete, props.searchableFields, props.queryOperator);
    };
    /**
     * Component will receive props
     *
     * @param props
     */
    SearchInputComponent.prototype.componentWillReceiveProps = function (props) {
        this.setState({
            queryText: props.store.getCurrentQuery().getQueryText()
        });
    };
    /**
     * Key down
     */
    SearchInputComponent.prototype.handleKeyDown = function (e) {
        switch (e.key) {
            case "ArrowRight":
            case "Tab":
            case "Enter":
                this.replaceWithAutocomplete(e);
                return;
        }
        switch (e.keyCode) {
            case 39:
            case 9:
            case 13:
                this.replaceWithAutocomplete(e);
                return;
        }
    };
    SearchInputComponent.prototype.replaceWithAutocomplete = function (e) {
        var props = this.props;
        var autocomplete = this.props.store.getCurrentResult().getAutocomplete();
        if (autocomplete !== null && autocomplete !== "") {
            SearchInputActions_1.simpleSearchAction(props.environmentId, props.store.getCurrentQuery(), props.repository, this.props.store.getCurrentResult().getAutocomplete(), true);
            e.preventDefault();
            return;
        }
    };
    /**
     * @param e
     */
    SearchInputComponent.prototype.doNothing = function (e) { };
    /**
     * @param config
     */
    SearchInputComponent.prototype.withConfig = function (config) {
    };
    /**
     * @param props
     * @param timeout
     */
    SearchInputComponent.prototype.dispatchQueryStringEvent = function (props, timeout) {
        var currentQuery = props.store.getCurrentQuery();
        var currentQueryText = currentQuery.getQueryText();
        if (this.queryTextEvent) {
            clearTimeout(this.queryTextEvent);
        }
        if (currentQueryText !== "") {
            var that_1 = this;
            this.queryTextEvent = setTimeout(function () {
                that_1.queryTextEvent = null;
                window.postMessage({
                    name: "apisearch_search",
                    query_text: currentQueryText,
                    query: currentQuery.toArray(),
                    site: props.store.getSite(),
                    device: props.store.getDevice()
                }, "*");
            }, timeout);
        }
    };
    /**
     * Search
     *
     * @return {any}
     */
    SearchInputComponent.prototype.render = function () {
        var _this = this;
        var props = this.props;
        var placeholder = props.placeholder;
        var autofocus = props.autofocus;
        var clearSearch = props.clearSearch;
        var withContainer = props.withContainer;
        var containerClassName = props.classNames.container;
        var inputClassName = props.classNames.input;
        var clearSearchClassName = props.classNames.clearSearch;
        var clearSearchTemplate = props.template.clearSearch;
        var currentQuery = props.store.getCurrentQuery();
        var currentQueryText = currentQuery.getQueryText();
        var htmlNodeInheritProps = props.htmlNodeInheritProps;
        var showAutocomplete = currentQuery.areAutocompleteEnabled();
        var autocomplete = props.store.getCurrentResult()
            ? props.store.getCurrentResult().getAutocomplete()
            : null;
        var keyDownCallback = showAutocomplete
            ? function (e) { return _this.handleKeyDown(e); }
            : function (e) { return _this.doNothing(e); };
        var keyDownAction = showAutocomplete
            ? function (e) { return _this.replaceWithAutocomplete(e); }
            : function (e) { return _this.doNothing(e); };
        var style = showAutocomplete
            ? "position: relative; top: 0px; left: 0px; background-color: transparent; border-color: transparent;"
            : "";
        var autocompletableClass = showAutocomplete
            ? "autocompletable"
            : "";
        this.dispatchQueryStringEvent(props, 2000);
        var searchInput = (preact_1.h("input", __assign({ type: "text", className: "as-searchInput__input " + inputClassName + " " + autocompletableClass, placeholder: placeholder, autofocus: autofocus }, htmlNodeInheritProps, { onInput: function (event) { return _this.handleSearch(event.target.value); }, value: currentQueryText, style: style, onKeyDown: keyDownCallback, onTouchStart: keyDownAction, ref: this.inputRef })));
        if (showAutocomplete) {
            searchInput = (preact_1.h("div", { style: "position: relative" },
                preact_1.h(AutocompleteComponent_1["default"], { autocomplete: autocomplete, queryText: currentQueryText, inputClassName: inputClassName }),
                searchInput));
        }
        if (withContainer) {
            searchInput = (preact_1.h("div", { className: "as-searchInput " + containerClassName },
                searchInput,
                (clearSearch && currentQueryText && currentQueryText.length !== 0)
                    ? (preact_1.h("div", { className: "as-searchInput__clearSearch " + clearSearchClassName, onClick: this.clearSearch },
                        preact_1.h(Template_1["default"], { template: clearSearchTemplate, dictionary: props.dictionary }))) : null));
        }
        return searchInput;
    };
    return SearchInputComponent;
}(preact_1.Component));
SearchInputComponent.defaultProps = {
    placeholder: "",
    autofocus: false,
    autocomplete: false,
    startSearchOn: 0,
    clearSearch: true,
    withContainer: true,
    searchableFields: [],
    speechRecognition: false,
    classNames: {
        container: "",
        input: "",
        clearSearch: ""
    },
    template: {
        clearSearch: "x",
        speechRecognition: "{S}"
    }
};
exports["default"] = SearchInputComponent;
