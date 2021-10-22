"use strict";
exports.__esModule = true;
/**
 * Widget
 */
var Widget = /** @class */ (function () {
    function Widget() {
    }
    Widget.prototype.withConfig = function (config) {
        if ("withConfig" in this.component) {
            this.component.withConfig(config);
        }
    };
    /**
     * @param query
     * @param object
     */
    Widget.prototype.toUrlObject = function (query, object) {
    };
    /**
     * @param object
     * @param query
     */
    Widget.prototype.fromUrlObject = function (object, query) {
    };
    /**
     * @param query
     */
    Widget.prototype.reset = function (query) {
    };
    /**
     * @param environmentId
     * @param query
     */
    Widget.prototype.normalizeQuery = function (environmentId, query) {
    };
    return Widget;
}());
exports["default"] = Widget;
