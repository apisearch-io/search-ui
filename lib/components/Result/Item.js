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
var Template_1 = require("../Template");
/**
 * Item
 */
var Item = /** @class */ (function (_super) {
    __extends(Item, _super);
    function Item() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Render
     *
     * @return {any}
     */
    Item.prototype.render = function () {
        var _a;
        var props = this.props;
        var template = props.template;
        var data = props.data;
        var dictionary = (_a = props.dictionary) !== null && _a !== void 0 ? _a : {};
        return preact_1.h(Template_1["default"], { template: template, data: data, className: "as-result__itemsList " + props.className, dictionary: dictionary });
    };
    return Item;
}(preact_1.Component));
exports["default"] = Item;
