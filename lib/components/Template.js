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
var Mustache = require("mustache");
var Translate_1 = require("./Translate");
/**
 * Template
 */
var Template = /** @class */ (function (_super) {
    __extends(Template, _super);
    function Template() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Render template
         *
         * @param template
         * @param result
         * @param dictionary
         *
         * @return {any}
         */
        _this.renderTemplate = function (template, result, dictionary) {
            var trans = function () {
                return function (text, render) {
                    return render(Translate_1["default"].trans(text, dictionary));
                };
            };
            var output = Mustache.render(template, __assign(__assign({}, result), {
                "trans": trans
            }));
            return {
                __html: output
            };
        };
        return _this;
    }
    /**
     * Render
     *
     * @return {any}
     */
    Template.prototype.render = function () {
        var _a, _b;
        var props = this.props;
        var template = props.template;
        var data = props.data;
        var className = props.className;
        var id = (_a = props.id) !== null && _a !== void 0 ? _a : "";
        var dictionary = (_b = props.dictionary) !== null && _b !== void 0 ? _b : {};
        return (template)
            ? preact_1.h("div", { id: id, className: className, dangerouslySetInnerHTML: this.renderTemplate(template, data, dictionary) })
            : null;
    };
    return Template;
}(preact_1.Component));
exports["default"] = Template;
