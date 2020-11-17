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
        /**
         * Handle search
         *
         * @param e
         */
        _this.handleSearch = function (e) {
            var props = _this.props;
            var startSearchOn = props.startSearchOn;
            var environmentId = props.environmentId;
            var currentQuery = props.currentQuery;
            var repository = props.repository;
            var visibleResults = e.target.value.length >= startSearchOn;
            /**
             * Dispatch input search action
             */
            SearchInputActions_1.simpleSearchAction(environmentId, currentQuery, repository, e.target.value, visibleResults);
        };
        /**
         * Clear search
         */
        _this.clearSearch = function () {
            var props = _this.props;
            var startSearchOn = props.startSearchOn;
            var environmentId = props.environmentId;
            var currentQuery = props.currentQuery;
            var repository = props.repository;
            var visibleResults = 0 == startSearchOn;
            SearchInputActions_1.simpleSearchAction(environmentId, currentQuery, repository, '', visibleResults);
        };
        if (props.autocomplete) {
            _this.state = { queryText: '' };
        }
        return _this;
    }
    /**
     * Components will mount
     */
    SearchInputComponent.prototype.componentWillMount = function () {
        var props = this.props;
        var environmentId = props.environmentId;
        var initialSearch = props.initialSearch;
        var currentQuery = props.currentQuery;
        var autocomplete = props.autocomplete;
        /**
         * Dispatch action
         */
        SearchInputActions_1.initialSearchSetup(environmentId, currentQuery, initialSearch, autocomplete);
    };
    /**
     * Component will receive props
     *
     * @param props
     */
    SearchInputComponent.prototype.componentWillReceiveProps = function (props) {
        if (props.autocomplete) {
            this.setState({
                queryText: props.currentQuery.getQueryText()
            });
        }
    };
    /**
     * Key down
     */
    SearchInputComponent.prototype.handleKeyDown = function (e) {
        switch (e.keyCode) {
            case 39:
            case 9:
                var props = this.props;
                var environmentId = props.environmentId;
                var currentQuery = props.currentQuery;
                var repository = props.repository;
                if (this.props.currentResult.getSuggestions().length > 0) {
                    SearchInputActions_1.simpleSearchAction(environmentId, currentQuery, repository, this.props.currentResult.getSuggestions()[0], true);
                }
                break;
        }
    };
    SearchInputComponent.prototype.doNothing = function (e) { };
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
        var currentQueryText = props.currentQuery.getQueryText();
        var htmlNodeInheritProps = props.htmlNodeInheritProps;
        var suggestions = props.currentResult
            ? props.currentResult.getSuggestions()
            : [];
        var showAutocomplete = props.autocomplete;
        var keyDownCallback = showAutocomplete
            ? function (e) { return _this.handleKeyDown(e); }
            : function (e) { return _this.doNothing(e); };
        var style = showAutocomplete
            ? 'position: relative; top: 0px; left: 0px; background-color: transparent; border-color: transparent;'
            : '';
        var searchInput = (preact_1.h("input", __assign({ type: 'text', className: "as-searchInput__input " + inputClassName, placeholder: placeholder, autofocus: autofocus }, htmlNodeInheritProps, { onInput: this.handleSearch, value: currentQueryText, style: style, onKeyDown: keyDownCallback })));
        if (showAutocomplete) {
            searchInput = (preact_1.h("div", { style: "position: relative" },
                preact_1.h(AutocompleteComponent_1["default"], { suggestions: suggestions, queryText: currentQueryText, inputClassName: inputClassName }),
                searchInput));
        }
        if (withContainer) {
            searchInput = (preact_1.h("div", { className: "as-searchInput " + containerClassName },
                searchInput,
                (clearSearch && currentQueryText && currentQueryText.length !== 0)
                    ? (preact_1.h("div", { className: "as-searchInput__clearSearch " + clearSearchClassName, onClick: this.clearSearch },
                        preact_1.h(Template_1["default"], { template: clearSearchTemplate }))) : null));
        }
        return searchInput;
    };
    return SearchInputComponent;
}(preact_1.Component));
SearchInputComponent.defaultProps = {
    placeholder: '',
    autofocus: false,
    autocomplete: false,
    startSearchOn: 0,
    clearSearch: true,
    initialSearch: '',
    withContainer: true,
    classNames: {
        container: '',
        input: '',
        clearSearch: ''
    },
    template: {
        clearSearch: 'x'
    }
};
exports["default"] = SearchInputComponent;
