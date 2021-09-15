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
            var environmentId = props.environmentId;
            var currentQuery = props.store.getCurrentQuery();
            var repository = props.repository;
            var visibleResults = search.length >= startSearchOn;
            var finalSpace = search.charAt(search.length - 1) === " " ? " " : "";
            var targetValueNoSpaces = search.trim() + finalSpace;
            var finalTargetValue = targetValueNoSpaces === " " ? "" : targetValueNoSpaces;
            SearchInputActions_1.simpleSearchAction(environmentId, currentQuery, repository, finalTargetValue, visibleResults);
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
        var speechRecognition = window["webkitSpeechRecognition"];
        if (props.speechRecognition && typeof speechRecognition === "function") {
            that.speechRecognition = new speechRecognition();
            that.speechRecognition.onresult = function (event) {
                var text = event.results[0][0].transcript;
                that.handleSearch(text);
            };
            that.speechRecognition.onerror = function (event) {
                console.log("Speech Recognition Error - " + event.error);
            };
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
        var currentQuery = props.store.getCurrentQuery();
        var autocomplete = props.autocomplete;
        var searchableFields = props.searchableFields;
        /**
         * Dispatch action
         */
        SearchInputActions_1.initialSearchSetup(environmentId, currentQuery, initialSearch, autocomplete, searchableFields);
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
                this.replaceWithSuggestion(e);
                return;
        }
        switch (e.keyCode) {
            case 39:
            case 9:
            case 13:
                this.replaceWithSuggestion(e);
                return;
        }
    };
    SearchInputComponent.prototype.replaceWithSuggestion = function (e) {
        var props = this.props;
        var environmentId = props.environmentId;
        var currentQuery = props.store.getCurrentQuery();
        var repository = props.repository;
        if (this.props.store.getCurrentResult().getSuggestions().length > 0) {
            SearchInputActions_1.simpleSearchAction(environmentId, currentQuery, repository, this.props.store.getCurrentResult().getSuggestions()[0], true);
            e.preventDefault();
            return;
        }
    };
    /**
     * @param e
     * @param speechRecognition
     */
    SearchInputComponent.prototype.onSpeechMouseDown = function (e, speechRecognition) {
        speechRecognition.start();
    };
    /**
     * @param e
     * @param speechRecognition
     */
    SearchInputComponent.prototype.onSpeechMouseUp = function (e, speechRecognition) {
        speechRecognition.stop();
    };
    /**
     * @param e
     */
    SearchInputComponent.prototype.doNothing = function (e) { };
    /**
     * @param config
     */
    SearchInputComponent.prototype.withConfig = function (config) {
        var _a;
        if (this.speechRecognition) {
            this.speechRecognition.lang = (_a = this.props.config.options.locale) !== null && _a !== void 0 ? _a : "";
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
        var currentQueryText = props.store.getCurrentQuery().getQueryText();
        var htmlNodeInheritProps = props.htmlNodeInheritProps;
        var suggestions = props.store.getCurrentResult()
            ? props.store.getCurrentResult().getSuggestions()
            : [];
        var showAutocomplete = props.autocomplete;
        var keyDownCallback = showAutocomplete
            ? function (e) { return _this.handleKeyDown(e); }
            : function (e) { return _this.doNothing(e); };
        var keyDownAction = showAutocomplete
            ? function (e) { return _this.replaceWithSuggestion(e); }
            : function (e) { return _this.doNothing(e); };
        var style = showAutocomplete
            ? "position: relative; top: 0px; left: 0px; background-color: transparent; border-color: transparent;"
            : "";
        var autocompletableClass = showAutocomplete
            ? "autocompletable"
            : "";
        var searchInput = (preact_1.h("input", __assign({ type: "text", className: "as-searchInput__input " + inputClassName + " " + autocompletableClass, placeholder: placeholder, autofocus: autofocus }, htmlNodeInheritProps, { onInput: function (event) { return _this.handleSearch(event.target.value); }, value: currentQueryText, style: style, onKeyDown: keyDownCallback, onTouchStart: keyDownAction, ref: this.inputRef })));
        if (showAutocomplete) {
            searchInput = (preact_1.h("div", { style: "position: relative" },
                preact_1.h(AutocompleteComponent_1["default"], { suggestions: suggestions, queryText: currentQueryText, inputClassName: inputClassName }),
                searchInput));
        }
        if (this.speechRecognition) {
            searchInput = (preact_1.h("div", { style: "position: relative" },
                searchInput,
                preact_1.h("div", { "class": "as-searchInput-speechRecognition", onMouseDown: function (e) { return _this.onSpeechMouseDown(e, _this.speechRecognition); }, onMouseUp: function (e) { return _this.onSpeechMouseUp(e, _this.speechRecognition); } },
                    preact_1.h(Template_1["default"], { template: props.template.speechRecognition, dictionary: props.dictionary }))));
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
    initialSearch: "",
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
