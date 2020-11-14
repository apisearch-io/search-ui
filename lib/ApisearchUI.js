"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var apisearch_1 = require("apisearch");
var ApisearchActions_1 = require("./ApisearchActions");
var Bootstrap_1 = require("./Bootstrap");
var Constants_1 = require("./Constants");
var Container_1 = require("./Container");
var Environment_1 = require("./Environment");
var Widgets_1 = require("./widgets/Widgets");
var ApisearchHelper_1 = require("./ApisearchHelper");
/**
 * ApisearchUI class
 */
var ApisearchUI = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param environmentId
     * @param repository
     * @param store
     */
    function ApisearchUI(environmentId, repository, store) {
        /**
         * Environment Id
         */
        this.environmentId = environmentId;
        this.repository = repository;
        this.activeWidgets = [];
        this.widgets = Widgets_1["default"];
        this.helper = new ApisearchHelper_1["default"]();
        /**
         * Store related properties
         */
        this.store = store;
    }
    /**
     * Initialize components
     *
     * @param firstQuery
     */
    ApisearchUI.prototype.init = function (_a) {
        var _this = this;
        var _b = (_a === void 0 ? {} : _a).firstQuery, firstQuery = _b === void 0 ? true : _b;
        /**
         * 1.- Register all events on the store
         */
        this.store.on("render", function () { return _this.render(); });
        /**
         * 2.- Trigger the initial render: (Mount the components)
         *     To let components setup its configuration on componentWillMount()
         */
        this.render();
        /**
         * 3.- Dispatch the initial data request
         *     With all widget previous initial configurations
         */
        if (typeof firstQuery === "undefined" ||
            true === firstQuery) {
            ApisearchActions_1.initialDataFetchAction(this.environmentId, this.store.getCurrentQuery(), this.repository);
        }
    };
    /**
     * Add new widget
     *
     * @param widget
     *
     * @return {ApisearchUI}
     */
    ApisearchUI.prototype.addWidget = function (widget) {
        this.activeWidgets = __spreadArrays(this.activeWidgets, [widget]);
        return this;
    };
    /**
     * Add components in bulk mode
     *
     * @param widgets
     *
     * @return {ApisearchUI}
     */
    ApisearchUI.prototype.addWidgets = function () {
        var _this = this;
        var widgets = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            widgets[_i] = arguments[_i];
        }
        widgets.map(function (widget) { return _this.addWidget(widget); });
        return this;
    };
    /**
     * Render.
     *
     * Loop all active components
     * Hydrate them with new props
     * And render them.
     */
    ApisearchUI.prototype.render = function () {
        var _this = this;
        this.activeWidgets.map(function (widget) {
            widget.render(_this.environmentId, _this.store, _this.repository);
        });
    };
    /**
     * Attach a function into an event
     *
     * @param eventName
     * @param action
     */
    ApisearchUI.prototype.attach = function (eventName, action) {
        this
            .store
            .on(eventName, action);
    };
    /**
     * Create instance
     *
     * @param config
     *
     * @return {any}
     */
    ApisearchUI.create = function (config) {
        apisearch_1["default"].ensureRepositoryConfigIsValid(config);
        /**
         * Build environment Id
         */
        var environmentId = Environment_1.createEnvironmentId();
        /**
         * Bootstrapping ApisearchUI application
         */
        Bootstrap_1.bootstrap(environmentId, config);
        /**
         * Register handleActions method (store reducer)
         * into the event dispatcher
         */
        var apisearchUI = Container_1["default"].get(Constants_1.APISEARCH_UI + "__" + environmentId);
        var dispatcher = Container_1["default"].get(Constants_1.APISEARCH_DISPATCHER + "__" + environmentId);
        dispatcher.register(apisearchUI.store.handleActions.bind(apisearchUI.store));
        /**
         * Add widgets
         */
        apisearchUI.widgets = Widgets_1["default"];
        var uiId = "ui_" + Math.ceil(Math.random() * (9999999 - 1) + 1);
        apisearchUI.reference = uiId;
        window[uiId] = apisearchUI;
        /**
         * Return ApisearchUI instance
         */
        return apisearchUI;
    };
    /**
     * Click
     *
     * @param app_id
     * @param index_id
     * @param item_id
     * @param user_id
     *
     * @return {any}
     */
    ApisearchUI.prototype.click = function (app_id, index_id, item_id, user_id) {
        this
            .repository
            .click(app_id, index_id, item_id, user_id);
    };
    return ApisearchUI;
}());
exports["default"] = ApisearchUI;
