"use strict";
exports.__esModule = true;
exports.bootstrap = void 0;
var flux_1 = require("flux");
var apisearch_1 = require("apisearch");
var ApisearchUI_1 = require("./ApisearchUI");
var Container_1 = require("./Container");
var Store_1 = require("./Store");
var Constants_1 = require("./Constants");
/**
 * Bootstrap application
 *
 * @param environmentId
 * @param config
 */
function bootstrap(environmentId, config) {
    var configAsString = JSON.stringify(config);
    var repositoryId = Constants_1.APISEARCH_REPOSITORY + "__" + configAsString;
    var storeId = Constants_1.APISEARCH_STORE + "__" + environmentId;
    var dispatcherId = Constants_1.APISEARCH_DISPATCHER + "__" + environmentId;
    var configId = Constants_1.APISEARCH_CONFIG + "__" + environmentId;
    var asuiId = Constants_1.APISEARCH_UI + "__" + environmentId;
    /**
     * Register Apisearch repository
     */
    Container_1["default"].register(repositoryId, function () {
        return apisearch_1["default"].createRepository(config);
    });
    /**
     * Register apisearch store
     */
    Container_1["default"].register(storeId, function () {
        return new Store_1["default"](config.coordinate, config.options.min_score);
    });
    /**
     * Register an event dispatcher
     */
    Container_1["default"].register(dispatcherId, function () {
        return new flux_1.Dispatcher();
    });
    /**
     * Register Apisearch config
     */
    Container_1["default"].register(configId, function () {
        return config;
    });
    /**
     * Apisearch UI Instance
     */
    Container_1["default"].register(asuiId, function () {
        return new ApisearchUI_1["default"](environmentId, Container_1["default"].get(repositoryId), Container_1["default"].get(storeId));
    });
}
exports.bootstrap = bootstrap;
