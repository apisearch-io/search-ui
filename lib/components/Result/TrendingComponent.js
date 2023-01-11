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
var apisearch_1 = require("apisearch");
var ResultComponent_1 = require("./ResultComponent");
/**
 * Trending Component
 */
var TrendingComponent = /** @class */ (function (_super) {
    __extends(TrendingComponent, _super);
    function TrendingComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Component will receive props
     *
     * @param props
     */
    TrendingComponent.prototype.componentWillReceiveProps = function (props) {
        if (props.store.getCurrentResult() == null) {
            this.setState(function (prevState) {
                return {
                    items: []
                };
            });
            return;
        }
        var currentResult = props.store.getCurrentResult();
        var items = currentResult.getMetadataValue("trending");
        if (items && items.length > 0) {
            items.map(function (item) { return apisearch_1.Item.createFromArray(item); });
        }
        else {
            items = currentResult.getItems().slice(0, 10);
        }
        this.setState(function (prevState) {
            return {
                items: items
            };
        });
    };
    return TrendingComponent;
}(ResultComponent_1["default"]));
exports["default"] = TrendingComponent;
