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
var SearchInputActions_1 = require("../components/SearchInput/SearchInputActions");
var SearchInputComponent_1 = require("../components/SearchInput/SearchInputComponent");
var Widget_1 = require("./Widget");
/**
 * SearchInput
 */
var SearchInput = /** @class */ (function (_super) {
    __extends(SearchInput, _super);
    /**
     * Constructor
     *
     * @param target
     * @param placeholder
     * @param startSearchOn
     * @param clearSearch
     * @param withContainer
     * @param autofocus
     * @param autocomplete
     * @param classNames
     * @param template
     * @param searchableFields
     * @param speechRecognition
     * @param queryOperator
     */
    function SearchInput(_a) {
        var target = _a.target, placeholder = _a.placeholder, startSearchOn = _a.startSearchOn, clearSearch = _a.clearSearch, withContainer = _a.withContainer, autofocus = _a.autofocus, autocomplete = _a.autocomplete, classNames = _a.classNames, template = _a.template, searchableFields = _a.searchableFields, speechRecognition = _a.speechRecognition, queryOperator = _a.queryOperator;
        var _this = _super.call(this) || this;
        _this.target = target;
        _this.component = preact_1.h(SearchInputComponent_1["default"], { target: target, placeholder: placeholder, autofocus: autofocus, autocomplete: autocomplete, startSearchOn: startSearchOn, clearSearch: clearSearch, withContainer: withContainer, searchableFields: searchableFields, speechRecognition: speechRecognition, classNames: __assign(__assign({}, SearchInputComponent_1["default"].defaultProps.classNames), classNames), template: __assign(__assign({}, SearchInputComponent_1["default"].defaultProps.template), template), queryOperator: queryOperator, config: _this.config });
        _this.queryOperator = queryOperator;
        _this.autocomplete = autocomplete;
        _this.searchableFields = searchableFields;
        return _this;
    }
    /**
     * @param environmentId
     * @param store
     * @param repository
     * @param dictionary
     */
    SearchInput.prototype.render = function (environmentId, store, repository, dictionary) {
        this.component.props = __assign(__assign({}, this.component.props), { environmentId: environmentId, repository: repository, store: store, htmlNodeInheritProps: {
                autocomplete: "off",
                spellcheck: false
            }, dictionary: dictionary });
        if (this.target === null) {
            return;
        }
        if (!this.targetNode) {
            var targetNode = document.querySelector(this.target);
            var isInput = isInputElement(targetNode);
            if (isInput) {
                this.component.props = __assign(__assign({}, this.component.props), { withContainer: false, htmlNodeInheritProps: __assign(__assign({}, this.component.props.htmlNodeInheritedProps), getNodeAttributes(targetNode)) });
                var parentNode = targetNode.parentNode;
                targetNode.remove();
                this.targetNode = parentNode;
            }
            else {
                this.targetNode = targetNode;
            }
        }
        if (this.isSecondRender === undefined) {
            this.isSecondRender = true;
        }
        else if (this.isSecondRender === true) {
            this.isSecondRender = false;
        }
        if (!this.targetNode) {
            return;
        }
        preact_1.render(this.component, this.targetNode);
    };
    /**
     * @param query
     * @param object
     */
    SearchInput.prototype.toUrlObject = function (query, object) {
        var q = query.q;
        if (q !== undefined &&
            q !== "") {
            object.q = q;
        }
    };
    /**
     * @param object
     * @param query
     */
    SearchInput.prototype.fromUrlObject = function (object, query) {
        var q = object.q;
        if (q !== undefined &&
            q !== "") {
            query.q = q;
        }
    };
    /**
     * @param query
     */
    SearchInput.prototype.reset = function (query) {
        delete query.q;
    };
    /**
     * @param environmentId
     * @param store
     * @param repository
     */
    SearchInput.prototype.initialSetup = function (environmentId, store, repository) {
        /**
         * Dispatch action
         */
        SearchInputActions_1.initialSearchSetup(environmentId, store.getCurrentQuery(), this.autocomplete, this.searchableFields, this.queryOperator);
    };
    return SearchInput;
}(Widget_1["default"]));
/**
 * Returns an object of an
 * html node attributes.
 *
 * @param htmlNode
 * @returns {{}}
 */
var getNodeAttributes = function (htmlNode) {
    var _a;
    var nodeAttributes = {};
    for (var i = 0; i < htmlNode.attributes.length; i++) {
        var attr = htmlNode.attributes[i];
        if (attr.specified) {
            nodeAttributes = __assign(__assign({}, nodeAttributes), (_a = {}, _a[attr.name] = attr.value, _a));
        }
    }
    return nodeAttributes;
};
/**
 * Checks if an html node
 * is an input.
 *
 * @param targetNode
 * @returns {boolean}
 */
var isInputElement = function (targetNode) {
    return targetNode instanceof HTMLInputElement;
};
/**
 * Search Input widget
 *
 * @param settings
 */
exports["default"] = (function (settings) { return new SearchInput(settings); });
