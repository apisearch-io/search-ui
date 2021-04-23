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
var ReloadActions_1 = require("./ReloadActions");
/**
 * ReloadComponent
 */
var ReloadComponent = /** @class */ (function (_super) {
    __extends(ReloadComponent, _super);
    function ReloadComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Handle click
         */
        _this.handleClick = function () {
            var props = _this.props;
            var environmentId = props.environmentId;
            var currentQuery = props.store.getCurrentQuery();
            var repository = props.repository;
            /**
             * Dispatch a clear filter action
             */
            ReloadActions_1.reloadAction(environmentId, currentQuery, repository);
        };
        return _this;
    }
    /**
     * Render
     *
     * @return {}
     */
    ReloadComponent.prototype.render = function () {
        var props = this.props;
        var containerClassName = props.classNames.container;
        var containerTemplate = props.template.container;
        return (preact_1.h("div", { className: "as-clearFilters " + containerClassName, onClick: this.handleClick },
            preact_1.h(Template_1["default"], { template: containerTemplate, dictionary: this.props.dictionary })));
    };
    return ReloadComponent;
}(preact_1.Component));
ReloadComponent.defaultProps = {
    classNames: {
        container: ""
    },
    template: {
        container: "Reload"
    }
};
exports["default"] = ReloadComponent;
