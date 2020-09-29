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
 * Result Information Component
 */
var InformationComponent = /** @class */ (function (_super) {
    __extends(InformationComponent, _super);
    /**
     * Constructor
     */
    function InformationComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            hits: 0,
            total: 0
        };
        return _this;
    }
    /**
     * Component will receive props
     *
     * @param props
     */
    InformationComponent.prototype.componentWillReceiveProps = function (props) {
        this.setState(function (prevState) {
            return {
                hits: props.currentResult.getTotalHits(),
                total: props.currentResult.getTotalItems()
            };
        });
    };
    InformationComponent.prototype.render = function () {
        var props = this.props;
        var containerClassName = props.classNames.container;
        var containerTemplate = props.template.container;
        var formatData = props.formatData;
        var currentResult = props.currentResult;
        if (props.currentResult == null) {
            return;
        }
        /**
         * Data accessible to the template
         */
        var reducedTemplateData = {
            total_hits: this.state.hits.toLocaleString(),
            total_items: this.state.total.toLocaleString()
        };
        var formattedTemplateData = formatData(reducedTemplateData);
        return (preact_1.h(Template_1["default"], { template: containerTemplate, data: formattedTemplateData, className: "as-information " + containerClassName }));
    };
    return InformationComponent;
}(preact_1.Component));
InformationComponent.defaultProps = {
    classNames: {
        container: ''
    },
    template: {
        container: 'Found {{total_hits}}/{{total_items}}'
    },
    formatData: function (data) { return data; }
};
exports["default"] = InformationComponent;
