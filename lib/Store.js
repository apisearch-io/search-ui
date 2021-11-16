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
exports.__esModule = true;
var apisearch_1 = require("apisearch");
var events_1 = require("events");
var Constants_1 = require("./Constants");
var Container_1 = require("./Container");
/**
 * Flux pattern store class
 */
var Store = /** @class */ (function (_super) {
    __extends(Store, _super);
    /**
     * @param coordinate
     * @param minScore
     * @param hash
     * @param userId
     * @param generateRandomSessionUUID
     */
    function Store(coordinate, minScore, hash, userId, generateRandomSessionUUID) {
        var _this = _super.call(this) || this;
        _this.withHash = false;
        _this.doNotCleanUrlHashAtFirst = false;
        _this.dirty = true;
        var initialQuery = Store.loadInitialQuery(coordinate, userId);
        _this.window = window.top;
        _this.isUnderIframe = (window !== window.top);
        if ((typeof hash === "string")) {
            _this.withHash = true;
            _this.urlHash = (hash === "") ? "{}" : hash;
            if (_this.urlHash.charAt(0) === "#") {
                _this.urlHash = _this.urlHash.substr(1);
            }
        }
        if (minScore) {
            initialQuery.setMinScore(minScore);
        }
        /**
         * Data received
         */
        _this.setEmptyResult();
        _this.currentVisibleResults = false;
        if (generateRandomSessionUUID) {
            initialQuery.setMetadataValue("session_uid", Store.createUID(16));
        }
        _this.setCurrentQuery(initialQuery);
        return _this;
    }
    /**
     * Is dirty
     *
     * @return {any}
     */
    Store.prototype.isDirty = function () {
        return this.dirty;
    };
    /**
     * Get current query
     *
     * @return {Query}
     */
    Store.prototype.getCurrentQuery = function () {
        return this.currentQuery;
    };
    /**
     * @param query
     */
    Store.prototype.setCurrentQuery = function (query) {
        this.currentQuery = query;
    };
    /**
     * Get current result
     *
     * @return {Result}
     */
    Store.prototype.getCurrentResult = function () {
        return this.currentResult;
    };
    /**
     *
     */
    Store.prototype.setEmptyResult = function () {
        this.currentResult = apisearch_1["default"].createEmptyResult();
    };
    /**
     * Get current result
     *
     * @return {boolean}
     */
    Store.prototype.hasProperResult = function () {
        return this.currentResult.getTotalItems() > 0;
    };
    /**
     * Results are visible
     *
     * @return {boolean}
     */
    Store.prototype.resultsAreVisible = function () {
        return this.currentVisibleResults;
    };
    /**
     * @param payload
     */
    Store.prototype.updateApisearchSetup = function (payload) {
        this.currentQuery = payload.query;
    };
    /**
     * @param payload
     */
    Store.prototype.renderInitialData = function (payload) {
        var result = payload.result, query = payload.query, _ = payload._;
        this.dirty = false;
        this.currentResult = result;
        this.currentQuery = query;
        this.currentVisibleResults = query !== undefined;
        this.emit("render");
        this.replaceUrl(query, result, this.currentVisibleResults);
    };
    /**
     * @param payload
     */
    Store.prototype.renderFetchedData = function (payload) {
        var result = payload.result, query = payload.query, visibleResults = payload.visibleResults;
        this.dirty = false;
        this.currentResult = result;
        this.currentQuery = query;
        if (visibleResults !== undefined) {
            this.currentVisibleResults = visibleResults;
        }
        this.emit("render");
        this.replaceUrl(query, result, visibleResults);
    };
    /**
     * Create an uid
     */
    Store.createUID = function (length) {
        var result = "";
        var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    };
    /**
     * @param environmentId
     * @param repository
     * @param loadQuery
     */
    Store.prototype.fetchInitialQuery = function (environmentId, repository, loadQuery) {
        var _this = this;
        var dispatcher = Container_1["default"].get(Constants_1.APISEARCH_DISPATCHER + "__" + environmentId);
        this.currentQuery = loadQuery
            ? this.loadQuery(this.currentQuery)
            : this.currentQuery;
        dispatcher.dispatch("NORMALIZE_QUERY", {
            query: this.currentQuery
        });
        /**
         * In initial query, we must delete user
         */
        var queryAsArray = this.currentQuery.toArray();
        queryAsArray.user = null;
        repository
            .query(apisearch_1.Query.createFromArray(queryAsArray))
            .then(function (result) {
            dispatcher.dispatch("RENDER_INITIAL_DATA", {
                query: _this.currentQuery,
                result: result
            });
        });
    };
    /**
     * @param coordinate
     * @param userId
     */
    Store.loadInitialQuery = function (coordinate, userId) {
        var withCoordinate = (coordinate &&
            coordinate.lat !== undefined &&
            coordinate.lon !== undefined);
        var q = {};
        if (withCoordinate) {
            q.coordinate = coordinate;
        }
        if (userId !== "") {
            q.user = { id: userId };
        }
        return apisearch_1.Query.createFromArray(q);
    };
    /**
     * @param query
     */
    Store.prototype.loadQuery = function (query) {
        if (!this.withHash) {
            return query;
        }
        var queryAsObject = query.toArray();
        try {
            var urlObject = (this.urlHash !== undefined &&
                this.urlHash !== null &&
                this.urlHash !== "" &&
                this.urlHash !== "/")
                ? JSON.parse(decodeURI(this.urlHash))
                : {};
            this.emit("fromUrlObject", urlObject, queryAsObject);
        }
        catch (e) {
            // Silent pass
            this.doNotCleanUrlHashAtFirst = true;
        }
        return apisearch_1.Query.createFromArray(queryAsObject);
    };
    /**
     *
     * @param query
     * @param result
     * @param visibleResults
     */
    Store.prototype.replaceUrl = function (query, result, visibleResults) {
        if (!this.withHash) {
            return;
        }
        var queryAsObject = query.toArray();
        var urlObject = {};
        this.emit("toUrlObject", queryAsObject, urlObject);
        var objectAsJson = decodeURI(JSON.stringify(urlObject));
        objectAsJson = (objectAsJson === "{}") ? "" : objectAsJson;
        objectAsJson = encodeURI(objectAsJson);
        if (!this.isUnderIframe) {
            var path = window.location.href;
            var pathWithoutHash = path.split("#", 2)[0];
            history.replaceState("", "", pathWithoutHash + "#" + objectAsJson);
            if (objectAsJson === "") {
                history.replaceState("", "", pathWithoutHash);
            }
        }
        else {
            if (!this.doNotCleanUrlHashAtFirst) {
                this.window.postMessage({
                    name: "apisearch_replace_hash",
                    hash: objectAsJson
                }, "*");
            }
            this.doNotCleanUrlHashAtFirst = false;
        }
    };
    return Store;
}(events_1.EventEmitter));
exports["default"] = Store;
