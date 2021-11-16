"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
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
var ReloadComponent_1 = require("../components/Reload/ReloadComponent");
var Widget_1 = require("./Widget");
/**
 * Reload
 */
var Reload = /** @class */ (function (_super) {
    __extends(Reload, _super);
    /**
     * Constructor
     *
     * @param target
     * @param classNames
     * @param template
     */
    function Reload(_a) {
        var target = _a.target, classNames = _a.classNames, template = _a.template;
        var _this = _super.call(this) || this;
        _this.target = target;
        _this.component = (0, preact_1.h)(ReloadComponent_1["default"], { target: target, classNames: __assign(__assign({}, ReloadComponent_1["default"].defaultProps.classNames), classNames), template: template });
        return _this;
    }
    /**
     * @param environmentId
     * @param store
     * @param repository
     * @param dictionary
     */
    Reload.prototype.render = function (environmentId, store, repository, dictionary) {
        this.component.props = __assign(__assign({}, this.component.props), { environmentId: environmentId, repository: repository, store: store, dictionary: dictionary });
        var targetNode = document.querySelector(this.target);
        (0, preact_1.render)(this.component, targetNode);
    };
    return Reload;
}(Widget_1["default"]));
/**
 * Reload filter
 *
 * @param settings
 */
exports["default"] = (function (settings) { return new Reload(settings); });
