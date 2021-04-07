"use strict";
exports.__esModule = true;
var ApisearchUI_1 = require("./ApisearchUI");
/**
 * ApisearchUIFactory class
 */
var ApisearchUIFactory = /** @class */ (function () {
    function ApisearchUIFactory() {
    }
    /**
     * Create instance
     *
     * @param config
     *
     * @return {ApisearchUIFactory}
     */
    ApisearchUIFactory.fromConfig = function (config) {
        var instance = new ApisearchUIFactory();
        instance.config = config;
        return instance;
    };
    /**
     * @param history
     *
     * @return {ApisearchUI}
     */
    ApisearchUIFactory.prototype.createUI = function (history) {
        if (history === void 0) { history = false; }
        return ApisearchUI_1["default"].create(this.config, history);
    };
    return ApisearchUIFactory;
}());
exports["default"] = ApisearchUIFactory;
