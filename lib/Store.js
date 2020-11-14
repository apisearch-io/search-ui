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
     */
    function Store(coordinate, minScore) {
        var _this = _super.call(this) || this;
        /**
         * Store initial state
         */
        _this.dirty = true;
        /**
         * Current query instance
         */
        _this.currentQuery = (coordinate &&
            coordinate.lat != undefined &&
            coordinate.lon != undefined)
            ? apisearch_1["default"].createQueryLocated(new apisearch_2.Coordinate(coordinate.lat, coordinate.lon), '', apisearch_2.QUERY_DEFAULT_PAGE, apisearch_2.QUERY_DEFAULT_SIZE)
            : apisearch_1["default"].createQueryMatchAll();
        if (minScore) {
            _this.currentQuery.setMinScore(minScore);
        }
        /**
         * Data received
         */
        _this.currentResult = apisearch_1["default"].createEmptyResult();
        _this.currentVisibleResults = false;
        _this.sessionUID = _this.createUID(16);
        _this.currentQuery.setMetadataValue('session_uid', _this.sessionUID);
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
     * Results are visible
     *
     * @return {boolean}
     */
    Store.prototype.resultsAreVisible = function () {
        return this.currentVisibleResults;
    };
    /**
     * Handle Dispatched actions
     *
     * This is what we call a reducer
     * on a Redux architecture
     */
    Store.prototype.handleActions = function (action) {
        /**
         * When action only sets up store definitions
         * Does not dispatch any event
         */
        if (action.type === "UPDATE_APISEARCH_SETUP") {
            this.currentQuery = action.payload.query;
            return;
        }
        /**
         * Is triggered when a initial data is received
         * Dispatches an 'render' event
         */
        if (action.type === "RENDER_INITIAL_DATA") {
            var _a = action.payload, result = _a.result, query = _a.query, visibleResults = _a.visibleResults;
            this.currentResult = result;
            this.currentQuery = query;
            this.currentVisibleResults = query != undefined;
            this.emit("render");
            return;
        }
        /**
         * When action triggers a re-rendering
         * Dispatches a 'render' event
         */
        if (action.type === "RENDER_FETCHED_DATA") {
            var _b = action.payload, result = _b.result, query = _b.query, visibleResults = _b.visibleResults;
            this.dirty = false;
            this.currentResult = result;
            this.currentQuery = query;
            if (visibleResults != undefined) {
                this.currentVisibleResults = visibleResults;
            }
            this.emit("render");
            return;
        }
    };
    /**
     * Create an uid
     */
    Store.prototype.createUID = function (length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    };
    return Store;
}(events_1.EventEmitter));
exports["default"] = Store;
