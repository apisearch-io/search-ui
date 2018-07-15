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
     * @param classNames
     * @param template
     */
    function SearchInput(_a) {
        var target = _a.target, placeholder = _a.placeholder, startSearchOn = _a.startSearchOn, clearSearch = _a.clearSearch, withContainer = _a.withContainer, autofocus = _a.autofocus, classNames = _a.classNames, template = _a.template;
        var _this = _super.call(this) || this;
        _this.target = target;
        _this.isFirstRender = true;
        _this.component = preact_1.h(SearchInputComponent_1["default"], { target: target, placeholder: placeholder, autofocus: autofocus, startSearchOn: startSearchOn, clearSearch: clearSearch, withContainer: withContainer, classNames: __assign({}, SearchInputComponent_1["default"].defaultProps.classNames, classNames), template: __assign({}, SearchInputComponent_1["default"].defaultProps.template, template) });
        return _this;
    }
    /**
     * Widget
     *
     * @param environmentId
     * @param store
     * @param repository
     */
    SearchInput.prototype.render = function (environmentId, store, repository) {
        this.component.attributes = __assign({}, this.component.attributes, { environmentId: environmentId, repository: repository, dirty: store.isDirty(), currentResult: store.getCurrentResult(), currentQuery: store.getCurrentQuery(), htmlNodeInheritProps: {
                autocomplete: 'off',
                spellcheck: 0
            } });
        var targetNode = document.querySelector(this.target);
        /**
         * Checking if the targeted element is an input
         * or is another container element.
         */
        var isInput = isInputElement(targetNode);
        if (!isInput) {
            preact_1.render(this.component, targetNode, targetNode.lastChild);
        }
        if (isInput && this.isFirstRender) {
            this.component.attributes = __assign({}, this.component.attributes, { withContainer: false, htmlNodeInheritProps: __assign({}, this.component.attributes.htmlNodeInheritedProps, getNodeAttributes(targetNode)) });
            var parentNode = targetNode.parentNode;
            preact_1.render(this.component, parentNode, parentNode.childNodes[0]);
            targetNode.remove();
        }
        this.isFirstRender = false;
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
            nodeAttributes = __assign({}, nodeAttributes, (_a = {}, _a[attr.name] = attr.value, _a));
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
