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
exports.__esModule = true;
var preact_1 = require("preact");
/**
 * Autocomplete Component
 */
var AutocompleteComponent = /** @class */ (function (_super) {
    __extends(AutocompleteComponent, _super);
    /**
     * Constructor
     */
    function AutocompleteComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            suggestion: ''
        };
        return _this;
    }
    /**
     * Component will receive props
     *
     * @param props
     */
    AutocompleteComponent.prototype.componentWillReceiveProps = function (props) {
        if (props.suggestions.length > 0) {
            this.setState(function (prevState) {
                var _a;
                return {
                    suggestion: ((_a = (props.suggestions[0] + "")) !== null && _a !== void 0 ? _a : "")
                };
            });
        }
        else {
            this.setState(function (prevState) {
                return {
                    suggestion: ''
                };
            });
        }
    };
    /**
     * Render
     *
     * @return {any}
     */
    AutocompleteComponent.prototype.render = function () {
        var suggestion = this.state.suggestion;
        var queryText = this.props.queryText;
        var inputClassName = this.props.inputClassName;
        var queryTextLength = queryText.length;
        var formattedSuggestion = queryText + suggestion.substring(queryTextLength);
        return (preact_1.h("input", { type: 'text', className: "as-searchInput__input as-searchInput__autocomplete " + inputClassName, placeholder: formattedSuggestion, style: "position: absolute; top: 0px; left: 0px; background-color: white;" }));
    };
    return AutocompleteComponent;
}(preact_1.Component));
exports["default"] = AutocompleteComponent;
