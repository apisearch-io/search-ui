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
var Widget_1 = require("./Widget");
var SnapshotComponent_1 = require("../components/Snapshot/SnapshotComponent");
/**
 * Snapshot
 */
var Snapshot = /** @class */ (function (_super) {
    __extends(Snapshot, _super);
    /**
     * Constructor
     *
     * @param target
     * @param classNames
     * @param template
     */
    function Snapshot(_a) {
        var target = _a.target, classNames = _a.classNames, template = _a.template;
        var _this = _super.call(this) || this;
        _this.target = target;
        _this.component = preact_1.h(SnapshotComponent_1["default"], { target: target });
        return _this;
    }
    /**
     * @param environmentId
     * @param store
     * @param repository
     * @param dictionary
     */
    Snapshot.prototype.render = function (environmentId, store, repository, dictionary) {
        this.component.props = __assign(__assign({}, this.component.props), { environmentId: environmentId, repository: repository, store: store });
        var targetNode = document.querySelector(this.target);
        preact_1.render(this.component, targetNode);
    };
    return Snapshot;
}(Widget_1["default"]));
/**
 * @param settings
 */
exports["default"] = (function (settings) { return new Snapshot(settings); });
