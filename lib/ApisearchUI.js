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
var apisearch_2 = require("apisearch");
var IndexUUID_1 = require("apisearch/lib/Model/IndexUUID");
var ApisearchHelper_1 = require("./ApisearchHelper");
var ApisearchUIFactory_1 = require("./ApisearchUIFactory");
var Bootstrap_1 = require("./Bootstrap");
var Constants_1 = require("./Constants");
var Container_1 = require("./Container");
var Environment_1 = require("./Environment");
var Widgets_1 = require("./widgets/Widgets");
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
        this.dictionary = {};
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
        this.activeWidgets.map(function (widget) { return widget.withConfig(_this.config); });
        /**
         * 1.- Register all events on the store
         */
        this.store.on("render", function () { return _this.render(); });
        this.store.on("toUrlObject", function (query, object) { return _this.toUrlObject(query, object); });
        this.store.on("fromUrlObject", function (object, query) { return _this.fromUrlObject(object, query); });
        /**
         * 2.- Trigger the initial render: (Mount the components)
         *     To let components setup its configuration on componentWillMount()
         */
        this.render();
        /**
         * 3.- Dispatch the initial data request
         *     With all widget previous initial configurations
         */
        this.firstQuery = firstQuery;
        this.fetchQuery(true);
        window.dispatchEvent(new Event("apisearch_loaded", {
            bubbles: true
        }));
    };
    /**
     *
     */
    ApisearchUI.prototype.reset = function () {
        var initialQuery = this.store.getCurrentQuery().toArray();
        this.activeWidgets.map(function (widget) {
            widget.reset(initialQuery);
        });
        this.store.setCurrentQuery(apisearch_1.Query.createFromArray(initialQuery));
        this.store.setEmptyResult();
        var rendered = this.fetchQuery(false);
        if (!rendered) {
            this.render();
        }
    };
    /**
     * @param loadQuery
     *
     * @return boolean
     */
    ApisearchUI.prototype.fetchQuery = function (loadQuery) {
        /**
         * 3.- Dispatch the initial data request
         *     With all widget previous initial configurations
         */
        if (typeof this.firstQuery === "undefined" ||
            true === this.firstQuery) {
            this.store.fetchInitialQuery(this.environmentId, this.repository, loadQuery);
            return true;
        }
        return false;
    };
    /**
     * @param dictionary
     */
    ApisearchUI.prototype.setDictionary = function (dictionary) {
        this.dictionary = dictionary;
    };
    /**
     * Add new widget
     *
     * @param widget
     *
     * @return {ApisearchUI}
     */
    ApisearchUI.prototype.addWidget = function (widget) {
        widget.withConfig(this.config);
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
            widget.render(_this.environmentId, _this.store, _this.repository, _this.dictionary);
        });
        window.dispatchEvent(new Event("apisearch_rendered", {
            bubbles: true
        }));
    };
    /**
     *
     */
    ApisearchUI.prototype.normalizeQuery = function () {
        var _this = this;
        this.activeWidgets.map(function (widget) {
            widget.normalizeQuery(_this.environmentId, _this.store.getCurrentQuery());
        });
    };
    /**
     * @param query
     * @param object
     */
    ApisearchUI.prototype.toUrlObject = function (query, object) {
        this.activeWidgets.map(function (widget) {
            widget.toUrlObject(query, object);
        });
    };
    /**
     * @param object
     * @param query
     */
    ApisearchUI.prototype.fromUrlObject = function (object, query) {
        this.activeWidgets.map(function (widget) {
            widget.fromUrlObject(object, query);
        });
    };
    /**
     * @param config
     * @param hash
     *
     * @return {ApisearchUI}
     */
    ApisearchUI.create = function (config, hash) {
        var _a;
        apisearch_2["default"].ensureRepositoryConfigIsValid(config);
        /**
         * Build environment Id
         */
        var environmentId = Environment_1.createEnvironmentId();
        /**
         * Bootstrapping ApisearchUI application
         */
        Bootstrap_1.bootstrap(environmentId, config, hash);
        /**
         * Register handleActions method (store reducer)
         * into the event dispatcher
         */
        var apisearchUI = Container_1["default"].get(Constants_1.APISEARCH_UI + "__" + environmentId);
        var dispatcher = Container_1["default"].get(Constants_1.APISEARCH_DISPATCHER + "__" + environmentId);
        dispatcher.registerListener("RENDER_INITIAL_DATA", function (payload) { return apisearchUI.store.renderInitialData(payload); });
        dispatcher.registerListener("RENDER_FETCHED_DATA", function (payload) { return apisearchUI.store.renderFetchedData(payload); });
        dispatcher.registerListener("UPDATE_APISEARCH_SETUP", function (payload) { return apisearchUI.store.updateApisearchSetup(payload); });
        dispatcher.registerListener("NORMALIZE_QUERY", function (payload) { return apisearchUI.normalizeQuery(); });
        /**
         * Add widgets
         */
        apisearchUI.widgets = Widgets_1["default"];
        apisearchUI.config = config;
        var uiId = "ui_" + Math.ceil(Math.random() * (9999999 - 1) + 1);
        apisearchUI.reference = uiId;
        apisearchUI.userId = (_a = config.user_id) !== null && _a !== void 0 ? _a : "";
        window[uiId] = apisearchUI;
        window["apisearch_ui"] = apisearchUI;
        /**
         * Return ApisearchUI instance
         */
        return apisearchUI;
    };
    /**
     * Create instance
     *
     * @param config
     *
     * @return {ApisearchUIFactory}
     */
    ApisearchUI.factory = function (config) {
        return ApisearchUIFactory_1["default"].fromConfig(config);
    };
    /**
     * @param appId
     * @param indexId
     * @param itemId
     *
     * @return {any}
     */
    ApisearchUI.prototype.click = function (appId, indexId, itemId) {
        this
            .repository
            .pushInteraction(IndexUUID_1.IndexUUID.createById(indexId), apisearch_1.ItemUUID.createByComposedUUID(itemId), this.userId, this.store.getCurrentQuery().getQueryText(), "cli", this.store.getSite(), this.store.getDevice());
        window.postMessage({
            name: "apisearch_item_was_clicked",
            app_id: appId,
            index_id: indexId,
            item_id: itemId,
            site: this.store.getSite(),
            device: this.store.getDevice()
        }, "*");
        window.postMessage({
            name: "apisearch_item_was_interacted",
            interaction: 'cli',
            app_id: appId,
            index_id: indexId,
            item_id: itemId,
            site: this.store.getSite(),
            device: this.store.getDevice()
        }, "*");
    };
    /**
     * @param interaction
     * @param appId
     * @param indexId
     * @param itemId
     *
     * @return {any}
     */
    ApisearchUI.prototype.interact = function (interaction, appId, indexId, itemId) {
        this
            .repository
            .pushInteraction(IndexUUID_1.IndexUUID.createById(indexId), apisearch_1.ItemUUID.createByComposedUUID(itemId), this.userId, this.store.getCurrentQuery().getQueryText(), interaction, this.store.getSite(), this.store.getDevice());
        window.postMessage({
            name: "apisearch_item_was_interacted",
            interaction: interaction,
            app_id: appId,
            index_id: indexId,
            item_id: itemId,
            site: this.store.getSite(),
            device: this.store.getDevice()
        }, "*");
    };
    /**
     * @param appId
     * @param indexId
     *
     * @return {any}
     */
    ApisearchUI.prototype.purchase = function (appId, indexId) {
        this
            .repository
            .purchase(IndexUUID_1.IndexUUID.createById(indexId), this.userId, [], this.store.getSite(), this.store.getDevice());
        window.postMessage({
            name: "apisearch_purchase_was_done",
            app_id: appId,
            index_id: indexId,
            site: this.store.getSite(),
            device: this.store.getDevice()
        }, "*");
    };
    /**
     *
     */
    ApisearchUI.prototype.getQuery = function () {
        return this.store.getCurrentQuery().toArray();
    };
    /**
     * @param text
     */
    ApisearchUI.prototype.write = function (text) {
        var query = this.getQuery();
        query.q = text;
        this.pushQuery(query);
    };
    /**
     * @param query
     */
    ApisearchUI.prototype.pushQuery = function (query) {
        var _this = this;
        var queryObject = apisearch_1.Query.createFromArray(query);
        this.store.setCurrentQuery(queryObject);
        this.repository
            .query(queryObject)
            .then(function (result) {
            _this.store.setCurrentResult(result);
            _this.render();
        })["catch"](function (error) {
            console.log("Apisearch UI error - " + error);
            // Do nothing
        });
    };
    return ApisearchUI;
}());
exports["default"] = ApisearchUI;
