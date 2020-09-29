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
var Hogan = require("hogan.js");
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
         *
         * @return {any}
         */
        _this.renderTemplate = function (template, result) {
            /**
             * Compile template using hogan.js
             */
            var compiledTemplate = Hogan.compile(template);
            var output = compiledTemplate.render(result);
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
        var props = this.props;
        var template = props.template;
        var data = props.data;
        var className = props.className;
        return (template)
            ? preact_1.h("div", { className: className, dangerouslySetInnerHTML: this.renderTemplate(template, data) })
            : null;
    };
    return Template;
}(preact_1.Component));
exports["default"] = Template;
