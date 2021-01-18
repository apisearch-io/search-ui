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
 * SnapshotComponent
 */
var SnapshotComponent = /** @class */ (function (_super) {
    __extends(SnapshotComponent, _super);
    function SnapshotComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Component receive props
     *
     * @param props
     */
    SnapshotComponent.prototype.componentWillReceiveProps = function (props) {
        var query = props.currentQuery;
        this.setState(function (prevState) {
            return { query: query };
        });
    };
    /**
     * Render
     *
     * @return {}
     */
    SnapshotComponent.prototype.render = function () {
        var queryAsJson = this.state.query == undefined
            ? ''
            : JSON.stringify(this.state.query.toArray());
        return (preact_1.h("div", null, queryAsJson));
    };
    return SnapshotComponent;
}(preact_1.Component));
exports["default"] = SnapshotComponent;
