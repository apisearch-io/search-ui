"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
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
        this.initialSetupPerformed = false;
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
        var _b = _a === void 0 ? {} : _a, _c = _b.firstQuery, firstQuery = _c === void 0 ? true : _c;
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
        this.activeWidgets = __spreadArray(__spreadArray([], this.activeWidgets, true), [widget], false);
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
            if (!_this.initialSetupPerformed) {
                widget.initialSetup(_this.environmentId, _this.store, _this.repository);
            }
            widget.render(_this.environmentId, _this.store, _this.repository, _this.dictionary);
        });
        this.initialSetupPerformed = true;
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
        var environmentId = (0, Environment_1.createEnvironmentId)();
        /**
         * Bootstrapping ApisearchUI application
         */
        (0, Bootstrap_1.bootstrap)(environmentId, config, hash);
        /**
         * Register handleActions method (store reducer)
         * into the event dispatcher
         */
        var apisearchUI = Container_1["default"].get("".concat(Constants_1.APISEARCH_UI, "__").concat(environmentId));
        var dispatcher = Container_1["default"].get("".concat(Constants_1.APISEARCH_DISPATCHER, "__").concat(environmentId));
        dispatcher.registerListener("RENDER_INITIAL_DATA", function (payload) { return apisearchUI.store.renderInitialData(payload); });
        dispatcher.registerListener("RENDER_FETCHED_DATA", function (payload) { return apisearchUI.store.renderFetchedData(payload); });
        dispatcher.registerListener("UPDATE_APISEARCH_SETUP", function (payload) { return apisearchUI.store.updateApisearchSetup(payload); });
        dispatcher.registerListener("NORMALIZE_QUERY", function (payload) { return apisearchUI.normalizeQuery(); });
        /**
         * Add widgets
         */
        apisearchUI.widgets = Widgets_1["default"];
        apisearchUI.config = config;
        var uiId = "ui_".concat(Math.ceil(Math.random() * (9999999 - 1) + 1));
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
        var queryAsArray = this.store.getCurrentQuery().toArray();
        var resultAsArray = this.store.getCurrentResult().toArray();
        window.postMessage({
            name: "apisearch_item_was_clicked",
            app_id: appId,
            index_id: indexId,
            item_id: itemId,
            site: this.store.getSite(),
            device: this.store.getDevice(),
            query: queryAsArray,
            result: resultAsArray
        }, "*");
        window.postMessage({
            name: "apisearch_item_was_interacted",
            interaction: "cli",
            app_id: appId,
            index_id: indexId,
            item_id: itemId,
            site: this.store.getSite(),
            device: this.store.getDevice(),
            query: queryAsArray,
            result: resultAsArray
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
            device: this.store.getDevice(),
            query: this.store.getCurrentQuery().toArray(),
            result: this.store.getCurrentResult().toArray()
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
        text = text.trim();
        var query = this.getQuery();
        if (query.q !== text) {
            query.q = text;
            this.pushQuery(query);
        }
    };
    /**
     * @param query
     */
    ApisearchUI.prototype.pushQuery = function (query) {
        var _this = this;
        var queryObject = apisearch_1.Query.createFromArray(query);
        this.repository
            .query(queryObject)
            .then(function (result) {
            window.postMessage({
                name: "apisearch_scroll_top"
            }, "*");
            _this.store.renderFetchedData({
                "query": queryObject,
                result: result
            });
        })["catch"](function (error) {
            // Do nothing
        });
    };
    return ApisearchUI;
}());
exports["default"] = ApisearchUI;
