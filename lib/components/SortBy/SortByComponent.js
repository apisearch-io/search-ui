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
var SortByActions_1 = require("./SortByActions");
/**
 * SortBy Filter Component
 */
var SortByComponent = /** @class */ (function (_super) {
    __extends(SortByComponent, _super);
    function SortByComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Handle change
         *
         * @param e
         */
        _this.handleChange = function (e) {
            var props = _this.props;
            var environmentId = props.environmentId;
            var currentQuery = props.currentQuery;
            var repository = props.repository;
            var currentOption = e.target.value;
            _this.setState({
                value: currentOption
            });
            /**
             * Dispatch action
             */
            SortByActions_1.onChangeSearchAction(environmentId, currentQuery, repository, currentOption);
        };
        return _this;
    }
    /**
     * Components will mount
     */
    SortByComponent.prototype.componentWillMount = function () {
        var props = this.props;
        var environmentId = props.environmentId;
        var options = props.options;
        var currentQuery = props.currentQuery;
        var currentOption = options[0].value;
        this.setState({
            value: currentOption,
            visible: false
        });
        /**
         * Dispatch action
         */
        SortByActions_1.initialSortBySetup(environmentId, currentQuery, currentOption);
    };
    /**
     * Component will receive props
     *
     * @param props
     */
    SortByComponent.prototype.componentWillReceiveProps = function (props) {
        this.setState(function (prevState) {
            return {
                value: props.currentQuery.getSortBy().getFirstSortAsString(),
                visible: (props.currentResult != null)
                    ? (props.currentResult.getTotalHits() > 0)
                    : false
            };
        });
    };
    /**
     * Render
     *
     * @return {any}
     */
    SortByComponent.prototype.render = function (props, state) {
        var containerClassName = props.classNames.container;
        var selectClassName = props.classNames.select;
        if (!state.visible) {
            return;
        }
        var options = props.options;
        var coordinate = props.currentQuery.toArray().coordinate;
        if (!coordinate) {
            options = options.filter(function (o) {
                return o.value != 'distance';
            });
        }
        return (preact_1.h("div", { className: "as-sortBy " + containerClassName },
            preact_1.h("select", { className: "as-sortBy__selector " + selectClassName, onChange: this.handleChange, value: state.value }, options.map(function (option) { return (preact_1.h("option", { value: option.value }, option.name)); }))));
    };
    return SortByComponent;
}(preact_1.Component));
SortByComponent.defaultProps = {
    classNames: {
        container: '',
        select: ''
    }
};
exports["default"] = SortByComponent;
