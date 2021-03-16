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
var ClearFiltersActions_1 = require("./ClearFiltersActions");
/**
 * Result Information Component
 */
var ClearFiltersComponent = /** @class */ (function (_super) {
    __extends(ClearFiltersComponent, _super);
    /**
     * Constructor
     */
    function ClearFiltersComponent() {
        var _this = _super.call(this) || this;
        /**
         * Handle click
         */
        _this.handleClick = function () {
            var props = _this.props;
            var environmentId = props.environmentId;
            var currentQuery = props.store.getCurrentQuery();
            var repository = props.repository;
            _this.setState(function (prevState) {
                return { showClearFilters: false };
            });
            /**
             * Dispatch a clear filter action
             */
            ClearFiltersActions_1.clearFiltersAction(environmentId, currentQuery, repository);
        };
        _this.state = { showClearFilters: false };
        return _this;
    }
    /**
     * Component receive props
     *
     * @param props
     */
    ClearFiltersComponent.prototype.componentWillReceiveProps = function (props) {
        var filters = props.store.getCurrentQuery().getFilters();
        var areFiltersActive = (Object.keys(filters).length > 1);
        this.setState(function (prevState) {
            return { showClearFilters: areFiltersActive };
        });
    };
    /**
     * Render
     *
     * @return {}
     */
    ClearFiltersComponent.prototype.render = function () {
        var props = this.props;
        var containerClassName = props.classNames.container;
        var containerTemplate = props.template.container;
        return (this.state.showClearFilters)
            ? (preact_1.h("div", { className: "as-clearFilters " + containerClassName, onClick: this.handleClick },
                preact_1.h(Template_1["default"], { template: containerTemplate, dictionary: this.props.dictionary }))) : null;
    };
    return ClearFiltersComponent;
}(preact_1.Component));
ClearFiltersComponent.defaultProps = {
    classNames: {
        container: ''
    },
    template: {
        container: 'Clear filters'
    }
};
exports["default"] = ClearFiltersComponent;
