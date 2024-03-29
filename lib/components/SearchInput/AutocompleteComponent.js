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
            autocomplete: ""
        };
        return _this;
    }
    /**
     * Component will receive props
     *
     * @param props
     */
    AutocompleteComponent.prototype.componentWillReceiveProps = function (props) {
        if (props.autocomplete !== null) {
            this.setState(function (prevState) {
                return {
                    autocomplete: props.autocomplete
                };
            });
        }
        else {
            this.setState(function (prevState) {
                return {
                    autocomplete: ""
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
        var autocomplete = this.state.autocomplete;
        var queryText = this.props.queryText;
        var inputClassName = this.props.inputClassName;
        var queryTextLength = queryText.length;
        var autocompleteText = autocomplete.substring(queryTextLength);
        var formattedAutocompleteText = autocompleteText === ""
            ? ""
            : queryText + autocompleteText + " ⤷";
        return ((0, preact_1.h)("input", { type: "text", className: "as-searchInput__input as-searchInput__autocomplete ".concat(inputClassName), placeholder: formattedAutocompleteText, style: "position: absolute; top: 0px; left: 0px; background-color: white;" }));
    };
    return AutocompleteComponent;
}(preact_1.Component));
exports["default"] = AutocompleteComponent;
