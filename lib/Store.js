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
var apisearch_2 = require("apisearch");
var events_1 = require("events");
var history_1 = require("history");
var LocationState_1 = require("./LocationState");
var Container_1 = require("./Container");
var Constants_1 = require("./Constants");
/**
 * Flux pattern store class
 */
var Store = /** @class */ (function (_super) {
    __extends(Store, _super);
    /**
     * Constructor
     *
     * @param coordinate
     * @param minScore
     * @param history
     */
    function Store(coordinate, minScore, history) {
        var _this = _super.call(this) || this;
        _this.historyPrefix = '';
        _this.fromBackHistoryState = false;
        _this.dirty = true;
        var initialQuery = Store.loadInitialQuery(coordinate);
        if (minScore) {
            initialQuery.setMinScore(minScore);
        }
        /**
         * Data received
         */
        _this.currentResult = apisearch_1["default"].createEmptyResult();
        _this.currentVisibleResults = false;
        initialQuery.setMetadataValue('session_uid', Store.createUID(16));
        _this.currentQuery = initialQuery;
        _this.history = (history === true) ? 'hash' : history;
        if (!history) {
            return _this;
        }
        if (_this.history === 'hash') {
            _this.historyInstance = history_1.createHashHistory();
        }
        else {
            _this.historyInstance = history_1.createBrowserHistory();
            _this.historyPrefix = '?' + _this.history + '=';
        }
        _this.historyInstance.listen(function (event) {
            if (event.action === 'POP' &&
                LocationState_1.isLocationState(event.location.state)) {
                _this.fromBackHistoryState = true;
                _this.renderFetchedData({
                    query: apisearch_2.Query.createFromArray(event.location.state.query),
                    result: apisearch_2.Result.createFromArray(event.location.state.result),
                    visibleResults: event.location.state.visibleResults
                });
            }
        });
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
     * Get current result
     *
     * @return {Result}
     */
    Store.prototype.getCurrentResult = function () {
        return this.currentResult;
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
        this.currentVisibleResults = query != undefined;
        this.pushQueryToHistory(query, result, this.currentVisibleResults);
        this.emit("render");
    };
    /**
     * @param payload
     */
    Store.prototype.renderFetchedData = function (payload) {
        var result = payload.result, query = payload.query, visibleResults = payload.visibleResults;
        this.dirty = false;
        this.currentResult = result;
        this.currentQuery = query;
        if (visibleResults != undefined) {
            this.currentVisibleResults = visibleResults;
        }
        if (!this.fromBackHistoryState) {
            this.pushQueryToHistory(query, result, visibleResults);
        }
        this.fromBackHistoryState = false;
        this.emit("render");
    };
    /**
     * Create an uid
     */
    Store.createUID = function (length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    };
    /**
     * @param environmentId
     * @param repository
     */
    Store.prototype.fetchInitialQuery = function (environmentId, repository) {
        var _this = this;
        var dispatcher = Container_1["default"].get(Constants_1.APISEARCH_DISPATCHER + "__" + environmentId);
        this.currentQuery = this.loadQuery(this.currentQuery);
        repository
            .query(this.currentQuery)
            .then(function (result) {
            dispatcher.dispatch("RENDER_INITIAL_DATA", {
                query: _this.currentQuery,
                result: result
            });
        });
    };
    /**
     * @param coordinate
     */
    Store.loadInitialQuery = function (coordinate) {
        var withCoordinate = (coordinate &&
            coordinate.lat != undefined &&
            coordinate.lon != undefined);
        var q = {};
        if (withCoordinate) {
            q.coordinate = coordinate;
        }
        return apisearch_2.Query.createFromArray(q);
    };
    /**
     * @param query
     */
    Store.prototype.loadQuery = function (query) {
        if (typeof this.history !== "string") {
            return query;
        }
        var queryAsObject = query.toArray();
        var urlObject = this.loadUrlObjectFromHash();
        this.emit("fromUrlObject", urlObject, queryAsObject);
        return apisearch_2.Query.createFromArray(queryAsObject);
    };
    /**
     * @private
     */
    Store.prototype.loadUrlObjectFromHash = function () {
        if (typeof this.history !== "string") {
            return {};
        }
        var urlHash = '';
        if (this.history === 'hash') {
            urlHash = window.location.hash.substr(1);
        }
        else {
            var urlParams = new URLSearchParams(window.location.search);
            urlHash = urlParams.get(this.history);
        }
        return (urlHash !== '' &&
            urlHash !== undefined &&
            urlHash !== null &&
            urlHash !== '' &&
            urlHash !== '/')
            ? JSON.parse(decodeURI(urlHash))
            : {};
    };
    /**
     *
     * @param query
     * @param result
     * @param visibleResults
     */
    Store.prototype.pushQueryToHistory = function (query, result, visibleResults) {
        if (this.historyInstance === undefined ||
            (typeof this.history !== "string")) {
            return;
        }
        var queryAsObject = query.toArray();
        var urlObject = {};
        this.emit("toUrlObject", queryAsObject, urlObject);
        var state = {
            query: query.toArray(),
            result: result ? result.toArray() : null,
            visibleResults: visibleResults
        };
        var objectAsJson = decodeURI(JSON.stringify(urlObject));
        var path = '';
        if (this.history === 'hash') {
            path = objectAsJson;
        }
        else {
            var pathPieces = history_1.parsePath(window.location.href);
            var urlParams = new URLSearchParams(pathPieces.search);
            urlParams.set(this.history, objectAsJson);
            pathPieces.search = '?' + urlParams.toString();
            path = history_1.createPath(pathPieces);
        }
        this.historyInstance.push(path, state);
    };
    return Store;
}(events_1.EventEmitter));
exports["default"] = Store;
