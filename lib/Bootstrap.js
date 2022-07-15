"use strict";
exports.__esModule = true;
exports.bootstrap = void 0;
var Dispatcher_1 = require("./Dispatcher");
var apisearch_1 = require("apisearch");
var ApisearchUI_1 = require("./ApisearchUI");
var Container_1 = require("./Container");
var Store_1 = require("./Store");
var Constants_1 = require("./Constants");
/**
 * @param environmentId
 * @param config
 * @param hash
 */
function bootstrap(environmentId, config, hash) {
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
        var _a, _b, _c, _d, _e;
        return new Store_1["default"](config.coordinate, config.options.min_score, hash, (_a = config.user_id) !== null && _a !== void 0 ? _a : "", (_b = config.options.site) !== null && _b !== void 0 ? _b : "", (_c = config.options.device) !== null && _c !== void 0 ? _c : "", (_d = config.options.generate_random_session_uuid) !== null && _d !== void 0 ? _d : false, (_e = config.options.initial_state) !== null && _e !== void 0 ? _e : {});
    });
    /**
     * Register an event dispatcher
     */
    Container_1["default"].register(dispatcherId, function () {
        return new Dispatcher_1.Dispatcher();
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
