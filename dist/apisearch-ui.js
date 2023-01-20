(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["apisearchUI"] = factory();
	else
		root["apisearchUI"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/apisearch/lib/Apisearch.js":
/*!*************************************************!*\
  !*** ./node_modules/apisearch/lib/Apisearch.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var AxiosClient_1 = __webpack_require__(/*! ./Http/AxiosClient */ "./node_modules/apisearch/lib/Http/AxiosClient.js");
var Query_1 = __webpack_require__(/*! ./Query/Query */ "./node_modules/apisearch/lib/Query/Query.js");
var Query_2 = __webpack_require__(/*! ./Query/Query */ "./node_modules/apisearch/lib/Query/Query.js");
var Query_3 = __webpack_require__(/*! ./Query/Query */ "./node_modules/apisearch/lib/Query/Query.js");
var SortBy_1 = __webpack_require__(/*! ./Query/SortBy */ "./node_modules/apisearch/lib/Query/SortBy.js");
var HttpRepository_1 = __webpack_require__(/*! ./Repository/HttpRepository */ "./node_modules/apisearch/lib/Repository/HttpRepository.js");
var Result_1 = __webpack_require__(/*! ./Result/Result */ "./node_modules/apisearch/lib/Result/Result.js");
var ResultAggregations_1 = __webpack_require__(/*! ./Result/ResultAggregations */ "./node_modules/apisearch/lib/Result/ResultAggregations.js");
var Transformer_1 = __webpack_require__(/*! ./Transformer/Transformer */ "./node_modules/apisearch/lib/Transformer/Transformer.js");
var CacheClient_1 = __webpack_require__(/*! ./Http/CacheClient */ "./node_modules/apisearch/lib/Http/CacheClient.js");
/**
 * Apisearch class
 */
var Apisearch = /** @class */ (function () {
    function Apisearch() {
    }
    /**
     * Constructor
     *
     * @param config
     *
     * @return {HttpRepository}
     */
    Apisearch.createRepository = function (config) {
        Apisearch.ensureRepositoryConfigIsValid(config);
        config.options = tslib_1.__assign({ api_version: "v1", override_queries: true, timeout: 3000 }, config.options);
        /**
         * Client
         */
        var httpClient = typeof config.options.http_client !== "undefined"
            ? config.options.http_client
            : new AxiosClient_1.AxiosClient(config.options.endpoint, config.options.api_version, config.options.timeout, config.options.override_queries);
        if (config.options.use_cache) {
            httpClient = new CacheClient_1.CacheClient(httpClient);
        }
        return new HttpRepository_1.HttpRepository(httpClient, config.app_id, config.index_id, config.token, new Transformer_1.Transformer());
    };
    /**
     * Ensure the Repository configuration is valid
     *
     * @param config
     */
    Apisearch.ensureRepositoryConfigIsValid = function (config) {
        Apisearch.ensureIsDefined(config.app_id, "app_id");
        Apisearch.ensureIsDefined(config.index_id, "index_id");
        Apisearch.ensureIsDefined(config.token, "token");
        Apisearch.ensureIsDefined(config.options.endpoint, "options.endpoint");
    };
    /**
     * Ensure the value is not undefined
     *
     * @param param
     * @param name
     */
    Apisearch.ensureIsDefined = function (param, name) {
        if (typeof param === "undefined") {
            throw new TypeError(name + " parameter must be defined.");
        }
    };
    /**
     * Created located
     *
     * @param coordinate
     * @param queryText
     * @param page
     * @param size
     *
     * @returns {Query}
     */
    Apisearch.createQueryLocated = function (coordinate, queryText, page, size) {
        if (page === void 0) { page = Query_1.QUERY_DEFAULT_PAGE; }
        if (size === void 0) { size = Query_2.QUERY_DEFAULT_SIZE; }
        return Query_3.Query.createLocated(coordinate, queryText, page, size);
    };
    /**
     * Create
     *
     * @param queryText
     * @param page
     * @param size
     *
     * @returns {Query}
     */
    Apisearch.createQuery = function (queryText, page, size) {
        if (page === void 0) { page = Query_1.QUERY_DEFAULT_PAGE; }
        if (size === void 0) { size = Query_2.QUERY_DEFAULT_SIZE; }
        return Query_3.Query.create(queryText, page, size);
    };
    /**
     * Create match all
     *
     * @return {Query}
     */
    Apisearch.createQueryMatchAll = function () {
        return Query_3.Query.createMatchAll();
    };
    /**
     * Create by UUID
     *
     * @param uuid
     *
     * @return {Query}
     */
    Apisearch.createQueryByUUID = function (uuid) {
        return Query_3.Query.createByUUID(uuid);
    };
    /**
     * Create by UUIDs
     *
     * @param uuids
     *
     * @return {Query}
     */
    Apisearch.createQueryByUUIDs = function () {
        var uuids = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            uuids[_i] = arguments[_i];
        }
        return Query_3.Query.createByUUIDs.apply(Query_3.Query, uuids);
    };
    /**
     * Create empty result
     *
     * @return {Result}
     */
    Apisearch.createEmptyResult = function () {
        return Result_1.Result.create("", 0, 0, new ResultAggregations_1.ResultAggregations(0), [], []);
    };
    /**
     * Create empty sortby
     *
     * @return {SortBy}
     */
    Apisearch.createEmptySortBy = function () {
        return SortBy_1.SortBy.create();
    };
    /**
     * Create empty sortby
     *
     * @return {SortBy}
     */
    Apisearch.createEmptyScoreStrategy = function () {
        return SortBy_1.SortBy.create();
    };
    return Apisearch;
}());
exports["default"] = Apisearch;


/***/ }),

/***/ "./node_modules/apisearch/lib/Config/Config.js":
/*!*****************************************************!*\
  !*** ./node_modules/apisearch/lib/Config/Config.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
exports.Config = exports.DEFAULT_REPLICAS = exports.DEFAULT_SHARDS = void 0;
var Synonym_1 = __webpack_require__(/*! ./Synonym */ "./node_modules/apisearch/lib/Config/Synonym.js");
exports.DEFAULT_SHARDS = 1;
exports.DEFAULT_REPLICAS = 0;
/**
 * Result class
 */
var Config = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param language
     * @param storeSearchableMetadata
     * @param shards
     * @param replicas
     */
    function Config(language, storeSearchableMetadata, shards, replicas) {
        if (language === void 0) { language = null; }
        if (storeSearchableMetadata === void 0) { storeSearchableMetadata = true; }
        if (shards === void 0) { shards = exports.DEFAULT_SHARDS; }
        if (replicas === void 0) { replicas = exports.DEFAULT_REPLICAS; }
        this.synonyms = [];
        this.language = language;
        this.storeSearchableMetadata = storeSearchableMetadata;
        this.shards = shards;
        this.replicas = replicas;
    }
    /**
     * Get language
     *
     * @return {string}
     */
    Config.prototype.getLanguage = function () {
        return this.language;
    };
    /**
     * Should searchable metadata be stored
     *
     * @return {boolean}
     */
    Config.prototype.shouldSearchableMetadataBeStored = function () {
        return this.storeSearchableMetadata;
    };
    /**
     * Add synonym
     *
     * @param synonym
     */
    Config.prototype.addSynonym = function (synonym) {
        this.synonyms.push(synonym);
    };
    /**
     * Get synonyms
     *
     * @return {Synonym[]}
     */
    Config.prototype.getSynonyms = function () {
        return this.synonyms;
    };
    /**
     * Get shards
     *
     * @return {number}
     */
    Config.prototype.getShards = function () {
        return this.shards;
    };
    /**
     * Get replicas
     *
     * @return {number}
     */
    Config.prototype.getReplicas = function () {
        return this.replicas;
    };
    /**
     * to array
     */
    Config.prototype.toArray = function () {
        return {
            language: this.language,
            store_searchable_metadata: this.storeSearchableMetadata,
            synonyms: this.synonyms.map(function (synonym) { return synonym.toArray(); }),
            shards: this.shards,
            replicas: this.replicas
        };
    };
    /**
     * Create from array
     */
    Config.createFromArray = function (array) {
        var config = new Config(array.language ? array.language : null, typeof array.store_searchable_metadata == "boolean"
            ? array.store_searchable_metadata
            : true);
        if (array.synonyms instanceof Array &&
            array.synonyms.length > 0) {
            config.synonyms = array.synonyms.map(function (synonym) { return Synonym_1.Synonym.createFromArray(synonym); });
        }
        config.shards = typeof array.shards == "number"
            ? array.shards
            : exports.DEFAULT_SHARDS;
        config.replicas = typeof array.replicas == "number"
            ? array.replicas
            : exports.DEFAULT_REPLICAS;
        return config;
    };
    return Config;
}());
exports.Config = Config;


/***/ }),

/***/ "./node_modules/apisearch/lib/Config/Synonym.js":
/*!******************************************************!*\
  !*** ./node_modules/apisearch/lib/Config/Synonym.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.__esModule = true;
exports.Synonym = void 0;
/**
 * Result class
 */
var Synonym = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param words
     */
    function Synonym(words) {
        this.words = words;
    }
    /**
     * get words
     *
     * @return {string[]}
     */
    Synonym.prototype.getWords = function () {
        return this.words;
    };
    /**
     * Create by words
     *
     * @param words
     *
     * @return {Synonym}
     */
    Synonym.createbyWords = function (words) {
        return new Synonym(words);
    };
    /**
     * To array
     *
     * @return {{words: string[]}}
     */
    Synonym.prototype.toArray = function () {
        return {
            words: this.words
        };
    };
    /**
     * create from array
     *
     * @param array
     *
     * @returns {Synonym}
     */
    Synonym.createFromArray = function (array) {
        return new Synonym(array.words instanceof Object
            ? array.words
            : []);
    };
    /**
     * Expand
     *
     * @returns {string}
     */
    Synonym.prototype.expand = function () {
        return this.words.join(",");
    };
    return Synonym;
}());
exports.Synonym = Synonym;


/***/ }),

/***/ "./node_modules/apisearch/lib/Error/ConnectionError.js":
/*!*************************************************************!*\
  !*** ./node_modules/apisearch/lib/Error/ConnectionError.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
exports.ConnectionError = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var ErrorWithMessage_1 = __webpack_require__(/*! ./ErrorWithMessage */ "./node_modules/apisearch/lib/Error/ErrorWithMessage.js");
/**
 * Connection error
 */
var ConnectionError = /** @class */ (function (_super) {
    tslib_1.__extends(ConnectionError, _super);
    function ConnectionError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Get transportable http error
     *
     * @return {number}
     */
    ConnectionError.getTransportableHTTPError = function () {
        return 500;
    };
    return ConnectionError;
}(ErrorWithMessage_1.ErrorWithMessage));
exports.ConnectionError = ConnectionError;


/***/ }),

/***/ "./node_modules/apisearch/lib/Error/ErrorWithMessage.js":
/*!**************************************************************!*\
  !*** ./node_modules/apisearch/lib/Error/ErrorWithMessage.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.__esModule = true;
exports.ErrorWithMessage = void 0;
/**
 * ConnectError
 */
var ErrorWithMessage = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param message
     */
    function ErrorWithMessage(message) {
        this.message = message;
    }
    return ErrorWithMessage;
}());
exports.ErrorWithMessage = ErrorWithMessage;


/***/ }),

/***/ "./node_modules/apisearch/lib/Error/EventError.js":
/*!********************************************************!*\
  !*** ./node_modules/apisearch/lib/Error/EventError.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
exports.EventError = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var ErrorWithMessage_1 = __webpack_require__(/*! ./ErrorWithMessage */ "./node_modules/apisearch/lib/Error/ErrorWithMessage.js");
/**
 * EventError
 */
var EventError = /** @class */ (function (_super) {
    tslib_1.__extends(EventError, _super);
    function EventError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Get transportable http error
     *
     * @return {number}
     */
    EventError.throwEndpointNotAvailable = function () {
        return new EventError("Endpoint not available");
    };
    return EventError;
}(ErrorWithMessage_1.ErrorWithMessage));
exports.EventError = EventError;


/***/ }),

/***/ "./node_modules/apisearch/lib/Error/ForbiddenError.js":
/*!************************************************************!*\
  !*** ./node_modules/apisearch/lib/Error/ForbiddenError.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
exports.ForbiddenError = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var ErrorWithMessage_1 = __webpack_require__(/*! ./ErrorWithMessage */ "./node_modules/apisearch/lib/Error/ErrorWithMessage.js");
/**
 * Forbidden Error
 */
var ForbiddenError = /** @class */ (function (_super) {
    tslib_1.__extends(ForbiddenError, _super);
    function ForbiddenError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Get transportable http error
     *
     * @return {number}
     */
    ForbiddenError.getTransportableHTTPError = function () {
        return 403;
    };
    /**
     * App id is required
     *
     * @return {ForbiddenError}
     */
    ForbiddenError.createAppIdIsRequiredException = function () {
        return new ForbiddenError("AppId query parameter MUST be defined with a valid value");
    };
    /**
     * Index id is required
     *
     * @return {ForbiddenError}
     */
    ForbiddenError.createIndexIsRequiredException = function () {
        return new ForbiddenError("Index query parameter MUST be defined with a valid value");
    };
    /**
     * Token is required
     *
     * @return {ForbiddenError}
     */
    ForbiddenError.createTokenIsRequiredException = function () {
        return new ForbiddenError("Token query parameter MUST be defined with a valid value");
    };
    return ForbiddenError;
}(ErrorWithMessage_1.ErrorWithMessage));
exports.ForbiddenError = ForbiddenError;


/***/ }),

/***/ "./node_modules/apisearch/lib/Error/InvalidFormatError.js":
/*!****************************************************************!*\
  !*** ./node_modules/apisearch/lib/Error/InvalidFormatError.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
exports.InvalidFormatError = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var ErrorWithMessage_1 = __webpack_require__(/*! ./ErrorWithMessage */ "./node_modules/apisearch/lib/Error/ErrorWithMessage.js");
/**
 * Class InvalidFormatError
 */
var InvalidFormatError = /** @class */ (function (_super) {
    tslib_1.__extends(InvalidFormatError, _super);
    function InvalidFormatError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Get transportable http error
     *
     * @return {number}
     */
    InvalidFormatError.getTransportableHTTPError = function () {
        return 400;
    };
    /**
     * Item representation not valid
     *
     * @return {InvalidFormatError}
     */
    InvalidFormatError.itemRepresentationNotValid = function () {
        return new InvalidFormatError("Item representation not valid. Expecting Item array serialized but found malformed data");
    };
    /**
     * Item UUID representation not valid
     *
     * @return {InvalidFormatError}
     */
    InvalidFormatError.itemUUIDRepresentationNotValid = function () {
        return new InvalidFormatError("Item UUID representation not valid. Expecting UUID array serialized but found malformed data");
    };
    /**
     * Create Composed UUID bad format.
     *
     * @return {InvalidFormatError}
     */
    InvalidFormatError.composedItemUUIDNotValid = function () {
        return new InvalidFormatError("A composed UUID should always follow this format: {id}~{type}.");
    };
    /**
     * Create Query sorted by distance without coordinate.
     *
     * @return {InvalidFormatError}
     */
    InvalidFormatError.querySortedByDistanceWithoutCoordinate = function () {
        return new InvalidFormatError("In order to be able to sort by coordinates, you need to create a Query by using Query::createLocated() instead of Query::create()");
    };
    /**
     * Query representation not valid
     *
     * @return {InvalidFormatError}
     */
    InvalidFormatError.queryFormatNotValid = function () {
        return new InvalidFormatError("Query Format not valid. Expecting a Query serialized but found malformed data");
    };
    /**
     * Coordinate representation not valid
     *
     * @return {InvalidFormatError}
     */
    InvalidFormatError.coordinateFormatNotValid = function () {
        return new InvalidFormatError("A Coordinate should always contain a lat (Latitude) and a lon (Longitude)");
    };
    /**
     * Config representation not valid
     *
     * @return {InvalidFormatError}
     */
    InvalidFormatError.configFormatNotValid = function () {
        return new InvalidFormatError("Config Format not valid. Expecting a Config serialized but found malformed data");
    };
    /**
     * Token representation not valid
     *
     * @return {InvalidFormatError}
     */
    InvalidFormatError.tokenFormatNotValid = function () {
        return new InvalidFormatError("Token Format not valid. Expecting a Token serialized but found malformed data");
    };
    /**
     * Index format not valid.
     *
     * @return {InvalidFormatError}
     */
    InvalidFormatError.indexFormatNotValid = function () {
        return new InvalidFormatError('Index Format not valid. Expecting an Index serialized but found malformed data');
    };
    /**
     * IndexUUI format not valid.
     *
     * @return {InvalidFormatError}
     */
    InvalidFormatError.indexUUIDFormatNotValid = function () {
        return new InvalidFormatError('IndexUUID Format not valid. Expecting an IndexUUID serialized but found malformed data');
    };
    /**
     * App format not valid.
     *
     * @return {InvalidFormatError}
     */
    InvalidFormatError.appUUIDFormatNotValid = function () {
        return new InvalidFormatError('AppUUID Format not valid. Expecting an AppUUID serialized but found malformed data');
    };
    /**
     * Campaign representation not valid
     *
     * @return {InvalidFormatError}
     */
    InvalidFormatError.campaignFormatNotValid = function () {
        return new InvalidFormatError("Campaign Format not valid. Expecting a Campaign serialized but found malformed data");
    };
    /**
     * Changes representation not valid
     *
     * @return {InvalidFormatError}
     */
    InvalidFormatError.changesFormatNotValid = function () {
        return new InvalidFormatError("Changes Format not valid. Expecting a Changes serialized but found malformed data");
    };
    /**
     * Boost clause representation not valid
     *
     * @return {InvalidFormatError}
     */
    InvalidFormatError.boostClauseFormatNotValid = function () {
        return new InvalidFormatError("Boost clause Format not valid. Expecting a Boost clause serialized but found malformed data");
    };
    /**
     * token uuid representation not valid
     *
     * @return {InvalidFormatError}
     */
    InvalidFormatError.tokenUUIDFormatNotValid = function () {
        return new InvalidFormatError("Token UUID Format not valid. Expecting a TokenUUID serialized but found malformed data");
    };
    /**
     * User representation not valid
     *
     * @return {InvalidFormatError}
     */
    InvalidFormatError.userFormatNotValid = function () {
        return new InvalidFormatError("User Format not valid. Expecting a User serialized but found malformed data");
    };
    return InvalidFormatError;
}(ErrorWithMessage_1.ErrorWithMessage));
exports.InvalidFormatError = InvalidFormatError;


/***/ }),

/***/ "./node_modules/apisearch/lib/Error/InvalidTokenError.js":
/*!***************************************************************!*\
  !*** ./node_modules/apisearch/lib/Error/InvalidTokenError.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
exports.InvalidTokenError = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var ErrorWithMessage_1 = __webpack_require__(/*! ./ErrorWithMessage */ "./node_modules/apisearch/lib/Error/ErrorWithMessage.js");
/**
 * Invalid token error
 */
var InvalidTokenError = /** @class */ (function (_super) {
    tslib_1.__extends(InvalidTokenError, _super);
    function InvalidTokenError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Get transportable http error
     *
     * @return {number}
     */
    InvalidTokenError.getTransportableHTTPError = function () {
        return 401;
    };
    /**
     * Invalid token permissions
     *
     * @param tokenReference
     *
     * @return {InvalidTokenError}
     */
    InvalidTokenError.createInvalidTokenPermissions = function (tokenReference) {
        return new InvalidTokenError("Token " + tokenReference + "not valid");
    };
    /**
     * Invalid token permissions
     *
     * @param tokenReference
     * @param maxHitsPerQuery
     *
     * @return {InvalidTokenError}
     */
    InvalidTokenError.createInvalidTokenMaxHitsPerQuery = function (tokenReference, maxHitsPerQuery) {
        return new InvalidTokenError("Token " + tokenReference + "not valid. Max " + maxHitsPerQuery + " hits allowed");
    };
    return InvalidTokenError;
}(ErrorWithMessage_1.ErrorWithMessage));
exports.InvalidTokenError = InvalidTokenError;


/***/ }),

/***/ "./node_modules/apisearch/lib/Error/ResourceExistsError.js":
/*!*****************************************************************!*\
  !*** ./node_modules/apisearch/lib/Error/ResourceExistsError.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
exports.ResourceExistsError = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var ErrorWithMessage_1 = __webpack_require__(/*! ./ErrorWithMessage */ "./node_modules/apisearch/lib/Error/ErrorWithMessage.js");
/**
 * Resource exists error
 */
var ResourceExistsError = /** @class */ (function (_super) {
    tslib_1.__extends(ResourceExistsError, _super);
    function ResourceExistsError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Get transportable http error
     *
     * @return {number}
     */
    ResourceExistsError.getTransportableHTTPError = function () {
        return 409;
    };
    /**
     * Index not available
     *
     * @return {InvalidFormatError}
     */
    ResourceExistsError.indexAvailable = function () {
        return new ResourceExistsError("Index exists and cannot be created again");
    };
    /**
     * Events not available
     *
     * @return {InvalidFormatError}
     */
    ResourceExistsError.eventsIndexAvailable = function () {
        return new ResourceExistsError("Events index exists and cannot be created again");
    };
    /**
     * Logs not available
     *
     * @return {InvalidFormatError}
     */
    ResourceExistsError.logsIndexAvailable = function () {
        return new ResourceExistsError("Logs index exists and cannot be created again");
    };
    return ResourceExistsError;
}(ErrorWithMessage_1.ErrorWithMessage));
exports.ResourceExistsError = ResourceExistsError;


/***/ }),

/***/ "./node_modules/apisearch/lib/Error/ResourceNotAvailableError.js":
/*!***********************************************************************!*\
  !*** ./node_modules/apisearch/lib/Error/ResourceNotAvailableError.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
exports.ResourceNotAvailableError = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var ErrorWithMessage_1 = __webpack_require__(/*! ./ErrorWithMessage */ "./node_modules/apisearch/lib/Error/ErrorWithMessage.js");
/**
 * Resource not available error
 */
var ResourceNotAvailableError = /** @class */ (function (_super) {
    tslib_1.__extends(ResourceNotAvailableError, _super);
    function ResourceNotAvailableError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Get transportable http error
     *
     * @return {number}
     */
    ResourceNotAvailableError.getTransportableHTTPError = function () {
        return 404;
    };
    /**
     * Index not available
     *
     * @param resourceId
     *
     * @return {InvalidFormatError}
     */
    ResourceNotAvailableError.indexNotAvailable = function (resourceId) {
        return new ResourceNotAvailableError("Index not available - " + resourceId);
    };
    /**
     * Events not available
     *
     * @param resourceId
     *
     * @return {InvalidFormatError}
     */
    ResourceNotAvailableError.eventsIndexNotAvailable = function (resourceId) {
        return new ResourceNotAvailableError("Events not available - " + resourceId);
    };
    /**
     * Logs not available
     *
     * @param resourceId
     *
     * @return {InvalidFormatError}
     */
    ResourceNotAvailableError.logsIndexNotAvailable = function (resourceId) {
        return new ResourceNotAvailableError("Logs not available - " + resourceId);
    };
    /**
     * Engine not available
     *
     * @param resourceId
     *
     * @return {InvalidFormatError}
     */
    ResourceNotAvailableError.engineNotAvailable = function (resourceId) {
        return new ResourceNotAvailableError("Engine not available - " + resourceId);
    };
    return ResourceNotAvailableError;
}(ErrorWithMessage_1.ErrorWithMessage));
exports.ResourceNotAvailableError = ResourceNotAvailableError;


/***/ }),

/***/ "./node_modules/apisearch/lib/Error/UnknownError.js":
/*!**********************************************************!*\
  !*** ./node_modules/apisearch/lib/Error/UnknownError.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
exports.UnknownError = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var ErrorWithMessage_1 = __webpack_require__(/*! ./ErrorWithMessage */ "./node_modules/apisearch/lib/Error/ErrorWithMessage.js");
/**
 * Connection error
 */
var UnknownError = /** @class */ (function (_super) {
    tslib_1.__extends(UnknownError, _super);
    function UnknownError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Unknown error
     *
     * @return this
     */
    UnknownError.createUnknownError = function () {
        return new this("Unknown error.");
    };
    return UnknownError;
}(ErrorWithMessage_1.ErrorWithMessage));
exports.UnknownError = UnknownError;


/***/ }),

/***/ "./node_modules/apisearch/lib/Error/UnsupportedContentTypeError.js":
/*!*************************************************************************!*\
  !*** ./node_modules/apisearch/lib/Error/UnsupportedContentTypeError.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
exports.UnsupportedContentTypeError = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var ErrorWithMessage_1 = __webpack_require__(/*! ./ErrorWithMessage */ "./node_modules/apisearch/lib/Error/ErrorWithMessage.js");
/**
 * Unsupported content type error
 */
var UnsupportedContentTypeError = /** @class */ (function (_super) {
    tslib_1.__extends(UnsupportedContentTypeError, _super);
    function UnsupportedContentTypeError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Get transportable http error
     *
     * @return {number}
     */
    UnsupportedContentTypeError.getTransportableHTTPError = function () {
        return 415;
    };
    /**
     * Unsupported content type
     *
     * @return {InvalidFormatError}
     */
    UnsupportedContentTypeError.createUnsupportedContentTypeException = function () {
        return new UnsupportedContentTypeError("This content type is not accepted. Please use application/json");
    };
    return UnsupportedContentTypeError;
}(ErrorWithMessage_1.ErrorWithMessage));
exports.UnsupportedContentTypeError = UnsupportedContentTypeError;


/***/ }),

/***/ "./node_modules/apisearch/lib/Geo/LocationRange.js":
/*!*********************************************************!*\
  !*** ./node_modules/apisearch/lib/Geo/LocationRange.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
exports.Square = exports.Polygon = exports.CoordinateAndDistance = exports.LocationRange = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var Coordinate_1 = __webpack_require__(/*! ../Model/Coordinate */ "./node_modules/apisearch/lib/Model/Coordinate.js");
/**
 * Abstract Location Range class
 */
var LocationRange = /** @class */ (function () {
    function LocationRange() {
    }
    /**
     * From filter object
     *
     * @param object
     *
     * @return {LocationRange}
     */
    LocationRange.fromFilterObject = function (object) {
        throw TypeError("Method not valid");
    };
    /**
     * to array
     */
    LocationRange.prototype.toArray = function () {
        return {
            type: this.getName(),
            data: this.toFilterObject()
        };
    };
    /**
     * Create from array
     *
     * @param array
     */
    LocationRange.createFromArray = function (array) {
        if (array.type == "CoordinateAndDistance") {
            return CoordinateAndDistance.fromFilterObject(array.data);
        }
        if (array.type == "Polygon") {
            return Polygon.fromFilterObject(array.data);
        }
        if (array.type == "Square") {
            return Square.fromFilterObject(array.data);
        }
    };
    return LocationRange;
}());
exports.LocationRange = LocationRange;
/**
 * CoordinateAndDistance
 */
var CoordinateAndDistance = /** @class */ (function (_super) {
    tslib_1.__extends(CoordinateAndDistance, _super);
    /**
     * Constructor
     *
     * @param coordinate
     * @param distance
     */
    function CoordinateAndDistance(coordinate, distance) {
        var _this = _super.call(this) || this;
        _this.coordinate = coordinate;
        _this.distance = distance;
        return _this;
    }
    /**
     * To filter object
     *
     * @return {{}}}
     */
    CoordinateAndDistance.prototype.toFilterObject = function () {
        return {
            coordinate: this.coordinate.toArray(),
            distance: this.distance
        };
    };
    /**
     * Get name
     *
     * @return {string}
     */
    CoordinateAndDistance.prototype.getName = function () {
        return "CoordinateAndDistance";
    };
    /**
     * From filter object
     *
     * @param object
     *
     * @return {LocationRange}
     */
    CoordinateAndDistance.fromFilterObject = function (object) {
        return new CoordinateAndDistance(Coordinate_1.Coordinate.createFromArray(object.coordinate), object.distance);
    };
    return CoordinateAndDistance;
}(LocationRange));
exports.CoordinateAndDistance = CoordinateAndDistance;
/**
 * Polygon
 */
var Polygon = /** @class */ (function (_super) {
    tslib_1.__extends(Polygon, _super);
    /**
     * Constructor
     *
     * @param coordinates
     */
    function Polygon(coordinates) {
        var _this = _super.call(this) || this;
        if (coordinates.length < 3) {
            throw new Error("A polygon needs more than two coordinates.");
        }
        _this.coordinates = coordinates;
        return _this;
    }
    /**
     * To filter object
     *
     * @return {{coordinates: {lat:number, lon:number}[]}}
     */
    Polygon.prototype.toFilterObject = function () {
        var coordinates = [];
        for (var i in this.coordinates) {
            coordinates.push(this.coordinates[i].toArray());
        }
        return {
            coordinates: coordinates
        };
    };
    /**
     * Get name
     *
     * @return {string}
     */
    Polygon.prototype.getName = function () {
        return "Polygon";
    };
    /**
     * From filter object
     *
     * @param object
     *
     * @return {Polygon}
     */
    Polygon.fromFilterObject = function (object) {
        var coordinates = [];
        for (var i in object.coordinates) {
            coordinates.push(Coordinate_1.Coordinate.createFromArray(object.coordinates[i]));
        }
        return new Polygon(coordinates);
    };
    return Polygon;
}(LocationRange));
exports.Polygon = Polygon;
/**
 * Square
 */
var Square = /** @class */ (function (_super) {
    tslib_1.__extends(Square, _super);
    /**
     * Constructor
     *
     * @param topLeftCoordinate
     * @param bottomRightCoordinate
     */
    function Square(topLeftCoordinate, bottomRightCoordinate) {
        var _this = _super.call(this) || this;
        _this.topLeftCoordinate = topLeftCoordinate;
        _this.bottomRightCoordinate = bottomRightCoordinate;
        return _this;
    }
    /**
     * To filter object
     *
     * @return {{}}}
     */
    Square.prototype.toFilterObject = function () {
        return {
            top_left: this.topLeftCoordinate.toArray(),
            bottom_right: this.bottomRightCoordinate.toArray()
        };
    };
    /**
     * Get name
     *
     * @return {string}
     */
    Square.prototype.getName = function () {
        return "Square";
    };
    /**
     * From filter object
     *
     * @param object
     *
     * @return {LocationRange}
     */
    Square.fromFilterObject = function (object) {
        return new Square(Coordinate_1.Coordinate.createFromArray(object.top_left), Coordinate_1.Coordinate.createFromArray(object.bottom_right));
    };
    return Square;
}(LocationRange));
exports.Square = Square;


/***/ }),

/***/ "./node_modules/apisearch/lib/Http/AxiosClient.js":
/*!********************************************************!*\
  !*** ./node_modules/apisearch/lib/Http/AxiosClient.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
exports.AxiosClient = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var axios_1 = __webpack_require__(/*! axios */ "./node_modules/axios/dist/browser/axios.cjs");
var __1 = __webpack_require__(/*! .. */ "./node_modules/apisearch/lib/index.js");
var Client_1 = __webpack_require__(/*! ./Client */ "./node_modules/apisearch/lib/Http/Client.js");
var Response_1 = __webpack_require__(/*! ./Response */ "./node_modules/apisearch/lib/Http/Response.js");
/**
 * AxiosClient
 */
var AxiosClient = /** @class */ (function (_super) {
    tslib_1.__extends(AxiosClient, _super);
    /**
     * Constructor
     *
     * @param host
     * @param version
     * @param timeout
     * @param overrideQueries
     */
    function AxiosClient(host, version, timeout, overrideQueries) {
        var _this = _super.call(this, version) || this;
        _this.host = host;
        _this.timeout = timeout;
        _this.overrideQueries = overrideQueries;
        _this.abortControllers = {};
        return _this;
    }
    /**
     * @param url
     * @param method
     * @param credentials
     * @param parameters
     * @param data
     */
    AxiosClient.prototype.get = function (url, method, credentials, parameters, data) {
        if (parameters === void 0) { parameters = {}; }
        if (data === void 0) { data = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var headers, axiosRequestConfig, axiosResponse, error_1, response;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = url.replace(/^\/*|\/*$/g, "");
                        url = "/" + (this.version + "/" + url).replace(/^\/*|\/*$/g, "");
                        method = method.toLowerCase();
                        if ("get" === method &&
                            this.overrideQueries) {
                            this.abort(url, true);
                        }
                        headers = "get" === method
                            ? {}
                            : {
                                "Content-Encoding": "gzip",
                                "Content-Type": "application/json"
                            };
                        axiosRequestConfig = {
                            baseURL: this.host.replace(/\/*$/g, ""),
                            data: data,
                            headers: headers,
                            method: method,
                            timeout: this.timeout,
                            transformRequest: [function (rawData) { return JSON.stringify(rawData); }],
                            url: url + "?" + Client_1.Client.objectToUrlParameters(tslib_1.__assign(tslib_1.__assign({}, parameters), {
                                token: credentials.token
                            })).replace(/#/g, "%23")
                        };
                        if (typeof this.abortControllers[url] !== "undefined") {
                            axiosRequestConfig.signal = this.abortControllers[url].signal;
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.fetch(url, axiosRequestConfig, 3)];
                    case 2:
                        axiosResponse = _a.sent();
                        return [2 /*return*/, new Response_1.Response(axiosResponse.status, axiosResponse.data)];
                    case 3:
                        error_1 = _a.sent();
                        response = void 0;
                        if (error_1.response) {
                            response = new Response_1.Response(error_1.response.status, error_1.response.data);
                        }
                        else {
                            response = new Response_1.Response(__1.ConnectionError.getTransportableHTTPError(), {
                                message: error_1.message
                            });
                        }
                        throw response;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Abort current request
     * And regenerate the cancellation token
     *
     * @param url
     * @param urlIsFormatted
     */
    AxiosClient.prototype.abort = function (url, urlIsFormatted) {
        if (!urlIsFormatted) {
            url = url.replace(/^\/*|\/*$/g, "");
            url = "/" + (this.version + "/" + url).replace(/^\/*|\/*$/g, "");
        }
        if (typeof this.abortControllers[url] !== "undefined") {
            this.abortControllers[url].abort();
        }
        this.generateAbortController(url);
    };
    /**
     * Generate a new cancellation token for a query
     *
     * @param url
     */
    AxiosClient.prototype.generateAbortController = function (url) {
        this.abortControllers[url] = new AbortController();
    };
    /**
     * @param url
     * @param options
     * @param retries
     */
    AxiosClient.prototype.fetch = function (url, options, retries) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1["default"]
                            .request(options)
                            .then(function (response) {
                            return {
                                data: response.data,
                                status: response.status
                            };
                        })["catch"](function (error) {
                            var response = error.response;
                            if (error.code !== undefined &&
                                error.code !== "ECONNREFUSED" &&
                                error.code !== "ECONNABORTED" &&
                                error.code !== "ERR_BAD_REQUEST" &&
                                error.message !== "Network Error") {
                                return {
                                    data: response.data,
                                    status: response.status
                                };
                            }
                            if (retries <= 0) {
                                throw error;
                            }
                            retries = retries - 1;
                            return _this.fetch(url, options, retries);
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return AxiosClient;
}(Client_1.Client));
exports.AxiosClient = AxiosClient;


/***/ }),

/***/ "./node_modules/apisearch/lib/Http/CacheClient.js":
/*!********************************************************!*\
  !*** ./node_modules/apisearch/lib/Http/CacheClient.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
exports.CacheClient = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var ts_md5_1 = __webpack_require__(/*! ts-md5 */ "./node_modules/ts-md5/dist/esm/index.js");
/**
 * AxiosClient
 */
var CacheClient = /** @class */ (function () {
    function CacheClient(httpClient) {
        this.cache = {};
        this.hits = 0;
        this.httpClient = httpClient;
    }
    CacheClient.prototype.flushCache = function () {
        this.cache = {};
    };
    CacheClient.prototype.size = function () {
        return Object.keys(this.cache).length;
    };
    CacheClient.prototype.getNumberOfHits = function () {
        return this.hits;
    };
    /**
     * Get
     *
     * @param url
     * @param method
     * @param credentials
     * @param parameters
     * @param data
     *
     * @return {Promise<Response>}
     */
    CacheClient.prototype.get = function (url, method, credentials, parameters, data) {
        if (parameters === void 0) { parameters = {}; }
        if (data === void 0) { data = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var cacheUID, _a, _b;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (method !== 'get') {
                            return [2 /*return*/, this.httpClient.get(url, method, credentials, parameters, data)];
                        }
                        cacheUID = ts_md5_1.Md5.hashStr(JSON.stringify({
                            'u': url,
                            'c': credentials,
                            'p': parameters,
                            'd': data
                        })).toString();
                        if (!!this.cache[cacheUID]) return [3 /*break*/, 2];
                        _a = this.cache;
                        _b = cacheUID;
                        return [4 /*yield*/, this.httpClient.get(url, method, credentials, parameters, data)];
                    case 1:
                        _a[_b] = _c.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        this.httpClient.abort(url, false);
                        this.hits++;
                        _c.label = 3;
                    case 3: return [2 /*return*/, this.cache[cacheUID]];
                }
            });
        });
    };
    /**
     * Abort current request
     * And regenerate the cancellation token
     *
     * @param url
     * @param urlIsFormatted
     */
    CacheClient.prototype.abort = function (url, urlIsFormatted) {
    };
    return CacheClient;
}());
exports.CacheClient = CacheClient;


/***/ }),

/***/ "./node_modules/apisearch/lib/Http/Client.js":
/*!***************************************************!*\
  !*** ./node_modules/apisearch/lib/Http/Client.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.__esModule = true;
exports.Client = void 0;
/**
 * Client
 */
var Client = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param version
     */
    function Client(version) {
        this.version = version.replace(/^\/*|\/*$/g, "");
    }
    /**
     * Build an url parameters array by an object
     *
     * @param params
     *
     * @returns {string}
     */
    Client.objectToUrlParameters = function (params) {
        var builtParams = [];
        for (var i in params) {
            builtParams.push(i + "=" + params[i]);
        }
        return builtParams.join("&");
    };
    return Client;
}());
exports.Client = Client;


/***/ }),

/***/ "./node_modules/apisearch/lib/Http/HttpClient.js":
/*!*******************************************************!*\
  !*** ./node_modules/apisearch/lib/Http/HttpClient.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.__esModule = true;
exports.HttpClient = void 0;
/**
 * Http class
 */
var HttpClient = /** @class */ (function () {
    function HttpClient() {
    }
    return HttpClient;
}());
exports.HttpClient = HttpClient;


/***/ }),

/***/ "./node_modules/apisearch/lib/Http/Response.js":
/*!*****************************************************!*\
  !*** ./node_modules/apisearch/lib/Http/Response.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.__esModule = true;
exports.Response = void 0;
/**
 * Response
 */
var Response = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param code
     * @param body
     */
    function Response(code, body) {
        this.code = code;
        this.body = body;
    }
    /**
     * Get code
     *
     * @return {number}
     */
    Response.prototype.getCode = function () {
        return this.code;
    };
    /**
     * Get body
     *
     * @return {any}
     */
    Response.prototype.getBody = function () {
        return this.body;
    };
    return Response;
}());
exports.Response = Response;


/***/ }),

/***/ "./node_modules/apisearch/lib/Model/AppUUID.js":
/*!*****************************************************!*\
  !*** ./node_modules/apisearch/lib/Model/AppUUID.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
exports.AppUUID = void 0;
var InvalidFormatError_1 = __webpack_require__(/*! ../Error/InvalidFormatError */ "./node_modules/apisearch/lib/Error/InvalidFormatError.js");
/**
 * AppUUID class
 */
var AppUUID = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param id
     */
    function AppUUID(id) {
        if (id.indexOf('_') >= 0) {
            throw InvalidFormatError_1.InvalidFormatError.appUUIDFormatNotValid();
        }
        this.id = id;
    }
    /**
     * Create by id
     *
     * @param id
     *
     * @returns {ItemUUID}
     */
    AppUUID.createById = function (id) {
        return new AppUUID(id);
    };
    /**
     * Return id
     *
     * @returns {string}
     */
    AppUUID.prototype.getId = function () {
        return this.id;
    };
    /**
     * To array
     *
     * @returns {{id: *, type: *}}
     */
    AppUUID.prototype.toArray = function () {
        return {
            id: this.id
        };
    };
    /**
     * Create from array
     *
     * @param array {{id:string, type:string}}
     *
     * @return {ItemUUID}
     */
    AppUUID.createFromArray = function (array) {
        array = JSON.parse(JSON.stringify(array));
        return new AppUUID(array.id);
    };
    /**
     * Compose unique id
     *
     * @returns {string}
     */
    AppUUID.prototype.composedUUID = function () {
        return this.id;
    };
    return AppUUID;
}());
exports.AppUUID = AppUUID;


/***/ }),

/***/ "./node_modules/apisearch/lib/Model/Changes.js":
/*!*****************************************************!*\
  !*** ./node_modules/apisearch/lib/Model/Changes.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.__esModule = true;
exports.Changes = exports.TYPE_ARRAY = exports.TYPE_ARRAY_EXPECTS_ELEMENT = exports.TYPE_ARRAY_ELEMENT_DELETE = exports.TYPE_ARRAY_ELEMENT_ADD = exports.TYPE_ARRAY_ELEMENT_UPDATE = exports.TYPE_LITERAL = exports.TYPE_VALUE = void 0;
/**
 * filter constants
 */
exports.TYPE_VALUE = 1;
exports.TYPE_LITERAL = 4;
exports.TYPE_ARRAY_ELEMENT_UPDATE = 8;
exports.TYPE_ARRAY_ELEMENT_ADD = 16;
exports.TYPE_ARRAY_ELEMENT_DELETE = 32;
exports.TYPE_ARRAY_EXPECTS_ELEMENT = 24;
exports.TYPE_ARRAY = 56;
/**
 * Changes Type cast
 * @param Changes
 */
var Changes = /** @class */ (function () {
    function Changes() {
        /**
         * Changes
         *
         * @type {Array}
         */
        this.changes = [];
    }
    /**
     * Add new change
     *
     * @param field
     * @param value
     * @param type
     */
    Changes.prototype.addChange = function (field, value, type) {
        if (type === void 0) { type = exports.TYPE_VALUE; }
        this.changes.push({
            field: field,
            type: type,
            value: value
        });
    };
    /**
     * Update element from list
     *
     * @param field
     * @param condition
     * @param value
     * @param type
     */
    Changes.prototype.updateElementFromList = function (field, condition, value, type) {
        this.changes.push({
            field: field,
            type: type | exports.TYPE_ARRAY_ELEMENT_UPDATE,
            condition: condition,
            value: value
        });
    };
    /**
     * Add element in list
     *
     * @param field
     * @param value
     * @param type
     */
    Changes.prototype.addElementInList = function (field, value, type) {
        this.changes.push({
            field: field,
            type: type | exports.TYPE_ARRAY_ELEMENT_ADD,
            value: value
        });
    };
    /**
     * Delete element from list
     *
     * @param field
     * @param condition
     */
    Changes.prototype.deleteElementFromList = function (field, condition) {
        this.changes.push({
            field: field,
            type: exports.TYPE_ARRAY_ELEMENT_DELETE,
            condition: condition
        });
    };
    /**
     * Get changes
     *
     * @returns {[]}
     */
    Changes.prototype.getChanges = function () {
        return this.changes;
    };
    /**
     * Create
     *
     * @returns {Changes}
     */
    Changes.create = function () {
        return new Changes();
    };
    /**
     * To array
     *
     * @returns {[]}
     */
    Changes.prototype.toArray = function () {
        return JSON.parse(JSON.stringify(this.changes));
    };
    /**
     * Create from array
     *
     * @param array
     *
     * @returns {Changes}
     */
    Changes.createFromArray = function (array) {
        array = JSON.parse(JSON.stringify(array));
        var changes = Changes.create();
        changes.changes = array;
        return changes;
    };
    return Changes;
}());
exports.Changes = Changes;


/***/ }),

/***/ "./node_modules/apisearch/lib/Model/Coordinate.js":
/*!********************************************************!*\
  !*** ./node_modules/apisearch/lib/Model/Coordinate.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
exports.Coordinate = void 0;
var InvalidFormatError_1 = __webpack_require__(/*! ../Error/InvalidFormatError */ "./node_modules/apisearch/lib/Error/InvalidFormatError.js");
/**
 * Coordinate Type cast
 * @param coordinate
 */
var Coordinate = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param {number} lat
     * @param {number} lon
     */
    function Coordinate(lat, lon) {
        this.lat = lat;
        this.lon = lon;
    }
    /**
     * Get latitude
     *
     * @return float
     */
    Coordinate.prototype.getLatitude = function () {
        return this.lat;
    };
    /**
     * Get longitude
     *
     * @return float
     */
    Coordinate.prototype.getLongitude = function () {
        return this.lon;
    };
    /**
     * To array
     *
     * @return {{lat: number, lon: number}}
     */
    Coordinate.prototype.toArray = function () {
        return {
            lat: this.lat,
            lon: this.lon
        };
    };
    /**
     * Create from array
     *
     * @param array
     *
     * @return Coordinate
     *
     * @throws InvalidFormatError
     */
    Coordinate.createFromArray = function (array) {
        if (typeof array.lat == "undefined" ||
            typeof array.lon == "undefined") {
            throw InvalidFormatError_1.InvalidFormatError.coordinateFormatNotValid();
        }
        return new Coordinate(array.lat, array.lon);
    };
    return Coordinate;
}());
exports.Coordinate = Coordinate;


/***/ }),

/***/ "./node_modules/apisearch/lib/Model/Index.js":
/*!***************************************************!*\
  !*** ./node_modules/apisearch/lib/Model/Index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
exports.Index = void 0;
var InvalidFormatError_1 = __webpack_require__(/*! ../Error/InvalidFormatError */ "./node_modules/apisearch/lib/Error/InvalidFormatError.js");
var IndexUUID_1 = __webpack_require__(/*! ./IndexUUID */ "./node_modules/apisearch/lib/Model/IndexUUID.js");
var AppUUID_1 = __webpack_require__(/*! ./AppUUID */ "./node_modules/apisearch/lib/Model/AppUUID.js");
/**
 * Index class
 */
var Index = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param uuid
     * @param appUUID
     * @param isOK
     * @param docCount
     * @param size
     */
    function Index(uuid, appUUID, isOK, docCount, size) {
        if (isOK === void 0) { isOK = false; }
        if (docCount === void 0) { docCount = 0; }
        if (size === void 0) { size = '0kb'; }
        this.uuid = uuid;
        this.appUUID = appUUID;
        this.isOK = isOK;
        this.docCount = docCount;
        this.size = size;
    }
    /**
     * Get uuid
     *
     * @return {IndexUUID}
     */
    Index.prototype.getUUID = function () {
        return this.uuid;
    };
    /**
     * Get app id
     *
     * @return {AppUUID}
     */
    Index.prototype.getAppUUID = function () {
        return this.appUUID;
    };
    /**
     * Index is OK
     *
     * @return {boolean}
     */
    Index.prototype.isOk = function () {
        return this.isOK;
    };
    /**
     * Get doc count
     *
     * @return {number}
     */
    Index.prototype.getDocCount = function () {
        return this.docCount;
    };
    /**
     * get size
     *
     * @return {string}
     */
    Index.prototype.getSize = function () {
        return this.size;
    };
    /**
     * To array
     *
     * @returns {{id: string, attributes: {}}}
     */
    Index.prototype.toArray = function () {
        return {
            uuid: this.uuid.toArray(),
            app_id: this.appUUID.toArray(),
            is_ok: this.isOK,
            doc_count: this.docCount,
            size: this.size
        };
    };
    /**
     * Create from array
     *
     * @param array
     *
     * @return User
     */
    Index.createFromArray = function (array) {
        if (typeof array.uuid == "undefined" ||
            typeof array.app_id == "undefined") {
            throw InvalidFormatError_1.InvalidFormatError.indexFormatNotValid();
        }
        return new Index(IndexUUID_1.IndexUUID.createFromArray(array.uuid), AppUUID_1.AppUUID.createFromArray(array.app_id), (typeof array.is_ok == "undefined" ? false : array.is_ok), (typeof array.doc_count == "undefined" ? 0 : array.doc_count), (typeof array.size == "undefined" ? '0kb' : array.size));
    };
    return Index;
}());
exports.Index = Index;


/***/ }),

/***/ "./node_modules/apisearch/lib/Model/IndexUUID.js":
/*!*******************************************************!*\
  !*** ./node_modules/apisearch/lib/Model/IndexUUID.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
exports.IndexUUID = void 0;
var InvalidFormatError_1 = __webpack_require__(/*! ../Error/InvalidFormatError */ "./node_modules/apisearch/lib/Error/InvalidFormatError.js");
/**
 * IndexUUID class
 */
var IndexUUID = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param id
     */
    function IndexUUID(id) {
        if (id.indexOf('_') >= 0) {
            throw InvalidFormatError_1.InvalidFormatError.indexUUIDFormatNotValid();
        }
        this.id = id;
    }
    /**
     * Create by id
     *
     * @param id
     *
     * @returns {ItemUUID}
     */
    IndexUUID.createById = function (id) {
        return new IndexUUID(id);
    };
    /**
     * Return id
     *
     * @returns {string}
     */
    IndexUUID.prototype.getId = function () {
        return this.id;
    };
    /**
     * To array
     *
     * @returns {{id: *, type: *}}
     */
    IndexUUID.prototype.toArray = function () {
        return {
            id: this.id
        };
    };
    /**
     * Create from array
     *
     * @param array {{id:string, type:string}}
     *
     * @return {ItemUUID}
     */
    IndexUUID.createFromArray = function (array) {
        array = JSON.parse(JSON.stringify(array));
        return new IndexUUID(array.id);
    };
    /**
     * Compose unique id
     *
     * @returns {string}
     */
    IndexUUID.prototype.composedUUID = function () {
        return this.id;
    };
    return IndexUUID;
}());
exports.IndexUUID = IndexUUID;


/***/ }),

/***/ "./node_modules/apisearch/lib/Model/Item.js":
/*!**************************************************!*\
  !*** ./node_modules/apisearch/lib/Model/Item.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
exports.Item = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var InvalidFormatError_1 = __webpack_require__(/*! ../Error/InvalidFormatError */ "./node_modules/apisearch/lib/Error/InvalidFormatError.js");
var Coordinate_1 = __webpack_require__(/*! ./Coordinate */ "./node_modules/apisearch/lib/Model/Coordinate.js");
var ItemUUID_1 = __webpack_require__(/*! ./ItemUUID */ "./node_modules/apisearch/lib/Model/ItemUUID.js");
var AppUUID_1 = __webpack_require__(/*! ./AppUUID */ "./node_modules/apisearch/lib/Model/AppUUID.js");
var IndexUUID_1 = __webpack_require__(/*! ./IndexUUID */ "./node_modules/apisearch/lib/Model/IndexUUID.js");
/**
 * Item class
 */
var Item = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param uuid
     * @param coordinate
     * @param metadata
     * @param indexedMetadata
     * @param searchableMetadata
     * @param exactMatchingMetadata
     * @param suggest
     */
    function Item(uuid, coordinate, metadata, indexedMetadata, searchableMetadata, exactMatchingMetadata, suggest) {
        this.metadata = {};
        this.indexedMetadata = {};
        this.searchableMetadata = {};
        this.exactMatchingMetadata = [];
        this.suggest = [];
        this.highlights = {};
        this.promoted = false;
        this.uuid = uuid;
        this.coordinate = coordinate;
        this.metadata = metadata;
        this.indexedMetadata = indexedMetadata;
        this.searchableMetadata = searchableMetadata;
        this.exactMatchingMetadata = exactMatchingMetadata;
        this.suggest = suggest;
    }
    /**
     * Create new Item
     *
     * @param uuid
     * @param metadata
     * @param indexedMetadata
     * @param searchableMetadata
     * @param exactMatchingMetadata
     * @param suggest
     * @returns {Item}
     */
    Item.create = function (uuid, metadata, indexedMetadata, searchableMetadata, exactMatchingMetadata, suggest) {
        if (metadata === void 0) { metadata = {}; }
        if (indexedMetadata === void 0) { indexedMetadata = {}; }
        if (searchableMetadata === void 0) { searchableMetadata = {}; }
        if (exactMatchingMetadata === void 0) { exactMatchingMetadata = []; }
        if (suggest === void 0) { suggest = []; }
        return new Item(uuid, null, metadata, indexedMetadata, searchableMetadata, exactMatchingMetadata, suggest);
    };
    /**
     * Create new located Item
     *
     * @param uuid
     * @param coordinate
     * @param metadata
     * @param indexedMetadata
     * @param searchableMetadata
     * @param exactMatchingMetadata
     * @param suggest
     * @returns {Item}
     */
    Item.createLocated = function (uuid, coordinate, metadata, indexedMetadata, searchableMetadata, exactMatchingMetadata, suggest) {
        if (metadata === void 0) { metadata = {}; }
        if (indexedMetadata === void 0) { indexedMetadata = {}; }
        if (searchableMetadata === void 0) { searchableMetadata = {}; }
        if (exactMatchingMetadata === void 0) { exactMatchingMetadata = []; }
        if (suggest === void 0) { suggest = []; }
        return new Item(uuid, coordinate, metadata, indexedMetadata, searchableMetadata, exactMatchingMetadata, suggest);
    };
    /**
     * Get uuid
     *
     * @returns ItemUUID
     */
    Item.prototype.getUUID = function () {
        return this.uuid;
    };
    /**
     * Get id
     *
     * @returns string
     */
    Item.prototype.getId = function () {
        return this.uuid.getId();
    };
    /**
     * Get type
     *
     * @returns string
     */
    Item.prototype.getType = function () {
        return this.uuid.getType();
    };
    /**
     * Get coordinate
     *
     * @returns Coordinate|null
     */
    Item.prototype.getCoordinate = function () {
        return this.coordinate;
    };
    /**
     * Get distance
     *
     * @returns int
     */
    Item.prototype.getDistance = function () {
        return this.distance;
    };
    /**
     * Get metadata
     *
     * @returns Array
     */
    Item.prototype.getMetadata = function () {
        return this.metadata;
    };
    /**
     * Set metadata
     *
     * @param metadata
     */
    Item.prototype.setMetadata = function (metadata) {
        this.metadata = metadata;
    };
    /**
     * Add metadata
     *
     * @param key
     * @param value
     */
    Item.prototype.addMetadata = function (key, value) {
        this.metadata[key] = value;
    };
    /**
     * Get indexed metadata
     *
     * @returns Array
     */
    Item.prototype.getIndexedMetadata = function () {
        return this.indexedMetadata;
    };
    /**
     * Set indexed metadata
     *
     * @param indexedMetadata
     */
    Item.prototype.setIndexedMetadata = function (indexedMetadata) {
        this.indexedMetadata = indexedMetadata;
    };
    /**
     * Add indexed metadata
     *
     * @param key
     * @param value
     */
    Item.prototype.addIndexedMetadata = function (key, value) {
        this.indexedMetadata[key] = value;
    };
    /**
     * Get searchable metadata
     *
     * @returns Array
     */
    Item.prototype.getSearchableMetadata = function () {
        return this.searchableMetadata;
    };
    /**
     * Set searchable metadata
     *
     * @param searchableMetadata
     */
    Item.prototype.setSearchableMetadata = function (searchableMetadata) {
        this.searchableMetadata = searchableMetadata;
    };
    /**
     * Add searchable metadata
     *
     * @param key
     * @param value
     */
    Item.prototype.addSearchableMetadata = function (key, value) {
        this.searchableMetadata[key] = value;
    };
    /**
     * Get exactMatching metadata
     *
     * @returns Array
     */
    Item.prototype.getExactMatchingMetadata = function () {
        return this.exactMatchingMetadata;
    };
    /**
     * Set exactMatching metadata
     *
     * @param exactMatchingMetadata
     */
    Item.prototype.setExactMatchingMetadata = function (exactMatchingMetadata) {
        this.exactMatchingMetadata = exactMatchingMetadata;
    };
    /**
     * Add exactMatching metadata
     *
     * @param value
     */
    Item.prototype.addExactMatchingMetadata = function (value) {
        this.exactMatchingMetadata.push(value);
    };
    /**
     * Get all metadata
     *
     * @returns {{}}
     */
    Item.prototype.getAllMetadata = function () {
        return tslib_1.__assign(tslib_1.__assign({}, this.metadata), this.indexedMetadata);
    };
    /**
     * Get
     *
     * @param key
     *
     * @returns mixed|null
     */
    Item.prototype.get = function (key) {
        var allMetadata = this.getAllMetadata();
        return (typeof allMetadata[key] != "undefined")
            ? allMetadata[key]
            : null;
    };
    /**
     * Get suggest
     *
     * @returns Array
     */
    Item.prototype.getSuggest = function () {
        return this.suggest;
    };
    /**
     * Get highlights
     *
     * @returns Array
     */
    Item.prototype.getHighlights = function () {
        return this.highlights;
    };
    /**
     * Get highlight
     *
     * @param key
     *
     * @return string|null
     */
    Item.prototype.getHighlight = function (key) {
        return (typeof this.highlights[key] != "undefined")
            ? this.highlights[key]
            : null;
    };
    /**
     * Is promoted
     *
     * @returns boolean
     */
    Item.prototype.isPromoted = function () {
        return this.promoted;
    };
    /**
     * Set score
     *
     * @param score
     *
     * @return {Item}
     */
    Item.prototype.setScore = function (score) {
        this.score = score;
        return this;
    };
    /**
     * Get score
     *
     * @return {number}
     */
    Item.prototype.getScore = function () {
        return this.score;
    };
    /**
     * Set appUUID
     *
     * @return {AppUUID}
     */
    Item.prototype.getAppUUID = function () {
        return this.appUUID;
    };
    /**
     * Set indexUUID
     *
     * @return {IndexUUID}
     */
    Item.prototype.getIndexUUID = function () {
        return this.indexUUID;
    };
    /**
     * To array
     */
    Item.prototype.toArray = function () {
        var itemAsArray = {
            uuid: this.uuid.toArray()
        };
        if (this.coordinate instanceof Coordinate_1.Coordinate) {
            itemAsArray.coordinate = this.coordinate.toArray();
        }
        if (Object.keys(this.metadata).length > 0) {
            itemAsArray.metadata = this.metadata;
        }
        if (Object.keys(this.indexedMetadata).length > 0) {
            itemAsArray.indexed_metadata = this.indexedMetadata;
        }
        if (Object.keys(this.searchableMetadata).length > 0) {
            itemAsArray.searchable_metadata = this.searchableMetadata;
        }
        if (this.exactMatchingMetadata.length > 0) {
            itemAsArray.exact_matching_metadata = this.exactMatchingMetadata;
        }
        if (this.suggest.length > 0) {
            itemAsArray.suggest = this.suggest;
        }
        if (Object.keys(this.highlights).length > 0) {
            itemAsArray.highlights = this.highlights;
        }
        if (this.isPromoted()) {
            itemAsArray.is_promoted = true;
        }
        if (typeof this.distance != "undefined") {
            itemAsArray.distance = this.distance;
        }
        if (typeof this.score != "undefined") {
            itemAsArray.score = this.score;
        }
        if (typeof this.appUUID != "undefined") {
            itemAsArray.app_uuid = this.appUUID.toArray();
        }
        if (typeof this.indexUUID != "undefined") {
            itemAsArray.index_uuid = this.indexUUID.toArray();
        }
        return itemAsArray;
    };
    /**
     * Create from array
     *
     * @param array
     */
    Item.createFromArray = function (array) {
        array = JSON.parse(JSON.stringify(array));
        if (typeof array.uuid != "object") {
            throw InvalidFormatError_1.InvalidFormatError.itemUUIDRepresentationNotValid();
        }
        if (typeof array.coordinate != "undefined" &&
            typeof array.coordinate != "object") {
            throw InvalidFormatError_1.InvalidFormatError.coordinateFormatNotValid();
        }
        var item = (typeof array.coordinate == "object" &&
            array.coordinate != null)
            ? Item.createLocated(ItemUUID_1.ItemUUID.createFromArray(array.uuid), Coordinate_1.Coordinate.createFromArray(array.coordinate), ((typeof array.metadata == "undefined") ? {} : array.metadata), ((typeof array.indexed_metadata == "undefined") ? {} : array.indexed_metadata), ((typeof array.searchable_metadata == "undefined") ? {} : array.searchable_metadata), ((typeof array.exact_matching_metadata == "undefined") ? [] : array.exact_matching_metadata), ((typeof array.suggest == "undefined") ? [] : array.suggest))
            : Item.create(ItemUUID_1.ItemUUID.createFromArray(array.uuid), ((typeof array.metadata == "undefined") ? {} : array.metadata), ((typeof array.indexed_metadata == "undefined") ? {} : array.indexed_metadata), ((typeof array.searchable_metadata == "undefined") ? {} : array.searchable_metadata), ((typeof array.exact_matching_metadata == "undefined") ? [] : array.exact_matching_metadata), ((typeof array.suggest == "undefined") ? [] : array.suggest));
        if (typeof array.distance != "undefined" &&
            array.distance != null) {
            item.distance = array.distance;
        }
        if (typeof array.highlights == "object" &&
            array.highlights != null) {
            item.highlights = array.highlights;
        }
        if (typeof array.is_promoted != "undefined" &&
            array.is_promoted != null) {
            item.promoted = array.is_promoted;
        }
        if (typeof array.score != "undefined" &&
            array.score != null) {
            item.score = array.score;
        }
        if (typeof array.app_uuid != "undefined" &&
            array.app_uuid != null) {
            item.appUUID = AppUUID_1.AppUUID.createFromArray(array.app_uuid);
        }
        if (typeof array.index_uuid != "undefined" &&
            array.index_uuid != null) {
            item.indexUUID = IndexUUID_1.IndexUUID.createFromArray(array.index_uuid);
        }
        return item;
    };
    /**
     * Compose uuid
     *
     * @returns string
     */
    Item.prototype.composeUUID = function () {
        return this.uuid.composedUUID();
    };
    /**
     * Get path by field.
     *
     * @param field
     *
     * @returns {string}
     */
    Item.getPathByField = function (field) {
        return (["id", "type"].indexOf(field) > -1)
            ? "uuid." + field
            : "indexed_metadata." + field;
    };
    return Item;
}());
exports.Item = Item;


/***/ }),

/***/ "./node_modules/apisearch/lib/Model/ItemUUID.js":
/*!******************************************************!*\
  !*** ./node_modules/apisearch/lib/Model/ItemUUID.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
exports.ItemUUID = void 0;
var InvalidFormatError_1 = __webpack_require__(/*! ../Error/InvalidFormatError */ "./node_modules/apisearch/lib/Error/InvalidFormatError.js");
/**
 * ItemUUID class
 */
var ItemUUID = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param id
     * @param type
     */
    function ItemUUID(id, type) {
        this.id = id;
        this.type = type;
    }
    /**
     * Create composed UUID
     *
     * @param composedUUID
     *
     * @returns {ItemUUID}
     */
    ItemUUID.createByComposedUUID = function (composedUUID) {
        var parts = composedUUID.split("~");
        if (2 != parts.length) {
            throw InvalidFormatError_1.InvalidFormatError.composedItemUUIDNotValid();
        }
        return new ItemUUID(parts[0], parts[1]);
    };
    /**
     * Return id
     *
     * @returns {string}
     */
    ItemUUID.prototype.getId = function () {
        return this.id;
    };
    /**
     * Get type
     *
     * @returns {string}
     */
    ItemUUID.prototype.getType = function () {
        return this.type;
    };
    /**
     * To array
     *
     * @returns {{id: *, type: *}}
     */
    ItemUUID.prototype.toArray = function () {
        return {
            id: this.id,
            type: this.type
        };
    };
    /**
     * Create from array
     *
     * @param array {{id:string, type:string}}
     *
     * @return {ItemUUID}
     */
    ItemUUID.createFromArray = function (array) {
        array = JSON.parse(JSON.stringify(array));
        return new ItemUUID(array.id, array.type);
    };
    /**
     * Compose unique id
     *
     * @returns {string}
     */
    ItemUUID.prototype.composedUUID = function () {
        return this.id + "~" + this.type;
    };
    return ItemUUID;
}());
exports.ItemUUID = ItemUUID;


/***/ }),

/***/ "./node_modules/apisearch/lib/Model/Metadata.js":
/*!******************************************************!*\
  !*** ./node_modules/apisearch/lib/Model/Metadata.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.__esModule = true;
exports.Metadata = void 0;
/**
 * User class
 */
var Metadata = /** @class */ (function () {
    function Metadata() {
    }
    /**
     * To metadata
     *
     * @param array:{}
     *
     * @returns {string}
     */
    Metadata.toMetadata = function (array) {
        array = JSON.parse(JSON.stringify(array));
        var parts = [];
        for (var key in array) {
            parts.push(key + "##" + array[key]);
        }
        return parts.join("~~");
    };
    /**
     * From metadata
     *
     * @param metadata
     *
     * @return {{}}
     */
    Metadata.fromMetadata = function (metadata) {
        var values = {};
        var splittedParts = metadata.split("~~");
        var iterator = 0;
        var size = 0;
        var lastElement = null;
        for (var key in splittedParts) {
            var part = splittedParts[key];
            var parts = part.split("##");
            if (parts.length > 1) {
                lastElement = parts[1];
                values[parts[0]] = lastElement;
            }
            else {
                lastElement = part;
                values[iterator++] = lastElement;
            }
            size++;
        }
        if (size == 1) {
            values = {
                id: lastElement,
                name: lastElement
            };
        }
        if (typeof values.id == "undefined") {
            return null;
        }
        return values;
    };
    return Metadata;
}());
exports.Metadata = Metadata;


/***/ }),

/***/ "./node_modules/apisearch/lib/Model/User.js":
/*!**************************************************!*\
  !*** ./node_modules/apisearch/lib/Model/User.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
exports.User = void 0;
var InvalidFormatError_1 = __webpack_require__(/*! ../Error/InvalidFormatError */ "./node_modules/apisearch/lib/Error/InvalidFormatError.js");
/**
 * User class
 */
var User = /** @class */ (function () {
    /**
     * Construct
     *
     * @param id string
     * @param attributes Array
     */
    function User(id, attributes) {
        if (attributes === void 0) { attributes = {}; }
        this.id = id;
        this.attributes = attributes;
    }
    /**
     * Return the user id
     *
     * @return {string}
     */
    User.prototype.getId = function () {
        return this.id;
    };
    /**
     * Return array
     *
     * @returns {{}}
     */
    User.prototype.getAttributes = function () {
        return this.attributes;
    };
    /**
     * To array
     *
     * @returns {{id: string, attributes: {}}}
     */
    User.prototype.toArray = function () {
        var array = {
            id: this.id
        };
        if (Object.keys(this.attributes).length > 0) {
            array.attributes = this.attributes;
        }
        return array;
    };
    /**
     * Create from array
     *
     * @param array
     *
     * @return User
     */
    User.createFromArray = function (array) {
        if (array == null ||
            typeof array.id == "undefined" ||
            array.id == null) {
            throw InvalidFormatError_1.InvalidFormatError.userFormatNotValid();
        }
        var attributes = typeof array.attributes === typeof {}
            ? array.attributes
            : {};
        return new User(array.id, attributes);
    };
    return User;
}());
exports.User = User;


/***/ }),

/***/ "./node_modules/apisearch/lib/Query/Aggregation.js":
/*!*********************************************************!*\
  !*** ./node_modules/apisearch/lib/Query/Aggregation.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
exports.Aggregation = exports.AGGREGATION_NO_LIMIT = exports.AGGREGATION_SORT_BY_NAME_DESC = exports.AGGREGATION_SORT_BY_NAME_ASC = exports.AGGREGATION_SORT_BY_COUNT_DESC = exports.AGGREGATION_SORT_BY_COUNT_ASC = void 0;
var Filter_1 = __webpack_require__(/*! ./Filter */ "./node_modules/apisearch/lib/Query/Filter.js");
/**
 * Aggregation constants
 */
exports.AGGREGATION_SORT_BY_COUNT_ASC = ["_count", "asc"];
exports.AGGREGATION_SORT_BY_COUNT_DESC = ["_count", "desc"];
exports.AGGREGATION_SORT_BY_NAME_ASC = ["_term", "asc"];
exports.AGGREGATION_SORT_BY_NAME_DESC = ["_term", "desc"];
exports.AGGREGATION_NO_LIMIT = 0;
/**
 * Aggregation class
 */
var Aggregation = /** @class */ (function () {
    /**
     * Construct
     *
     * @param name
     * @param field
     * @param applicationType
     * @param filterType
     * @param subgroup
     * @param sort
     * @param limit
     * @param promoted
     */
    function Aggregation(name, field, applicationType, filterType, subgroup, sort, limit, promoted) {
        this.subgroup = [];
        this.name = name;
        this.field = field;
        this.applicationType = applicationType;
        this.filterType = filterType;
        this.subgroup = subgroup;
        this.sort = sort;
        this.limit = limit;
        this.promoted = promoted;
    }
    /**
     * Get name
     *
     * @returns {string}
     */
    Aggregation.prototype.getName = function () {
        return this.name;
    };
    /**
     * Get field
     *
     * @returns {string}
     */
    Aggregation.prototype.getField = function () {
        return this.field;
    };
    /**
     * getApplicationType
     *
     * @returns {number}
     */
    Aggregation.prototype.getApplicationType = function () {
        return this.applicationType;
    };
    /**
     * Get filter type
     *
     * @return {string}
     */
    Aggregation.prototype.getFilterType = function () {
        return this.filterType;
    };
    /**
     * Get subgroup
     *
     * @return {[]}
     */
    Aggregation.prototype.getSubgroup = function () {
        return this.subgroup;
    };
    /**
     * Get sort
     *
     * @return {[]}
     */
    Aggregation.prototype.getSort = function () {
        return this.sort;
    };
    /**
     * Get limit
     *
     * @return {number}
     */
    Aggregation.prototype.getLimit = function () {
        return this.limit;
    };
    /**
     * Get promoted
     *
     * @return {[]}
     */
    Aggregation.prototype.getPromoted = function () {
        return this.promoted;
    };
    /**
     * Create
     *
     * @param name
     * @param field
     * @param applicationType
     * @param filterType
     * @param subgroup
     * @param sort
     * @param limit
     * @param promoted
     *
     * @returns {Aggregation}
     */
    Aggregation.create = function (name, field, applicationType, filterType, subgroup, sort, limit, promoted) {
        if (subgroup === void 0) { subgroup = []; }
        if (sort === void 0) { sort = exports.AGGREGATION_SORT_BY_COUNT_DESC; }
        if (limit === void 0) { limit = exports.AGGREGATION_NO_LIMIT; }
        if (promoted === void 0) { promoted = []; }
        return new Aggregation(name, field, applicationType, filterType, subgroup, sort, limit, promoted);
    };
    /**
     * To array
     *
     * @returns {Array}
     */
    Aggregation.prototype.toArray = function () {
        var aggregationAsArray = {
            name: this.name
        };
        if (this.field !== "uuid.type") {
            aggregationAsArray.field = this.field;
        }
        if (this.applicationType !== Filter_1.FILTER_AT_LEAST_ONE) {
            aggregationAsArray.application_type = this.applicationType;
        }
        if (this.filterType !== Filter_1.FILTER_TYPE_FIELD) {
            aggregationAsArray.filter_type = this.filterType;
        }
        if (this.subgroup.length > 0) {
            aggregationAsArray.subgroup = this.subgroup;
        }
        if (JSON.stringify(this.sort) !== JSON.stringify(exports.AGGREGATION_SORT_BY_COUNT_DESC)) {
            aggregationAsArray.sort = this.sort;
        }
        if (this.limit !== exports.AGGREGATION_NO_LIMIT) {
            aggregationAsArray.limit = this.limit;
        }
        if (this.promoted.length > 0) {
            aggregationAsArray.promoted = this.promoted;
        }
        return aggregationAsArray;
    };
    /**
     * Create from array
     *
     * @param array
     *
     * @returns {Aggregation}
     */
    Aggregation.createFromArray = function (array) {
        array = JSON.parse(JSON.stringify(array));
        if (typeof array.field === "undefined") {
            array.field = "uuid.type";
        }
        if (typeof array.application_type === "undefined") {
            array.application_type = Filter_1.FILTER_AT_LEAST_ONE;
        }
        if (typeof array.filter_type === "undefined") {
            array.filter_type = Filter_1.FILTER_TYPE_FIELD;
        }
        if (typeof array.subgroup === "undefined") {
            array.subgroup = [];
        }
        if (typeof array.sort === "undefined") {
            array.sort = exports.AGGREGATION_SORT_BY_COUNT_DESC;
        }
        if (typeof array.limit === "undefined") {
            array.limit = exports.AGGREGATION_NO_LIMIT;
        }
        if (typeof array.promoted === "undefined") {
            array.promoted = [];
        }
        return Aggregation.create(array.name, array.field, array.application_type, array.filter_type, array.subgroup, array.sort, array.limit, array.promoted);
    };
    return Aggregation;
}());
exports.Aggregation = Aggregation;


/***/ }),

/***/ "./node_modules/apisearch/lib/Query/Filter.js":
/*!****************************************************!*\
  !*** ./node_modules/apisearch/lib/Query/Filter.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.__esModule = true;
exports.Filter = exports.FILTER_TYPE_QUERY = exports.FILTER_TYPE_GEO = exports.FILTER_TYPE_DATE_RANGE = exports.FILTER_TYPE_RANGE = exports.FILTER_TYPE_FIELD = exports.FILTER_PROMOTE = exports.FILTER_EXCLUDE = exports.FILTER_AT_LEAST_ONE = exports.FILTER_MUST_ALL_WITH_LEVELS = exports.FILTER_MUST_ALL = void 0;
/**
 * filter constants
 */
exports.FILTER_MUST_ALL = 4;
exports.FILTER_MUST_ALL_WITH_LEVELS = 5;
exports.FILTER_AT_LEAST_ONE = 8;
exports.FILTER_EXCLUDE = 16;
exports.FILTER_PROMOTE = 32;
exports.FILTER_TYPE_FIELD = "field";
exports.FILTER_TYPE_RANGE = "range";
exports.FILTER_TYPE_DATE_RANGE = "date_range";
exports.FILTER_TYPE_GEO = "geo";
exports.FILTER_TYPE_QUERY = "query";
/**
 * Filter class
 */
var Filter = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param field
     * @param values
     * @param applicationType
     * @param filterType
     * @param filterTerms
     */
    function Filter(field, values, applicationType, filterType, filterTerms) {
        this.field = field;
        this.values = values;
        this.applicationType = applicationType;
        this.filterType = filterType;
        this.filterTerms = filterTerms;
    }
    /**
     * Get field
     *
     * @returns {string}
     */
    Filter.prototype.getField = function () {
        return this.field;
    };
    /**
     * Get values
     *
     * @returns {any}
     */
    Filter.prototype.getValues = function () {
        return this.values;
    };
    /**
     * Has value
     *
     * @param value
     *
     * @returns {boolean}
     */
    Filter.prototype.hasValue = function (value) {
        return typeof this.values[value] == "undefined";
    };
    /**
     * getApplicationType
     *
     * @returns {number}
     */
    Filter.prototype.getApplicationType = function () {
        return this.applicationType;
    };
    /**
     * Get filter type
     *
     * @return {string}
     */
    Filter.prototype.getFilterType = function () {
        return this.filterType;
    };
    /**
     * Get filter type
     *
     * @return {{}}
     */
    Filter.prototype.getFilterTerms = function () {
        return this.filterTerms;
    };
    /**
     * Create
     *
     * @param field
     * @param values
     * @param applicationType
     * @param filterType
     * @param filterTerms
     *
     * @return {Filter}
     */
    Filter.create = function (field, values, applicationType, filterType, filterTerms) {
        if (filterTerms === void 0) { filterTerms = []; }
        return new Filter(field, values, applicationType, filterType, filterTerms);
    };
    /**
     * To array
     *
     * @returns {Array}
     */
    Filter.prototype.toArray = function () {
        var filterAsArray = {};
        if (this.field != "uuid.type") {
            filterAsArray.field = this.field;
        }
        if (this.values.length > 0 ||
            Object.keys(this.values).length > 0) {
            filterAsArray.values = this.values;
        }
        if (this.applicationType != exports.FILTER_AT_LEAST_ONE) {
            filterAsArray.application_type = this.applicationType;
        }
        if (this.filterType != exports.FILTER_TYPE_FIELD) {
            filterAsArray.filter_type = this.filterType;
        }
        if (this.filterTerms.length > 0) {
            filterAsArray.filter_terms = this.filterTerms;
        }
        return filterAsArray;
    };
    /**
     * Create from array
     *
     * @param array
     *
     * @returns {Filter}
     */
    Filter.createFromArray = function (array) {
        array = JSON.parse(JSON.stringify(array));
        if (typeof array.field == "undefined") {
            array.field = "uuid.type";
        }
        if (typeof array.values == "undefined") {
            array.values = [];
        }
        if (typeof array.application_type == "undefined") {
            array.application_type = exports.FILTER_AT_LEAST_ONE;
        }
        if (typeof array.filter_type == "undefined") {
            array.filter_type = exports.FILTER_TYPE_FIELD;
        }
        if (typeof array.filter_terms == "undefined") {
            array.filter_terms = [];
        }
        return Filter.create(array.field, array.values, array.application_type, array.filter_type, array.filter_terms);
    };
    return Filter;
}());
exports.Filter = Filter;


/***/ }),

/***/ "./node_modules/apisearch/lib/Query/Query.js":
/*!***************************************************!*\
  !*** ./node_modules/apisearch/lib/Query/Query.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
exports.Query = exports.NO_MIN_SCORE = exports.QUERY_DEFAULT_SIZE = exports.QUERY_DEFAULT_PAGE = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var Coordinate_1 = __webpack_require__(/*! ../Model/Coordinate */ "./node_modules/apisearch/lib/Model/Coordinate.js");
var ItemUUID_1 = __webpack_require__(/*! ../Model/ItemUUID */ "./node_modules/apisearch/lib/Model/ItemUUID.js");
var Item_1 = __webpack_require__(/*! ../Model/Item */ "./node_modules/apisearch/lib/Model/Item.js");
var User_1 = __webpack_require__(/*! ../Model/User */ "./node_modules/apisearch/lib/Model/User.js");
var Aggregation_1 = __webpack_require__(/*! ./Aggregation */ "./node_modules/apisearch/lib/Query/Aggregation.js");
var Filter_1 = __webpack_require__(/*! ./Filter */ "./node_modules/apisearch/lib/Query/Filter.js");
var Filter_2 = __webpack_require__(/*! ./Filter */ "./node_modules/apisearch/lib/Query/Filter.js");
var Aggregation_2 = __webpack_require__(/*! ./Aggregation */ "./node_modules/apisearch/lib/Query/Aggregation.js");
var InvalidFormatError_1 = __webpack_require__(/*! ../Error/InvalidFormatError */ "./node_modules/apisearch/lib/Error/InvalidFormatError.js");
var Filter_3 = __webpack_require__(/*! ./Filter */ "./node_modules/apisearch/lib/Query/Filter.js");
var ScoreStrategies_1 = __webpack_require__(/*! ./ScoreStrategies */ "./node_modules/apisearch/lib/Query/ScoreStrategies.js");
var SortBy_1 = __webpack_require__(/*! ./SortBy */ "./node_modules/apisearch/lib/Query/SortBy.js");
var IndexUUID_1 = __webpack_require__(/*! ../Model/IndexUUID */ "./node_modules/apisearch/lib/Model/IndexUUID.js");
/**
 * Query constants
 */
exports.QUERY_DEFAULT_PAGE = 1;
exports.QUERY_DEFAULT_SIZE = 10;
exports.NO_MIN_SCORE = 0.0;
/**
 * Query class
 */
var Query = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param queryText
     */
    function Query(queryText) {
        this.UUID = null;
        this.fields = [];
        this.universeFilters = {};
        this.filters = {};
        this.itemsPromoted = [];
        this.aggregations = {};
        this.resultsEnabled = true;
        this.aggregationsEnabled = true;
        this.numberOfSuggestions = 0;
        this.highlightsEnabled = false;
        this.autocompleteEnabled = false;
        this.searchableFields = [];
        this.fuzziness = null;
        this.minScore = exports.NO_MIN_SCORE;
        this.metadata = {};
        this.subqueries = {};
        this.queryOperator = null;
        this.sortByInstance = SortBy_1.SortBy.create();
        this.filters._query = Filter_1.Filter.create("", [queryText], 0, Filter_3.FILTER_TYPE_QUERY);
    }
    /**
     * Created located
     *
     * @param coordinate
     * @param queryText
     * @param page
     * @param size
     *
     * @returns {Query}
     */
    Query.createLocated = function (coordinate, queryText, page, size) {
        if (page === void 0) { page = exports.QUERY_DEFAULT_PAGE; }
        if (size === void 0) { size = exports.QUERY_DEFAULT_SIZE; }
        var query = Query.create(queryText, page, size);
        query.coordinate = coordinate;
        return query;
    };
    /**
     * Create
     *
     * @param queryText
     * @param page
     * @param size
     *
     * @returns {Query}
     */
    Query.create = function (queryText, page, size) {
        if (page === void 0) { page = exports.QUERY_DEFAULT_PAGE; }
        if (size === void 0) { size = exports.QUERY_DEFAULT_SIZE; }
        page = Math.max(1, page);
        var query = new Query(queryText);
        query.from = (page - 1) * size;
        query.size = size;
        query.page = page;
        return query;
    };
    /**
     * Create match all
     *
     * @return {Query}
     */
    Query.createMatchAll = function () {
        return Query.create("", exports.QUERY_DEFAULT_PAGE, exports.QUERY_DEFAULT_SIZE);
    };
    /**
     * Create by UUID
     *
     * @param uuid
     *
     * @return {Query}
     */
    Query.createByUUID = function (uuid) {
        return Query.createByUUIDs(uuid);
    };
    /**
     * Create by UUIDs
     *
     * @param uuids
     *
     * @return {Query}
     */
    Query.createByUUIDs = function () {
        var uuids = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            uuids[_i] = arguments[_i];
        }
        var ids = [];
        for (var i in uuids) {
            ids.push(uuids[i].composedUUID());
        }
        var query = Query.create("", exports.QUERY_DEFAULT_PAGE, ids.length)
            .disableAggregations()
            .disableSuggestions();
        query.filters._id = Filter_1.Filter.create("_id", ids, Filter_2.FILTER_AT_LEAST_ONE, Filter_2.FILTER_TYPE_FIELD);
        return query;
    };
    /**
     * Create by UUIDs
     *
     * @param queries
     *
     * @return {Query}
     */
    Query.createMultiquery = function (queries) {
        var query = Query.createMatchAll();
        query.subqueries = queries;
        return query;
    };
    /**
     * set fields
     *
     * @param fields
     *
     * @return {Query}
     */
    Query.prototype.setFields = function (fields) {
        this.fields = fields;
        return this;
    };
    /**
     * get fields
     *
     * @return {string[]}
     */
    Query.prototype.getFields = function () {
        return this.fields;
    };
    /**
     * Filter universe by types
     *
     * @param values
     *
     * @return {Query}
     */
    Query.prototype.filterUniverseByTypes = function (values) {
        var _a;
        var fieldPath = Item_1.Item.getPathByField("type");
        if (values.length > 0) {
            this.universeFilters = tslib_1.__assign(tslib_1.__assign({}, this.universeFilters), (_a = {}, _a["type"] = Filter_1.Filter.create(fieldPath, values, Filter_2.FILTER_AT_LEAST_ONE, Filter_2.FILTER_TYPE_FIELD), _a));
        }
        else {
            delete this.universeFilters.type;
        }
        return this;
    };
    /**
     * Filter by types
     *
     * @param values
     * @param aggregate
     * @param aggregationSort
     *
     * @return {Query}
     */
    Query.prototype.filterByTypes = function (values, aggregate, aggregationSort) {
        var _a, _b;
        if (aggregate === void 0) { aggregate = true; }
        if (aggregationSort === void 0) { aggregationSort = Aggregation_2.AGGREGATION_SORT_BY_COUNT_DESC; }
        var fieldPath = Item_1.Item.getPathByField("type");
        if (values.length > 0) {
            this.filters = tslib_1.__assign(tslib_1.__assign({}, this.filters), (_a = {}, _a["type"] = Filter_1.Filter.create(fieldPath, values, Filter_2.FILTER_AT_LEAST_ONE, Filter_2.FILTER_TYPE_FIELD), _a));
        }
        else {
            delete this.filters.type;
        }
        if (aggregate) {
            this.aggregations = tslib_1.__assign(tslib_1.__assign({}, this.aggregations), (_b = {}, _b["type"] = Aggregation_1.Aggregation.create("type", fieldPath, Filter_2.FILTER_AT_LEAST_ONE, Filter_2.FILTER_TYPE_FIELD, [], aggregationSort), _b));
        }
        return this;
    };
    /**
     * Filter universe by ids
     *
     * @param values
     *
     * @return {Query}
     */
    Query.prototype.filterUniverseByIds = function (values) {
        var _a;
        var fieldPath = Item_1.Item.getPathByField("id");
        if (values.length > 0) {
            this.universeFilters = tslib_1.__assign(tslib_1.__assign({}, this.universeFilters), (_a = {}, _a["id"] = Filter_1.Filter.create(fieldPath, values, Filter_2.FILTER_AT_LEAST_ONE, Filter_2.FILTER_TYPE_FIELD), _a));
        }
        else {
            delete this.universeFilters.id;
        }
        return this;
    };
    /**
     * Filter by ids
     *
     * @param values
     *
     * @return {Query}
     */
    Query.prototype.filterByIds = function (values) {
        var _a;
        var fieldPath = Item_1.Item.getPathByField("id");
        if (values.length > 0) {
            this.filters = tslib_1.__assign(tslib_1.__assign({}, this.filters), (_a = {}, _a["id"] = Filter_1.Filter.create(fieldPath, values, Filter_2.FILTER_AT_LEAST_ONE, Filter_2.FILTER_TYPE_FIELD), _a));
        }
        else {
            delete this.filters.id;
        }
        return this;
    };
    /**
     * Filter universe by
     *
     * @param field
     * @param values
     * @param applicationType
     *
     * @return {Query}
     */
    Query.prototype.filterUniverseBy = function (field, values, applicationType) {
        var _a;
        if (applicationType === void 0) { applicationType = Filter_2.FILTER_AT_LEAST_ONE; }
        var fieldPath = Item_1.Item.getPathByField(field);
        if (values.length > 0) {
            this.universeFilters = tslib_1.__assign(tslib_1.__assign({}, this.universeFilters), (_a = {}, _a[field] = Filter_1.Filter.create(fieldPath, values, applicationType, Filter_2.FILTER_TYPE_FIELD), _a));
        }
        else {
            delete this.universeFilters[field];
        }
        return this;
    };
    /**
     * Filter by
     *
     * @param filterName
     * @param field
     * @param values
     * @param applicationType
     * @param aggregate
     * @param aggregationSort
     *
     * @return {Query}
     */
    Query.prototype.filterBy = function (filterName, field, values, applicationType, aggregate, aggregationSort) {
        var _a;
        if (applicationType === void 0) { applicationType = Filter_2.FILTER_AT_LEAST_ONE; }
        if (aggregate === void 0) { aggregate = true; }
        if (aggregationSort === void 0) { aggregationSort = Aggregation_2.AGGREGATION_SORT_BY_COUNT_DESC; }
        var fieldPath = Item_1.Item.getPathByField(field);
        if (values.length > 0) {
            this.filters = tslib_1.__assign(tslib_1.__assign({}, this.filters), (_a = {}, _a[filterName] = Filter_1.Filter.create(fieldPath, values, applicationType, Filter_2.FILTER_TYPE_FIELD), _a));
        }
        else {
            delete this.filters[filterName];
        }
        if (aggregate) {
            this.aggregateBy(filterName, field, applicationType, aggregationSort);
        }
        return this;
    };
    /**
     * Filter universe by range
     *
     * @param field
     * @param values
     * @param applicationType
     * @param rangeType
     *
     * @return {Query}
     */
    Query.prototype.filterUniverseByRange = function (field, values, applicationType, rangeType) {
        var _a;
        if (applicationType === void 0) { applicationType = Filter_2.FILTER_AT_LEAST_ONE; }
        if (rangeType === void 0) { rangeType = Filter_2.FILTER_TYPE_RANGE; }
        var fieldPath = Item_1.Item.getPathByField(field);
        if (values.length > 0) {
            this.universeFilters = tslib_1.__assign(tslib_1.__assign({}, this.universeFilters), (_a = {}, _a[field] = Filter_1.Filter.create(fieldPath, values, applicationType, rangeType), _a));
        }
        else {
            delete this.universeFilters[field];
        }
        return this;
    };
    /**
     * Filter universe by date range
     *
     * @param field
     * @param values
     * @param applicationType
     *
     * @return {Query}
     */
    Query.prototype.filterUniverseByDateRange = function (field, values, applicationType) {
        if (applicationType === void 0) { applicationType = Filter_2.FILTER_AT_LEAST_ONE; }
        return this.filterUniverseByRange(field, values, applicationType, Filter_2.FILTER_TYPE_DATE_RANGE);
    };
    /**
     * Filter by range
     *
     * @param filterName
     * @param field
     * @param ranges
     * @param values
     * @param applicationType
     * @param rangeType
     * @param aggregate
     * @param aggregationSort
     *
     * @return {Query}
     */
    Query.prototype.filterByRange = function (filterName, field, ranges, values, applicationType, rangeType, aggregate, aggregationSort) {
        var _a;
        if (applicationType === void 0) { applicationType = Filter_2.FILTER_AT_LEAST_ONE; }
        if (rangeType === void 0) { rangeType = Filter_2.FILTER_TYPE_RANGE; }
        if (aggregate === void 0) { aggregate = true; }
        if (aggregationSort === void 0) { aggregationSort = Aggregation_2.AGGREGATION_SORT_BY_COUNT_DESC; }
        var fieldPath = Item_1.Item.getPathByField(field);
        if (values.length !== 0) {
            this.filters = tslib_1.__assign(tslib_1.__assign({}, this.filters), (_a = {}, _a[filterName] = Filter_1.Filter.create(fieldPath, values, applicationType, rangeType), _a));
        }
        else {
            delete this.filters[filterName];
        }
        if (aggregate) {
            this.aggregateByRange(filterName, fieldPath, ranges, applicationType, rangeType, aggregationSort);
        }
        return this;
    };
    /**
     * Filter by date range
     *
     * @param filterName
     * @param field
     * @param options
     * @param values
     * @param applicationType
     * @param aggregate
     * @param aggregationSort
     *
     * @return {Query}
     */
    Query.prototype.filterByDateRange = function (filterName, field, options, values, applicationType, aggregate, aggregationSort) {
        if (applicationType === void 0) { applicationType = Filter_2.FILTER_AT_LEAST_ONE; }
        if (aggregate === void 0) { aggregate = true; }
        if (aggregationSort === void 0) { aggregationSort = Aggregation_2.AGGREGATION_SORT_BY_COUNT_DESC; }
        return this.filterByRange(filterName, field, options, values, applicationType, Filter_2.FILTER_TYPE_DATE_RANGE, aggregate, aggregationSort);
    };
    /**
     * Filter universe by location
     *
     * @param locationRange
     *
     * @return {Query}
     */
    Query.prototype.filterUniverseByLocation = function (locationRange) {
        var _a;
        this.universeFilters = tslib_1.__assign(tslib_1.__assign({}, this.universeFilters), (_a = {}, _a["coordinate"] = Filter_1.Filter.create("coordinate", locationRange.toArray(), Filter_2.FILTER_AT_LEAST_ONE, Filter_2.FILTER_TYPE_GEO), _a));
        return this;
    };
    /**
     * Set filter fields
     *
     * @param searchableFields
     *
     * @return {Query}
     */
    Query.prototype.setSearchableFields = function (searchableFields) {
        this.searchableFields = searchableFields;
        return this;
    };
    /**
     * Get filter fields
     *
     * @return {string[]}
     */
    Query.prototype.getSearchableFields = function () {
        return this.searchableFields;
    };
    /**
     * Sort by
     *
     * @param sortBy
     *
     * @return {Query}
     */
    Query.prototype.sortBy = function (sortBy) {
        if (sortBy.isSortedByGeoDistance()) {
            if (!(this.coordinate instanceof Coordinate_1.Coordinate)) {
                throw InvalidFormatError_1.InvalidFormatError.querySortedByDistanceWithoutCoordinate();
            }
            sortBy.setCoordinate(this.coordinate);
        }
        this.sortByInstance = sortBy;
        return this;
    };
    /**
     * Aggregate by
     *
     * @param filterName
     * @param field
     * @param applicationType
     * @param aggregationSort
     * @param limit
     * @param promoted
     *
     * @return {Query}
     */
    Query.prototype.aggregateBy = function (filterName, field, applicationType, aggregationSort, limit, promoted) {
        var _a;
        if (aggregationSort === void 0) { aggregationSort = Aggregation_2.AGGREGATION_SORT_BY_COUNT_DESC; }
        if (limit === void 0) { limit = Aggregation_2.AGGREGATION_NO_LIMIT; }
        if (promoted === void 0) { promoted = []; }
        this.aggregations = tslib_1.__assign(tslib_1.__assign({}, this.aggregations), (_a = {}, _a[filterName] = Aggregation_1.Aggregation.create(filterName, Item_1.Item.getPathByField(field), applicationType, Filter_2.FILTER_TYPE_FIELD, [], aggregationSort, limit, promoted), _a));
        return this;
    };
    /**
     * Aggregate by range
     *
     * @param filterName
     * @param field
     * @param ranges
     * @param applicationType
     * @param rangeType
     * @param aggregationSort
     * @param limit
     * @param promoted
     *
     * @return {Query}
     */
    Query.prototype.aggregateByRange = function (filterName, field, ranges, applicationType, rangeType, aggregationSort, limit, promoted) {
        var _a;
        if (rangeType === void 0) { rangeType = Filter_2.FILTER_TYPE_RANGE; }
        if (aggregationSort === void 0) { aggregationSort = Aggregation_2.AGGREGATION_SORT_BY_COUNT_DESC; }
        if (limit === void 0) { limit = Aggregation_2.AGGREGATION_NO_LIMIT; }
        if (promoted === void 0) { promoted = []; }
        if (ranges.length === 0) {
            return this;
        }
        this.aggregations = tslib_1.__assign(tslib_1.__assign({}, this.aggregations), (_a = {}, _a[filterName] = Aggregation_1.Aggregation.create(filterName, Item_1.Item.getPathByField(field), applicationType, rangeType, ranges, aggregationSort, limit, promoted), _a));
        return this;
    };
    /**
     * Aggregate by date range
     *
     * @param filterName
     * @param field
     * @param options
     * @param applicationType
     * @param aggregationSort
     * @param limit
     * @param promoted
     *
     * @return {Query}
     */
    Query.prototype.aggregateByDateRange = function (filterName, field, options, applicationType, aggregationSort, limit, promoted) {
        if (aggregationSort === void 0) { aggregationSort = Aggregation_2.AGGREGATION_SORT_BY_COUNT_DESC; }
        if (limit === void 0) { limit = Aggregation_2.AGGREGATION_NO_LIMIT; }
        if (promoted === void 0) { promoted = []; }
        return this.aggregateByRange(filterName, field, options, applicationType, Filter_2.FILTER_TYPE_DATE_RANGE, aggregationSort, limit, promoted);
    };
    /**
     * Get aggregations
     *
     * @return {{}}
     */
    Query.prototype.getAggregations = function () {
        return this.aggregations;
    };
    /**
     * Get aggregation by name
     *
     * @param aggregationName
     *
     * @return {Aggregation|null}
     */
    Query.prototype.getAggregation = function (aggregationName) {
        return this.aggregations[aggregationName] instanceof Aggregation_1.Aggregation
            ? this.aggregations[aggregationName]
            : null;
    };
    /**
     * Get query text
     *
     * @return {string}
     */
    Query.prototype.getQueryText = function () {
        var filter = this.filters._query;
        return filter instanceof Filter_1.Filter
            ? filter.getValues()[0]
            : "";
    };
    /**
     * Get universe filters
     *
     * @return {{}}
     */
    Query.prototype.getUniverseFilters = function () {
        return this.universeFilters;
    };
    /**
     * Get universe filter by name
     *
     * @param filterName
     *
     * @return {Filter|null}
     */
    Query.prototype.getUniverseFilter = function (filterName) {
        return this.universeFilters[filterName] instanceof Filter_1.Filter
            ? this.universeFilters[filterName]
            : null;
    };
    /**
     * Get filters
     *
     * @return {{}}
     */
    Query.prototype.getFilters = function () {
        return this.filters;
    };
    /**
     * Get filter by name
     *
     * @param filterName
     *
     * @return {Filter|null}
     */
    Query.prototype.getFilter = function (filterName) {
        return this.filters[filterName] instanceof Filter_1.Filter
            ? this.filters[filterName]
            : null;
    };
    /**
     * Get filter by field
     *
     * @param fieldName
     *
     * @return {Filter|null}
     */
    Query.prototype.getFilterByField = function (fieldName) {
        var fieldPath = Item_1.Item.getPathByField(fieldName);
        for (var i in this.filters) {
            if (this.filters[i].getField() == fieldPath) {
                return this.filters[i];
            }
        }
        return null;
    };
    /**
     * Get sort by
     *
     * @return {SortBy}
     */
    Query.prototype.getSortBy = function () {
        return this.sortByInstance;
    };
    /**
     * Get from
     *
     * @return {number}
     */
    Query.prototype.getFrom = function () {
        return this.from;
    };
    /**
     * Get size
     *
     * @return {number}
     */
    Query.prototype.getSize = function () {
        return this.size;
    };
    /**
     * Get page
     *
     * @return {number}
     */
    Query.prototype.getPage = function () {
        return this.page;
    };
    /**
     * Enable results
     *
     * @return {Query}
     */
    Query.prototype.enableResults = function () {
        this.resultsEnabled = true;
        return this;
    };
    /**
     * Disable results
     *
     * @return {Query}
     */
    Query.prototype.disableResults = function () {
        this.resultsEnabled = false;
        return this;
    };
    /**
     * Are results enabled
     *
     * @return {boolean}
     */
    Query.prototype.areResultsEnabled = function () {
        return this.resultsEnabled;
    };
    /**
     * Enable aggregations
     *
     * @return {Query}
     */
    Query.prototype.enableAggregations = function () {
        this.aggregationsEnabled = true;
        return this;
    };
    /**
     * Disable aggregations
     *
     * @return {Query}
     */
    Query.prototype.disableAggregations = function () {
        this.aggregationsEnabled = false;
        return this;
    };
    /**
     * Are aggregations enabled
     *
     * @return {boolean}
     */
    Query.prototype.areAggregationsEnabled = function () {
        return this.aggregationsEnabled;
    };
    /**
     * Set number of suggestions
     *
     * @param numberOfSuggestions
     *
     * @return {Query}
     */
    Query.prototype.setNumberOfSuggestions = function (numberOfSuggestions) {
        this.numberOfSuggestions = numberOfSuggestions;
        return this;
    };
    /**
     * Disable suggestions
     *
     * @return {Query}
     */
    Query.prototype.disableSuggestions = function () {
        this.numberOfSuggestions = 0;
        return this;
    };
    /**
     * Get number of suggestions
     *
     * @return {number}
     */
    Query.prototype.getNumberOfSuggestions = function () {
        return this.numberOfSuggestions;
    };
    /**
     * Enable autocomplete
     *
     * @return {Query}
     */
    Query.prototype.enableAutocomplete = function () {
        this.autocompleteEnabled = true;
        return this;
    };
    /**
     * Disable autocomplete
     *
     * @return {Query}
     */
    Query.prototype.disableAutocomplete = function () {
        this.autocompleteEnabled = false;
        return this;
    };
    /**
     * Are autocomplete enabled
     *
     * @return {boolean}
     */
    Query.prototype.areAutocompleteEnabled = function () {
        return this.autocompleteEnabled;
    };
    /**
     * Enable highlights
     *
     * @return {Query}
     */
    Query.prototype.enableHighlights = function () {
        this.highlightsEnabled = true;
        return this;
    };
    /**
     * Disable highlights
     *
     * @return {Query}
     */
    Query.prototype.disableHighlights = function () {
        this.highlightsEnabled = false;
        return this;
    };
    /**
     * Are highlights enabled
     *
     * @return {boolean}
     */
    Query.prototype.areHighlightsEnabled = function () {
        return this.highlightsEnabled;
    };
    /**
     * Promote uuid
     *
     * @param itemUUID
     *
     * @return {Query}
     */
    Query.prototype.promoteUUID = function (itemUUID) {
        this
            .itemsPromoted
            .push(itemUUID);
        return this;
    };
    /**
     * Promote UUIDs
     *
     * @param uuids
     *
     * @return {Query}
     */
    Query.prototype.promoteUUIDs = function () {
        var uuids = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            uuids[_i] = arguments[_i];
        }
        this.itemsPromoted = uuids;
        return this;
    };
    /**
     * Get promoted UUIDs
     *
     * @return {ItemUUID[]}
     */
    Query.prototype.getItemsPromoted = function () {
        return this.itemsPromoted;
    };
    /**
     * Exclude id
     *
     * @param itemUUID
     *
     * @return {Query}
     */
    Query.prototype.excludeUUID = function (itemUUID) {
        this.excludeUUIDs(itemUUID);
        return this;
    };
    /**
     * Exclude UUIDs
     *
     * @param uuids
     *
     * @return {Query}
     */
    Query.prototype.excludeUUIDs = function () {
        var _a;
        var uuids = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            uuids[_i] = arguments[_i];
        }
        this.filters = tslib_1.__assign(tslib_1.__assign({}, this.filters), (_a = {}, _a["excluded_ids"] = Filter_1.Filter.create("_id", uuids.map(function (uuid) { return uuid.composedUUID(); }), Filter_2.FILTER_EXCLUDE, Filter_2.FILTER_TYPE_FIELD), _a));
        return this;
    };
    /**
     * Get score strategies
     *
     * @return {ScoreStrategies}
     */
    Query.prototype.getScoreStrategies = function () {
        return this.scoreStrategies;
    };
    /**
     * Set score strategies
     *
     * @param scoreStrategies
     */
    Query.prototype.setScoreStrategies = function (scoreStrategies) {
        this.scoreStrategies = scoreStrategies;
        return this;
    };
    /**
     * Get fuzziness
     *
     * @return any
     */
    Query.prototype.getFuzziness = function () {
        return this.fuzziness;
    };
    /**
     * Set fuzziness
     *
     * @param fuzziness
     *
     * @return {Query}
     */
    Query.prototype.setFuzziness = function (fuzziness) {
        this.fuzziness = fuzziness;
        return this;
    };
    /**
     * Set auto fuzziness
     *
     * @return {Query}
     */
    Query.prototype.setAutoFuzziness = function () {
        this.fuzziness = 'AUTO';
        return this;
    };
    /**
     * Get min score
     *
     * @return any
     */
    Query.prototype.getMinScore = function () {
        return this.minScore;
    };
    /**
     * Set min score
     *
     * @param minScore
     *
     * @return {Query}
     */
    Query.prototype.setMinScore = function (minScore) {
        this.minScore = minScore;
        return this;
    };
    /**
     * By user
     *
     * @param user
     *
     * @return {Query}
     */
    Query.prototype.byUser = function (user) {
        this.user = user;
        return this;
    };
    /**
     * By anyone
     *
     * @return {null}
     */
    Query.prototype.anonymously = function () {
        this.user = null;
        return null;
    };
    /**
     * Get user
     *
     * @return {User}
     */
    Query.prototype.getUser = function () {
        return this.user;
    };
    /**
     * set metadata value
     *
     * @param name
     * @param value
     *
     * @return {Query}
     */
    Query.prototype.setMetadataValue = function (name, value) {
        this.metadata[name] = value;
        return this;
    };
    /**
     * Get metadata
     *
     * @return any
     */
    Query.prototype.getMetadata = function () {
        return this.metadata;
    };
    /**
     * Add subquery
     *
     * @param name
     * @param subquery
     *
     * @return {Query}
     */
    Query.prototype.addSubquery = function (name, subquery) {
        this.subqueries[name] = subquery;
        return this;
    };
    /**
     * Get subqueries
     *
     * @return {Object}
     */
    Query.prototype.getSubqueries = function () {
        return this.subqueries;
    };
    /**
     * Identify it
     *
     * @param UUID
     *
     * @return {Query}
     */
    Query.prototype.identifyWith = function (UUID) {
        this.UUID = UUID;
        return this;
    };
    /**
     * Get identification
     *
     * @return {string|null}
     */
    Query.prototype.getUUID = function () {
        return this.UUID;
    };
    /**
     * Force Index UUID.
     *
     * @param indexUUID
     *
     * @return {Query}
     */
    Query.prototype.forceIndexUUID = function (indexUUID) {
        this.indexUUID = indexUUID;
        return this;
    };
    /**
     * Get IndexUUID
     *
     * @return {IndexUUID|null}
     */
    Query.prototype.getIndexUUID = function () {
        return this.indexUUID;
    };
    Query.prototype.setQueryOperator = function (queryOperator) {
        this.queryOperator = queryOperator;
        return this;
    };
    Query.prototype.getQueryOperator = function () {
        return this.queryOperator;
    };
    /**
     * To array
     *
     * @return {any}
     */
    Query.prototype.toArray = function () {
        var array = {};
        if (this.UUID !== null) {
            array.UUID = this.UUID;
        }
        if (this.getQueryText() !== "") {
            array.q = this.getQueryText();
        }
        if (this.coordinate instanceof Coordinate_1.Coordinate) {
            array.coordinate = this.coordinate.toArray();
        }
        /**
         * Fields
         */
        if (this.fields instanceof Array &&
            this.fields.length > 0) {
            array.fields = this.fields;
        }
        /**
         * Universe Filters
         */
        if (Object.keys(this.universeFilters).length) {
            array.universe_filters = {};
            for (var i in this.universeFilters) {
                var universeFilter = this.universeFilters[i];
                array.universe_filters[i] = universeFilter.toArray();
            }
        }
        /**
         * Filters
         */
        if (this.filters instanceof Object &&
            Object.keys(this.filters).length) {
            var filters = {};
            for (var i in this.filters) {
                var filter = this.filters[i];
                if (filter.getFilterType() !== Filter_3.FILTER_TYPE_QUERY) {
                    filters[i] = filter.toArray();
                }
            }
            if (Object.keys(filters).length > 0) {
                array.filters = filters;
            }
        }
        /**
         * Aggregations
         */
        if (this.aggregations instanceof Object &&
            Object.keys(this.aggregations).length) {
            array.aggregations = {};
            for (var i in this.aggregations) {
                var aggregation = this.aggregations[i];
                array.aggregations[i] = aggregation.toArray();
            }
        }
        /**
         * Sort
         */
        var sort = this.sortByInstance.toArray();
        if (Object.keys(sort).length) {
            array.sort = sort;
        }
        /**
         * Page
         */
        var page = this.page;
        if (page !== exports.QUERY_DEFAULT_PAGE) {
            array.page = page;
        }
        /**
         * Size
         */
        var size = this.size;
        if (size !== exports.QUERY_DEFAULT_SIZE) {
            array.size = size;
        }
        /**
         * Booleans
         */
        if (this.resultsEnabled === false) {
            array.results_enabled = false;
        }
        if (this.autocompleteEnabled === true) {
            array.autocomplete_enabled = true;
        }
        if (this.numberOfSuggestions !== 0) {
            array.number_of_suggestions = this.numberOfSuggestions;
        }
        if (this.highlightsEnabled === true) {
            array.highlight_enabled = true;
        }
        if (this.aggregationsEnabled === false) {
            array.aggregations_enabled = false;
        }
        /**
         * Filter fields
         */
        if (this.searchableFields instanceof Array &&
            this.searchableFields.length > 0) {
            array.searchable_fields = this.searchableFields;
        }
        /**
         * Score strategies
         */
        if (this.scoreStrategies instanceof ScoreStrategies_1.ScoreStrategies) {
            var scoreStrategiesAsArray = this.scoreStrategies.toArray();
            if (Object.keys(scoreStrategiesAsArray).length > 0) {
                array.score_strategies = scoreStrategiesAsArray;
            }
        }
        if (this.fuzziness !== null) {
            array.fuzziness = this.fuzziness;
        }
        /**
         * Min score
         */
        var minScore = this.minScore;
        if (minScore !== exports.NO_MIN_SCORE) {
            array.min_score = minScore;
        }
        /**
         * User
         */
        if (this.user instanceof User_1.User) {
            array.user = this.user.toArray();
        }
        if (Object.keys(this.metadata).length > 0) {
            array.metadata = this.metadata;
        }
        if (this.subqueries instanceof Object &&
            Object.keys(this.subqueries).length) {
            array.subqueries = {};
            for (var i in this.subqueries) {
                var subquery = this.subqueries[i];
                array.subqueries[i] = subquery.toArray();
            }
        }
        if (this.indexUUID instanceof IndexUUID_1.IndexUUID) {
            array.index_uuid = this.indexUUID.toArray();
        }
        /**
         * items promoted
         */
        if (this.itemsPromoted.length > 0) {
            array.items_promoted = [];
            for (var i in this.itemsPromoted) {
                array
                    .items_promoted
                    .push(this.itemsPromoted[i].toArray());
            }
        }
        if (this.queryOperator !== "or" && this.queryOperator !== null) {
            array.query_operator = this.queryOperator;
        }
        return array;
    };
    /**
     * Create from array
     *
     * @param array
     *
     * @returns {Query}
     */
    Query.createFromArray = function (array) {
        var query = array.coordinate instanceof Object
            ? Query.createLocated(Coordinate_1.Coordinate.createFromArray(array.coordinate), array.q ? array.q : "", array.page ? array.page : exports.QUERY_DEFAULT_PAGE, array.size ? array.size : exports.QUERY_DEFAULT_SIZE)
            : Query.create(array.q ? array.q : "", array.page ? array.page : exports.QUERY_DEFAULT_PAGE, array.size ? array.size : exports.QUERY_DEFAULT_SIZE);
        query.UUID = typeof array.UUID === typeof ""
            ? array.UUID
            : undefined;
        /**
         * Fields
         */
        query.fields = array.fields instanceof Array
            ? array.fields
            : [];
        /**
         * Aggregations
         */
        var aggregationsAsArray = typeof array.aggregations === typeof {}
            ? array.aggregations
            : {};
        for (var i in aggregationsAsArray) {
            query.aggregations[i] = Aggregation_1.Aggregation.createFromArray(aggregationsAsArray[i]);
        }
        /**
         * Sort
         */
        var sortAsArray = typeof array.sort === typeof {}
            ? array.sort
            : {};
        if (Object.keys(sortAsArray).length > 0) {
            query.sortByInstance = SortBy_1.SortBy.createFromArray(sortAsArray);
        }
        /**
         * Filters
         */
        var filtersAsArray = typeof array.filters === typeof {}
            ? array.filters
            : {};
        for (var i in filtersAsArray) {
            query.filters[i] = Filter_1.Filter.createFromArray(filtersAsArray[i]);
        }
        /**
         * Universe Filters
         */
        var universeFiltersAsArray = typeof array.universe_filters === typeof {}
            ? array.universe_filters
            : {};
        for (var i in universeFiltersAsArray) {
            query.universeFilters[i] = Filter_1.Filter.createFromArray(universeFiltersAsArray[i]);
        }
        /**
         * Booleans
         */
        query.resultsEnabled = typeof array.results_enabled === "boolean"
            ? array.results_enabled
            : true;
        query.numberOfSuggestions = typeof array.number_of_suggestions === "number"
            ? array.number_of_suggestions
            : 0;
        query.autocompleteEnabled = typeof array.autocomplete_enabled === "boolean"
            ? array.autocomplete_enabled
            : false;
        query.aggregationsEnabled = typeof array.aggregations_enabled === "boolean"
            ? array.aggregations_enabled
            : true;
        query.highlightsEnabled = typeof array.highlight_enabled === "boolean"
            ? array.highlight_enabled
            : false;
        query.fuzziness = array.fuzziness ? array.fuzziness : null;
        query.minScore = array.min_score ? array.min_score : exports.NO_MIN_SCORE;
        /**
         * Items promoted
         */
        var itemsPromotedAsArray = typeof array.items_promoted === typeof {}
            ? array.items_promoted
            : {};
        for (var i in itemsPromotedAsArray) {
            query
                .itemsPromoted
                .push(ItemUUID_1.ItemUUID.createFromArray(itemsPromotedAsArray[i]));
        }
        /**
         * Subqueries
         */
        var subqueriesAsArray = typeof array.subqueries === typeof {}
            ? array.subqueries
            : {};
        for (var i in subqueriesAsArray) {
            query.subqueries[i] = Query.createFromArray(subqueriesAsArray[i]);
        }
        /**
         * Filter fields
         */
        query.metadata = typeof array.metadata === typeof {}
            ? array.metadata
            : {};
        query.searchableFields = array.searchable_fields instanceof Array
            ? array.searchable_fields
            : [];
        query.scoreStrategies = array.score_strategies instanceof Object
            ? ScoreStrategies_1.ScoreStrategies.createFromArray(array.score_strategies)
            : undefined;
        query.user = array.user instanceof Object
            ? User_1.User.createFromArray(array.user)
            : undefined;
        query.indexUUID = array.index_uuid instanceof Object
            ? IndexUUID_1.IndexUUID.createFromArray(array.index_uuid)
            : undefined;
        query.queryOperator = typeof array.query_operator === "string"
            ? array.query_operator
            : "or";
        return query;
    };
    return Query;
}());
exports.Query = Query;


/***/ }),

/***/ "./node_modules/apisearch/lib/Query/Range.js":
/*!***************************************************!*\
  !*** ./node_modules/apisearch/lib/Query/Range.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.__esModule = true;
exports.Range = exports.RANGE_SEPARATOR = exports.RANGE_INFINITE = exports.RANGE_MINUS_INFINITE = void 0;
/**
 * Aggregation constants
 */
exports.RANGE_MINUS_INFINITE = null;
exports.RANGE_INFINITE = null;
exports.RANGE_SEPARATOR = "..";
/**
 * Filter class
 */
var Range = /** @class */ (function () {
    function Range() {
    }
    /**
     * Strong to array
     *
     * @param string
     *
     * @returns {[number, number]}
     */
    Range.stringToArray = function (string) {
        var parts = string.split(exports.RANGE_SEPARATOR);
        var from = parts[0];
        var to = parts[1];
        var finalFrom = exports.RANGE_MINUS_INFINITE;
        var finalTo = exports.RANGE_INFINITE;
        if (from != "") {
            finalFrom = parseInt(from);
        }
        if (to != "") {
            finalTo = parseInt(to);
        }
        return [finalFrom, finalTo];
    };
    /**
     * Array to string
     *
     * @param values
     *
     * @return {string}
     */
    Range.arrayToString = function (values) {
        var finalValues = ["", ""];
        if (values[0] != exports.RANGE_MINUS_INFINITE) {
            finalValues[0] = String(values[0]);
        }
        if (values[1] != exports.RANGE_INFINITE) {
            finalValues[1] = String(values[1]);
        }
        return finalValues.join(exports.RANGE_SEPARATOR);
    };
    /**
     * Create ranges
     *
     * @param from
     * @param to
     * @param incremental
     */
    Range.createRanges = function (from, to, incremental) {
        var ranges = [];
        var nextTo;
        while (from < to) {
            nextTo = from + incremental;
            ranges.push(from + exports.RANGE_SEPARATOR + nextTo);
            from = nextTo;
        }
        return ranges;
    };
    return Range;
}());
exports.Range = Range;


/***/ }),

/***/ "./node_modules/apisearch/lib/Query/ScoreStrategies.js":
/*!*************************************************************!*\
  !*** ./node_modules/apisearch/lib/Query/ScoreStrategies.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
exports.ScoreStrategies = exports.MIN = exports.MAX = exports.AVG = exports.SUM = exports.MULTIPLY = void 0;
var ScoreStrategy_1 = __webpack_require__(/*! ./ScoreStrategy */ "./node_modules/apisearch/lib/Query/ScoreStrategy.js");
/**
 * ScoreStrategies constants
 */
exports.MULTIPLY = 'multiply';
exports.SUM = 'sum';
exports.AVG = 'avg';
exports.MAX = 'max';
exports.MIN = 'min';
/**
 * ScoreStrategies
 */
var ScoreStrategies = /** @class */ (function () {
    function ScoreStrategies() {
        this.scoreStrategies = [];
    }
    /**
     * Create empty
     *
     * @param scoreMode
     *
     * @return {ScoreStrategies}
     */
    ScoreStrategies.createEmpty = function (scoreMode) {
        if (scoreMode === void 0) { scoreMode = exports.SUM; }
        var scoreStrategies = new ScoreStrategies;
        scoreStrategies.scoreMode = scoreMode;
        return scoreStrategies;
    };
    /**
     * Add score strategy
     *
     * @param scoreStrategy
     *
     * @return {ScoreStrategies}
     */
    ScoreStrategies.prototype.addScoreStrategy = function (scoreStrategy) {
        this.scoreStrategies.push(scoreStrategy);
        return this;
    };
    /**
     * Get score strategies
     *
     * @return {ScoreStrategy[]}
     */
    ScoreStrategies.prototype.getScoreStrategies = function () {
        return this.scoreStrategies;
    };
    /**
     * Get score mode
     *
     * @return {string}
     */
    ScoreStrategies.prototype.getScoreMode = function () {
        return this.scoreMode;
    };
    /**
     * To array
     *
     * @return {{
     *      score_mode: string,
     *      score_strategies: any
     * }}
     */
    ScoreStrategies.prototype.toArray = function () {
        var scoreStrategiesAsArray = [];
        for (var i in this.scoreStrategies) {
            scoreStrategiesAsArray.push(this.scoreStrategies[i].toArray());
        }
        return {
            score_mode: this.scoreMode,
            score_strategies: scoreStrategiesAsArray
        };
    };
    /**
     * Create from array
     *
     * @param array
     *
     * @return {ScoreStrategies}
     */
    ScoreStrategies.createFromArray = function (array) {
        array = JSON.parse(JSON.stringify(array));
        var scoreStrategies = (typeof array.score_mode != "undefined")
            ? ScoreStrategies.createEmpty(array.score_mode)
            : ScoreStrategies.createEmpty();
        scoreStrategies.scoreStrategies = [];
        for (var i in array.score_strategies) {
            scoreStrategies
                .scoreStrategies
                .push(ScoreStrategy_1.ScoreStrategy.createFromArray(array.score_strategies[i]));
        }
        return scoreStrategies;
    };
    return ScoreStrategies;
}());
exports.ScoreStrategies = ScoreStrategies;


/***/ }),

/***/ "./node_modules/apisearch/lib/Query/ScoreStrategy.js":
/*!***********************************************************!*\
  !*** ./node_modules/apisearch/lib/Query/ScoreStrategy.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
exports.ScoreStrategy = exports.DEFAULT_FACTOR = exports.DEFAULT_MISSING = exports.SCORE_MODE_MIN = exports.SCORE_MODE_MAX = exports.SCORE_MODE_AVG = exports.SCORE_MODE_SUM = exports.SCORE_MODE_NONE = exports.MODIFIER_SQUARE = exports.MODIFIER_LN = exports.MODIFIER_LOG = exports.MODIFIER_SQRT = exports.MODIFIER_NONE = exports.DECAY_GAUSS = exports.DECAY_EXP = exports.DECAY_LINEAR = exports.DECAY = exports.CUSTOM_FUNCTION = exports.BOOSTING_FIELD_VALUE = exports.DEFAULT_WEIGHT = exports.DEFAULT_TYPE = void 0;
var Item_1 = __webpack_require__(/*! ../Model/Item */ "./node_modules/apisearch/lib/Model/Item.js");
var Filter_1 = __webpack_require__(/*! ./Filter */ "./node_modules/apisearch/lib/Query/Filter.js");
/**
 * ScoreStrategy constants
 */
exports.DEFAULT_TYPE = 'default';
exports.DEFAULT_WEIGHT = 1.0;
exports.BOOSTING_FIELD_VALUE = 'field_value';
exports.CUSTOM_FUNCTION = 'custom_function';
exports.DECAY = 'decay';
exports.DECAY_LINEAR = 'linear';
exports.DECAY_EXP = 'exp';
exports.DECAY_GAUSS = 'gauss';
exports.MODIFIER_NONE = 'none';
exports.MODIFIER_SQRT = 'sqrt';
exports.MODIFIER_LOG = 'log';
exports.MODIFIER_LN = 'ln';
exports.MODIFIER_SQUARE = 'square';
exports.SCORE_MODE_NONE = 'none';
exports.SCORE_MODE_SUM = 'sum';
exports.SCORE_MODE_AVG = 'avg';
exports.SCORE_MODE_MAX = 'max';
exports.SCORE_MODE_MIN = 'min';
exports.DEFAULT_MISSING = 1.0;
exports.DEFAULT_FACTOR = 1.0;
/**
 * ScoreStrategy
 */
var ScoreStrategy = /** @class */ (function () {
    function ScoreStrategy() {
        this.type = exports.DEFAULT_TYPE;
        this.filter = null;
        this.weight = exports.DEFAULT_WEIGHT;
        this.scoreMode = exports.SCORE_MODE_AVG;
        this.configuration = {};
    }
    /**
     * Get type
     *
     * @returns {string}
     */
    ScoreStrategy.prototype.getType = function () {
        return this.type;
    };
    /**
     * Get configuration value
     *
     * @returns {string}
     */
    ScoreStrategy.prototype.getConfigurationValue = function (element) {
        if (typeof this.configuration[element] == "undefined") {
            return null;
        }
        return this.configuration[element];
    };
    /**
     * Get weight.
     *
     * @return {number}
     */
    ScoreStrategy.prototype.getWeight = function () {
        return this.weight;
    };
    /**
     * Get score mode.
     *
     * @return {string}
     */
    ScoreStrategy.prototype.getScoreMode = function () {
        return this.scoreMode;
    };
    /**
     * Get filter.
     *
     * @return {Filter}
     */
    ScoreStrategy.prototype.getFilter = function () {
        return this.filter;
    };
    /**
     * Create default
     *
     * @return {ScoreStrategy}
     */
    ScoreStrategy.createDefault = function () {
        return new ScoreStrategy();
    };
    /**
     * Create field boosting
     *
     * @param field
     * @param factor
     * @param missing
     * @param modifier
     * @param weight
     * @param filter
     * @param scoreMode
     *
     * @return {ScoreStrategy}
     */
    ScoreStrategy.createFieldBoosting = function (field, factor, missing, modifier, weight, filter, scoreMode) {
        if (factor === void 0) { factor = exports.DEFAULT_FACTOR; }
        if (missing === void 0) { missing = exports.DEFAULT_MISSING; }
        if (modifier === void 0) { modifier = exports.MODIFIER_NONE; }
        if (weight === void 0) { weight = exports.DEFAULT_WEIGHT; }
        if (filter === void 0) { filter = null; }
        if (scoreMode === void 0) { scoreMode = exports.SCORE_MODE_AVG; }
        var scoreStrategy = ScoreStrategy.createDefault();
        scoreStrategy.type = exports.BOOSTING_FIELD_VALUE;
        scoreStrategy.configuration['field'] = field;
        scoreStrategy.configuration['factor'] = factor;
        scoreStrategy.configuration['missing'] = missing;
        scoreStrategy.configuration['modifier'] = modifier;
        scoreStrategy.weight = weight;
        scoreStrategy.filter = ScoreStrategy.fixFilterFieldPath(filter);
        scoreStrategy.scoreMode = scoreMode;
        return scoreStrategy;
    };
    /**
     * Create custom function
     *
     * @param func
     * @param weight
     * @param filter
     * @param scoreMode
     *
     * @return {ScoreStrategy}
     */
    ScoreStrategy.createCustomFunction = function (func, weight, filter, scoreMode) {
        if (weight === void 0) { weight = exports.DEFAULT_WEIGHT; }
        if (filter === void 0) { filter = null; }
        if (scoreMode === void 0) { scoreMode = exports.SCORE_MODE_AVG; }
        var scoreStrategy = ScoreStrategy.createDefault();
        scoreStrategy.type = exports.CUSTOM_FUNCTION;
        scoreStrategy.configuration['function'] = func;
        scoreStrategy.weight = weight;
        scoreStrategy.filter = ScoreStrategy.fixFilterFieldPath(filter);
        scoreStrategy.scoreMode = scoreMode;
        return scoreStrategy;
    };
    /**
     * Create decay function
     *
     * @param type
     * @param field
     * @param origin
     * @param scale
     * @param offset
     * @param decay
     * @param weight
     * @param filter
     * @param scoreMode
     *
     * @return {ScoreStrategy}
     */
    ScoreStrategy.createDecayFunction = function (type, field, origin, scale, offset, decay, weight, filter, scoreMode) {
        if (weight === void 0) { weight = exports.DEFAULT_WEIGHT; }
        if (filter === void 0) { filter = null; }
        if (scoreMode === void 0) { scoreMode = exports.SCORE_MODE_AVG; }
        var scoreStrategy = ScoreStrategy.createDefault();
        scoreStrategy.type = exports.DECAY;
        scoreStrategy.configuration['type'] = type;
        scoreStrategy.configuration['field'] = field;
        scoreStrategy.configuration['origin'] = origin;
        scoreStrategy.configuration['scale'] = scale;
        scoreStrategy.configuration['offset'] = offset;
        scoreStrategy.configuration['decay'] = decay;
        scoreStrategy.weight = weight;
        scoreStrategy.filter = ScoreStrategy.fixFilterFieldPath(filter);
        scoreStrategy.scoreMode = scoreMode;
        return scoreStrategy;
    };
    /**
     * Fix filter path.
     *
     * @param filter
     *
     * @return {Filter}
     */
    ScoreStrategy.fixFilterFieldPath = function (filter) {
        if (filter == null) {
            return filter;
        }
        var filterAsArray = filter.toArray();
        filterAsArray['field'] = Item_1.Item.getPathByField(filterAsArray['field']);
        return Filter_1.Filter.createFromArray(filterAsArray);
    };
    /**
     * To array
     *
     * @return {{
     *      type: string,
     *      configuration: any,
     *      weight: number,
     *      score_mode: string,
     *      filter: any
     * }}
     */
    ScoreStrategy.prototype.toArray = function () {
        return {
            type: this.type,
            configuration: this.configuration,
            weight: this.weight,
            score_mode: this.scoreMode,
            filter: this.filter instanceof Filter_1.Filter
                ? this.filter.toArray()
                : null
        };
    };
    /**
     * Create from array
     *
     * @param array
     *
     * @return {ScoreStrategy}
     */
    ScoreStrategy.createFromArray = function (array) {
        array = JSON.parse(JSON.stringify(array));
        var scoreStrategy = ScoreStrategy.createDefault();
        if (typeof array.type != "undefined") {
            scoreStrategy.type = array.type;
        }
        if (typeof array.configuration != "undefined") {
            scoreStrategy.configuration = array.configuration;
        }
        if (typeof array.weight != "undefined") {
            scoreStrategy.weight = array.weight;
        }
        if (typeof array.score_mode != "undefined") {
            scoreStrategy.scoreMode = array.score_mode;
        }
        if (typeof array.filter === 'object' && array.filter !== null) {
            scoreStrategy.filter = Filter_1.Filter.createFromArray(array.filter);
        }
        return scoreStrategy;
    };
    return ScoreStrategy;
}());
exports.ScoreStrategy = ScoreStrategy;


/***/ }),

/***/ "./node_modules/apisearch/lib/Query/SortBy.js":
/*!****************************************************!*\
  !*** ./node_modules/apisearch/lib/Query/SortBy.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
exports.SortBy = exports.SORT_BY_LOCATION_MI_ASC = exports.SORT_BY_LOCATION_KM_ASC = exports.SORT_BY_TYPE_DESC = exports.SORT_BY_TYPE_ASC = exports.SORT_BY_ID_DESC = exports.SORT_BY_ID_ASC = exports.SORT_BY_AL_TUN_TUN = exports.SORT_BY_RANDOM = exports.SORT_BY_SCORE = exports.SORT_BY_MODE_MEDIAN = exports.SORT_BY_MODE_MAX = exports.SORT_BY_MODE_MIN = exports.SORT_BY_MODE_SUM = exports.SORT_BY_MODE_AVG = exports.SORT_BY_DESC = exports.SORT_BY_ASC = exports.SORT_BY_TYPE_RANDOM = exports.SORT_BY_TYPE_FUNCTION = exports.SORT_BY_TYPE_DISTANCE = exports.SORT_BY_TYPE_SCORE = exports.SORT_BY_TYPE_NESTED = exports.SORT_BY_TYPE_FIELD = void 0;
var __1 = __webpack_require__(/*! .. */ "./node_modules/apisearch/lib/index.js");
var Filter_1 = __webpack_require__(/*! ./Filter */ "./node_modules/apisearch/lib/Query/Filter.js");
/**
 export * Sort by constants
 */
exports.SORT_BY_TYPE_FIELD = 'field';
exports.SORT_BY_TYPE_NESTED = 'nested';
exports.SORT_BY_TYPE_SCORE = 'score';
exports.SORT_BY_TYPE_DISTANCE = 'distance';
exports.SORT_BY_TYPE_FUNCTION = 'function';
exports.SORT_BY_TYPE_RANDOM = 'random';
exports.SORT_BY_ASC = "asc";
exports.SORT_BY_DESC = "desc";
exports.SORT_BY_MODE_AVG = "avg";
exports.SORT_BY_MODE_SUM = "sum";
exports.SORT_BY_MODE_MIN = "min";
exports.SORT_BY_MODE_MAX = "max";
exports.SORT_BY_MODE_MEDIAN = "median";
exports.SORT_BY_SCORE = {
    type: exports.SORT_BY_TYPE_SCORE
};
exports.SORT_BY_RANDOM = {
    type: exports.SORT_BY_TYPE_RANDOM
};
exports.SORT_BY_AL_TUN_TUN = exports.SORT_BY_RANDOM;
exports.SORT_BY_ID_ASC = {
    field: "uuid.id",
    order: exports.SORT_BY_ASC
};
exports.SORT_BY_ID_DESC = {
    field: "uuid.id",
    order: exports.SORT_BY_DESC
};
exports.SORT_BY_TYPE_ASC = {
    field: "uuid.type",
    order: exports.SORT_BY_ASC
};
exports.SORT_BY_TYPE_DESC = {
    field: "uuid.type",
    order: exports.SORT_BY_DESC
};
exports.SORT_BY_LOCATION_KM_ASC = {
    type: exports.SORT_BY_TYPE_DISTANCE,
    unit: "km"
};
exports.SORT_BY_LOCATION_MI_ASC = {
    type: exports.SORT_BY_TYPE_DISTANCE,
    unit: "mi"
};
/**
 * ScoreStrategy
 */
var SortBy = /** @class */ (function () {
    function SortBy() {
        this.sortsBy = [];
    }
    /**
     * Create
     *
     * @return {SortBy}
     */
    SortBy.create = function () {
        return new SortBy;
    };
    /**
     * Sort By fields values
     *
     * @param shortSortByElements
     *
     * @return {SortBy}
     */
    SortBy.byFieldsValues = function (shortSortByElements) {
        var sortBy = SortBy.create();
        for (var key in shortSortByElements) {
            sortBy.byFieldValue(key, shortSortByElements[key]);
        }
        return sortBy;
    };
    /**
     * All
     *
     * @return {Array}
     */
    SortBy.prototype.all = function () {
        return this.sortsBy.length > 0
            ? this.sortsBy
            : [exports.SORT_BY_SCORE];
    };
    /**
     * Sort by value
     *
     * @param value
     *
     * @return {SortBy}
     */
    SortBy.prototype.byValue = function (value) {
        if (exports.SORT_BY_SCORE != value &&
            exports.SORT_BY_RANDOM != value) {
            if (typeof value.type == "undefined") {
                value.type = exports.SORT_BY_TYPE_FIELD;
            }
        }
        if (exports.SORT_BY_SCORE != value) {
            this.sortsBy.push(value);
        }
        return this;
    };
    /**
     * Sort by field value
     *
     * @param field
     * @param order
     *
     * @return {SortBy}
     */
    SortBy.prototype.byFieldValue = function (field, order) {
        this.sortsBy.push({
            type: exports.SORT_BY_TYPE_FIELD,
            field: __1.Item.getPathByField(field),
            order: order
        });
        return this;
    };
    /**
     * Sort by nested field
     *
     * @param field
     * @param order
     * @param mode
     *
     * @return {SortBy}
     */
    SortBy.prototype.byNestedField = function (field, order, mode) {
        if (mode === void 0) { mode = exports.SORT_BY_MODE_AVG; }
        this.sortsBy.push({
            type: exports.SORT_BY_TYPE_NESTED,
            mode: mode,
            field: 'indexed_metadata.' + field,
            order: order
        });
        return this;
    };
    /**
     * Sort by nested field and filter
     *
     * @param field
     * @param order
     * @param filter
     * @param mode
     *
     * @return {SortBy}
     */
    SortBy.prototype.byNestedFieldAndFilter = function (field, order, filter, mode) {
        if (mode === void 0) { mode = exports.SORT_BY_MODE_AVG; }
        var fieldPath = __1.Item.getPathByField(filter.getField());
        var filterAsArray = filter.toArray();
        filterAsArray.field = fieldPath;
        filter = Filter_1.Filter.createFromArray(filterAsArray);
        this.sortsBy.push({
            type: exports.SORT_BY_TYPE_NESTED,
            mode: mode,
            filter: filter,
            field: 'indexed_metadata.' + field,
            order: order
        });
        return this;
    };
    /**
     * Sort by function
     *
     * @param func
     * @param order
     *
     * @return {SortBy}
     */
    SortBy.prototype.byFunction = function (func, order) {
        this.sortsBy.push({
            type: exports.SORT_BY_TYPE_FUNCTION,
            "function": func,
            order: order
        });
        return this;
    };
    /**
     * Is sorted by geo distance
     *
     * @return {boolean}
     */
    SortBy.prototype.isSortedByGeoDistance = function () {
        for (var i in this.sortsBy) {
            if (this.sortsBy[i].type === exports.SORT_BY_TYPE_DISTANCE) {
                return true;
            }
        }
        return false;
    };
    /**
     * Set coordinate
     *
     * @param coordinate
     *
     * @return {SortBy}
     */
    SortBy.prototype.setCoordinate = function (coordinate) {
        for (var i in this.sortsBy) {
            if (this.sortsBy[i].type === exports.SORT_BY_TYPE_DISTANCE) {
                this.sortsBy[i].coordinate = coordinate;
            }
        }
        return this;
    };
    /**
     * Has random sort
     *
     * @return {boolean}
     */
    SortBy.prototype.hasRandomSort = function () {
        for (var i in this.sortsBy) {
            if (this.sortsBy[i].type === exports.SORT_BY_TYPE_RANDOM) {
                return true;
            }
        }
        return false;
    };
    /**
     * get first sort value as string
     *
     * @return {string}
     */
    SortBy.prototype.getFirstSortAsString = function () {
        if (this.sortsBy[0] === undefined) {
            return 'score';
        }
        var firstSortBy = this.sortsBy[0];
        if (firstSortBy.type === exports.SORT_BY_TYPE_RANDOM) {
            return 'random';
        }
        if (firstSortBy.type === exports.SORT_BY_TYPE_DISTANCE) {
            return firstSortBy.type + ':' + firstSortBy.unit;
        }
        if (firstSortBy.type === exports.SORT_BY_TYPE_SCORE) {
            return 'score';
        }
        var field = firstSortBy.field;
        var order = firstSortBy.order;
        var fieldParts = field.split('.');
        return fieldParts[1] + ':' + order;
    };
    /**
     * To array
     *
     * @return {[]}
     */
    SortBy.prototype.toArray = function () {
        var copySortBy = this.copy();
        var sortsByAsArray = copySortBy.sortsBy;
        for (var i in sortsByAsArray) {
            if (typeof sortsByAsArray[i].filter === typeof {} &&
                sortsByAsArray[i].filter != null) {
                sortsByAsArray[i].filter = sortsByAsArray[i].filter.toArray();
            }
            if (sortsByAsArray[i].coordinate !== null &&
                sortsByAsArray[i].coordinate instanceof __1.Coordinate) {
                sortsByAsArray[i].coordinate = sortsByAsArray[i].coordinate.toArray();
            }
        }
        return sortsByAsArray;
    };
    /**
     * Create from array
     *
     * @param array
     *
     * @returns {SortBy}
     */
    SortBy.createFromArray = function (array) {
        var innerArray = JSON.parse(JSON.stringify(array));
        var sortBy = SortBy.create();
        for (var i in innerArray) {
            var element = innerArray[i];
            if (typeof element.type == "undefined") {
                element.type = exports.SORT_BY_TYPE_FIELD;
            }
            if (typeof element.filter === typeof {} &&
                element.filter != null) {
                element.filter = Filter_1.Filter.createFromArray(element.filter);
            }
            if (element.coordinate != null &&
                typeof element.coordinate === typeof {}) {
                element.coordinate = __1.Coordinate.createFromArray(element.coordinate);
            }
            sortBy.sortsBy.push(element);
        }
        return sortBy;
    };
    /**
     * Make a copy of this
     *
     * @returns {SortBy}
     */
    SortBy.prototype.copy = function () {
        var newSortBy = SortBy.create();
        for (var i in this.sortsBy) {
            var sortBy = this.sortsBy[i];
            if (typeof sortBy !== "function") {
                var sortByAsArray = JSON.parse(JSON.stringify(sortBy));
                if (typeof sortBy.filter === typeof {} &&
                    sortBy.filter != null) {
                    sortByAsArray.filter = Filter_1.Filter.createFromArray(sortBy.filter.toArray());
                }
                if (sortBy.coordinate != null &&
                    typeof sortBy.coordinate == typeof {}) {
                    sortByAsArray.coordinate = __1.Coordinate.createFromArray(sortBy.coordinate.toArray());
                }
                newSortBy.sortsBy.push(sortByAsArray);
            }
        }
        return newSortBy;
    };
    return SortBy;
}());
exports.SortBy = SortBy;


/***/ }),

/***/ "./node_modules/apisearch/lib/Repository/HttpRepository.js":
/*!*****************************************************************!*\
  !*** ./node_modules/apisearch/lib/Repository/HttpRepository.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
exports.HttpRepository = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var ConnectionError_1 = __webpack_require__(/*! ../Error/ConnectionError */ "./node_modules/apisearch/lib/Error/ConnectionError.js");
var InvalidFormatError_1 = __webpack_require__(/*! ../Error/InvalidFormatError */ "./node_modules/apisearch/lib/Error/InvalidFormatError.js");
var InvalidTokenError_1 = __webpack_require__(/*! ../Error/InvalidTokenError */ "./node_modules/apisearch/lib/Error/InvalidTokenError.js");
var ResourceExistsError_1 = __webpack_require__(/*! ../Error/ResourceExistsError */ "./node_modules/apisearch/lib/Error/ResourceExistsError.js");
var ResourceNotAvailableError_1 = __webpack_require__(/*! ../Error/ResourceNotAvailableError */ "./node_modules/apisearch/lib/Error/ResourceNotAvailableError.js");
var UnknownError_1 = __webpack_require__(/*! ../Error/UnknownError */ "./node_modules/apisearch/lib/Error/UnknownError.js");
var Response_1 = __webpack_require__(/*! ../Http/Response */ "./node_modules/apisearch/lib/Http/Response.js");
var Index_1 = __webpack_require__(/*! ../Model/Index */ "./node_modules/apisearch/lib/Model/Index.js");
var Item_1 = __webpack_require__(/*! ../Model/Item */ "./node_modules/apisearch/lib/Model/Item.js");
var ItemUUID_1 = __webpack_require__(/*! ../Model/ItemUUID */ "./node_modules/apisearch/lib/Model/ItemUUID.js");
var Result_1 = __webpack_require__(/*! ../Result/Result */ "./node_modules/apisearch/lib/Result/Result.js");
var Repository_1 = __webpack_require__(/*! ./Repository */ "./node_modules/apisearch/lib/Repository/Repository.js");
/**
 * Aggregation class
 */
var HttpRepository = /** @class */ (function (_super) {
    tslib_1.__extends(HttpRepository, _super);
    /**
     * Constructor
     *
     * @param httpClient
     * @param appId
     * @param indexId
     * @param token
     * @param transformer
     */
    function HttpRepository(httpClient, appId, indexId, token, transformer) {
        var _this = _super.call(this, appId, indexId, token) || this;
        _this.httpClient = httpClient;
        _this.transformer = transformer;
        return _this;
    }
    /**
     * Get transformer
     *
     * @return {Transformer}
     */
    HttpRepository.prototype.getTransformer = function () {
        return this.transformer;
    };
    /**
     * Generate item document by a simple object.
     *
     * @param object
     *
     * @returns {void}
     */
    HttpRepository.prototype.addObject = function (object) {
        var item = this
            .transformer
            .toItem(object);
        if (item instanceof Item_1.Item) {
            this.addItem(item);
        }
    };
    /**
     * Delete item document by uuid.
     *
     * @param object
     *
     * @returns {void}
     */
    HttpRepository.prototype.deleteObject = function (object) {
        var itemUUID = this
            .transformer
            .toItemUUID(object);
        if (itemUUID instanceof ItemUUID_1.ItemUUID) {
            this.deleteItem(itemUUID);
        }
    };
    /**
     * Flush update items
     *
     * @param {Item[]} itemsToUpdate
     *
     * @return {Promise<void>}
     */
    HttpRepository.prototype.flushUpdateItems = function (itemsToUpdate) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var response_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (itemsToUpdate.length === 0) {
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.httpClient.get("/" + this.appId + "/indices/" + this.indexId + "/items", "put", this.getCredentials(), {}, itemsToUpdate.map(function (item) {
                                return item.toArray();
                            }))];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        response_1 = _a.sent();
                        throw HttpRepository.createErrorFromResponse(response_1);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Flush delete items
     *
     * @param {ItemUUID[]} itemsToDelete
     *
     * @return {Promise<void>}
     */
    HttpRepository.prototype.flushDeleteItems = function (itemsToDelete) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var response_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (itemsToDelete.length === 0) {
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.httpClient.get("/" + this.appId + "/indices/" + this.indexId + "/items", "delete", this.getCredentials(), {}, itemsToDelete.map(function (itemUUID) {
                                return itemUUID.toArray();
                            }))];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        response_2 = _a.sent();
                        throw HttpRepository.createErrorFromResponse(response_2);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Query
     *
     * @param {Query} query
     *
     * @return {Promise<Result>}
     */
    HttpRepository.prototype.query = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var response, response_3, result;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.httpClient.get("/" + this.appId + "/indices/" + this.indexId, "get", this.getCredentials(), {
                                query: JSON.stringify(query.toArray())
                                    .replace(/&/g, "%26")
                            }, {})];
                    case 1:
                        response = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        response_3 = _a.sent();
                        throw HttpRepository.createErrorFromResponse(response_3);
                    case 3:
                        result = Result_1.Result.createFromArray(response.getBody());
                        return [2 /*return*/, this.applyTransformersToResult(result)];
                }
            });
        });
    };
    /**
     * Get similar items
     *
     * @param {Query} query
     * @param {ItemUUID[]} itemUUIDs
     * @param {number} similarity
     *
     * @return {Promise<Result>}
     */
    HttpRepository.prototype.getSimilarItems = function (query, itemUUIDs, similarity) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var response, response_4, result;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.httpClient.get("/" + this.appId + "/indices/" + this.indexId + '/similar-items', "get", this.getCredentials(), {}, {
                                query: query.toArray(),
                                items_uuid: itemUUIDs.map(function (itemUUID) {
                                    return itemUUID.toArray();
                                }),
                                similarity: similarity
                            })];
                    case 1:
                        response = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        response_4 = _a.sent();
                        throw HttpRepository.createErrorFromResponse(response_4);
                    case 3:
                        result = Result_1.Result.createFromArray(response.getBody());
                        return [2 /*return*/, this.applyTransformersToResult(result)];
                }
            });
        });
    };
    /**
     * Get recommended items
     *
     * @param {Query} query
     *
     * @return {Promise<Result>}
     */
    HttpRepository.prototype.getRecommendedItems = function (query) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var response, response_5, result;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.httpClient.get("/" + this.appId + "/indices/" + this.indexId + '/recommended-items', "get", this.getCredentials(), {}, query.toArray())];
                    case 1:
                        response = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        response_5 = _a.sent();
                        throw HttpRepository.createErrorFromResponse(response_5);
                    case 3:
                        result = Result_1.Result.createFromArray(response.getBody());
                        return [2 /*return*/, this.applyTransformersToResult(result)];
                }
            });
        });
    };
    /**
     * Update items
     *
     * @param {Query} query
     * @param {Changes} changes
     *
     * @return {Promise<void>}
     */
    HttpRepository.prototype.updateItems = function (query, changes) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var response_6;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.httpClient.get("/" + this.appId + "/indices/" + this.indexId + "/items/update-by-query", "put", this.getCredentials(), {}, {
                                changes: changes.toArray(),
                                query: query.toArray()
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        response_6 = _a.sent();
                        throw HttpRepository.createErrorFromResponse(response_6);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Create index
     *
     * @param {IndexUUID} indexUUID
     * @param {Config} config
     *
     * @return {Promise<void>}
     */
    HttpRepository.prototype.createIndex = function (indexUUID, config) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var response_7;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.httpClient.get("/" + this.appId + "/indices/" + indexUUID.composedUUID(), "put", this.getCredentials(), {}, config.toArray())];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        response_7 = _a.sent();
                        throw HttpRepository.createErrorFromResponse(response_7);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Delete index
     *
     * @param {IndexUUID} indexUUID
     *
     * @return {Promise<void>}
     */
    HttpRepository.prototype.deleteIndex = function (indexUUID) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var response_8;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.httpClient.get("/" + this.appId + "/indices/" + indexUUID.composedUUID(), "delete", this.getCredentials(), {}, {})];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        response_8 = _a.sent();
                        throw HttpRepository.createErrorFromResponse(response_8);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Reset index
     *
     * @param {IndexUUID} indexUUID
     *
     * @return {Promise<void>}
     */
    HttpRepository.prototype.resetIndex = function (indexUUID) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var response_9;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.httpClient.get("/" + this.appId + "/indices/" + indexUUID.composedUUID() + "/reset", "put", this.getCredentials(), {}, {})];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        response_9 = _a.sent();
                        throw HttpRepository.createErrorFromResponse(response_9);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Check index
     *
     * @param {IndexUUID} indexUUID
     *
     * @return {Promise<boolean>}
     */
    HttpRepository.prototype.checkIndex = function (indexUUID) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var response, response_10;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.httpClient.get("/" + this.appId + "/indices/" + indexUUID.composedUUID(), "head", this.getCredentials(), {}, {})];
                    case 1:
                        response = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        response_10 = _a.sent();
                        throw HttpRepository.createErrorFromResponse(response_10);
                    case 3: return [2 /*return*/, response.getCode() === 200];
                }
            });
        });
    };
    /**
     * Check index
     *
     * @return {Promise<Index[]>}
     */
    HttpRepository.prototype.getIndices = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var response, response_11, result, _i, _a, indexAsArray;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.httpClient.get("/" + this.appId + "/indices/", "get", this.getCredentials(), {}, {})];
                    case 1:
                        response = _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        response_11 = _b.sent();
                        throw HttpRepository.createErrorFromResponse(response_11);
                    case 3:
                        result = [];
                        for (_i = 0, _a = response.getBody(); _i < _a.length; _i++) {
                            indexAsArray = _a[_i];
                            result.push(Index_1.Index.createFromArray(indexAsArray));
                        }
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * Configure index
     *
     * @param {IndexUUID} indexUUID
     * @param {Config} config
     *
     * @return {Promise<void>}
     */
    HttpRepository.prototype.configureIndex = function (indexUUID, config) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var response_12;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.httpClient.get("/" + this.appId + "/indices/" + indexUUID.composedUUID() + "/configure", "put", this.getCredentials(), {}, config.toArray())];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        response_12 = _a.sent();
                        throw HttpRepository.createErrorFromResponse(response_12);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @param {IndexUUID} indexUUID
     * @param {ItemUUID} itemUUID
     * @param {string} userId
     * @param {string} interaction
     * @param {string} queryString
     * @param {string} site
     * @param {string} device
     *
     * @return {Promise<void>}
     */
    HttpRepository.prototype.pushInteraction = function (indexUUID, itemUUID, userId, queryString, interaction, site, device) {
        if (site === void 0) { site = null; }
        if (device === void 0) { device = null; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var parameters, response_13;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        parameters = {
                            query_string: queryString,
                            site: site,
                            device: device,
                            user_id: userId
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.httpClient.get("/" + this.appId + "/indices/" + indexUUID.composedUUID() + "/items/" + itemUUID.composedUUID() + "/interaction/" + interaction, "post", {
                                token: this.token
                            }, parameters, {})];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        response_13 = _a.sent();
                        throw HttpRepository.createErrorFromResponse(response_13);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @param {IndexUUID} indexUUID
     * @param {string} userId
     * @param {ItemUUID[]} itemUUIDs
     * @param {string} site
     * @param {string} device
     *
     * @return {Promise<void>}
     */
    HttpRepository.prototype.purchase = function (indexUUID, userId, itemUUIDs, site, device) {
        if (site === void 0) { site = null; }
        if (device === void 0) { device = null; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var parameters, response_14;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        parameters = {
                            site: site,
                            device: device,
                            user_id: userId
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.httpClient.get("/" + this.appId + "/indices/" + indexUUID.composedUUID() + "/purchase", "post", {
                                token: this.token
                            }, parameters, {
                                items_uuid: itemUUIDs.map(function (itemUUID) {
                                    return itemUUID.toArray();
                                })
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        response_14 = _a.sent();
                        throw HttpRepository.createErrorFromResponse(response_14);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     *
     */
    HttpRepository.prototype.getHttpClient = function () {
        return this.httpClient;
    };
    /**
     * Get query values
     *
     * @returns any
     */
    HttpRepository.prototype.getCredentials = function () {
        return {
            app_id: this.appId,
            token: this.token
        };
    };
    /**
     * Apply transformers to results
     *
     * @param {Result} result
     *
     * @return {Result}
     */
    HttpRepository.prototype.applyTransformersToResult = function (result) {
        if (!this.transformer.hasReadTransformers()) {
            return result;
        }
        var subresults = result.getSubresults();
        if (Object.keys(subresults).length > 0) {
            Object.keys(subresults).map(function (key) {
                subresults[key] = this.applyTransformersToResult(subresults[key]);
            }.bind(this));
            return Result_1.Result.createMultiresults(subresults);
        }
        return Result_1.Result.create(result.getQueryUUID(), result.getTotalItems(), result.getTotalHits(), result.getAggregations(), result.getSuggestions(), this
            .transformer
            .fromItems(result.getItems()), result.getAutocomplete());
    };
    /**
     * @param response
     * @private
     */
    HttpRepository.createErrorFromResponse = function (response) {
        var error;
        if (response instanceof Response_1.Response) {
            switch (response.getCode()) {
                case ResourceNotAvailableError_1.ResourceNotAvailableError.getTransportableHTTPError():
                    error = new ResourceNotAvailableError_1.ResourceNotAvailableError(response.getBody().message);
                    break;
                case InvalidTokenError_1.InvalidTokenError.getTransportableHTTPError():
                    error = new InvalidTokenError_1.InvalidTokenError(response.getBody().message);
                    break;
                case InvalidFormatError_1.InvalidFormatError.getTransportableHTTPError():
                    error = new InvalidFormatError_1.InvalidFormatError(response.getBody().message);
                    break;
                case ResourceExistsError_1.ResourceExistsError.getTransportableHTTPError():
                    error = new ResourceExistsError_1.ResourceExistsError(response.getBody().message);
                    break;
                case ConnectionError_1.ConnectionError.getTransportableHTTPError():
                    error = new ConnectionError_1.ConnectionError(response.getBody().message);
                    break;
            }
        }
        return undefined === error
            ? UnknownError_1.UnknownError.createUnknownError()
            : error;
    };
    return HttpRepository;
}(Repository_1.Repository));
exports.HttpRepository = HttpRepository;


/***/ }),

/***/ "./node_modules/apisearch/lib/Repository/Repository.js":
/*!*************************************************************!*\
  !*** ./node_modules/apisearch/lib/Repository/Repository.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
exports.Repository = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/**
 * Aggregation class
 */
var Repository = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param appId
     * @param indexId
     * @param token
     */
    function Repository(appId, indexId, token) {
        this.itemsToUpdate = [];
        this.itemsToDelete = [];
        this.appId = appId;
        this.indexId = indexId;
        this.token = token;
    }
    /**
     * Reset cached elements
     */
    Repository.prototype.resetCachedElements = function () {
        this.itemsToUpdate = [];
        this.itemsToDelete = [];
    };
    /**
     * Add element
     *
     * @param item
     */
    Repository.prototype.addItem = function (item) {
        this.itemsToUpdate.push(item);
    };
    /**
     * Add elements
     *
     * @param items
     */
    Repository.prototype.addItems = function (items) {
        for (var i in items) {
            this.addItem(items[i]);
        }
    };
    /**
     * Delete item
     *
     * @param itemUUID
     */
    Repository.prototype.deleteItem = function (itemUUID) {
        this.itemsToDelete.push(itemUUID);
    };
    /**
     * Delete items
     *
     * @param itemsUUID
     */
    Repository.prototype.deleteItems = function (itemsUUID) {
        for (var i in itemsUUID) {
            this.deleteItem(itemsUUID[i]);
        }
    };
    /**
     * flush
     *
     * @param bulkNumber
     * @param skipIfLess
     *
     * @return {Promise<any[]>}
     */
    Repository.prototype.flush = function (bulkNumber, skipIfLess) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var promise, resetCachedElements;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                if (!bulkNumber) {
                    bulkNumber = 500;
                }
                if (!skipIfLess) {
                    skipIfLess = false;
                }
                if (skipIfLess &&
                    this.itemsToUpdate.length < bulkNumber) {
                    return [2 /*return*/];
                }
                promise = Promise.all(Repository
                    .chunkArray(this.itemsToUpdate, bulkNumber)
                    .map(function (arrayOfItems) {
                    return _this.flushUpdateItems(arrayOfItems);
                })
                    .concat(Repository
                    .chunkArray(this.itemsToDelete, bulkNumber)
                    .map(function (arrayOfItemsUUID) {
                    return _this.flushDeleteItems(arrayOfItemsUUID);
                })));
                resetCachedElements = function () {
                    _this.resetCachedElements();
                };
                promise.then(resetCachedElements, resetCachedElements);
                return [2 /*return*/, promise];
            });
        });
    };
    /**
     * Make chunks of n elements
     *
     * @param array
     * @param chunk
     *
     * @return any[]
     */
    Repository.chunkArray = function (array, chunk) {
        var arrayChunked = [];
        for (var i = 0, j = array.length; i < j; i += chunk) {
            arrayChunked.push(array.slice(i, i + chunk));
        }
        return arrayChunked;
    };
    return Repository;
}());
exports.Repository = Repository;


/***/ }),

/***/ "./node_modules/apisearch/lib/Result/Counter.js":
/*!******************************************************!*\
  !*** ./node_modules/apisearch/lib/Result/Counter.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
exports.Counter = void 0;
var Metadata_1 = __webpack_require__(/*! ../Model/Metadata */ "./node_modules/apisearch/lib/Model/Metadata.js");
/**
 * Aggregation class
 */
var Counter = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param values
     * @param used
     * @param n
     */
    function Counter(values, used, n) {
        this.values = values;
        this.used = used;
        this.n = n;
    }
    /**
     * Get id
     *
     * @return {string|null}
     */
    Counter.prototype.getId = function () {
        return typeof this.values.id == "string"
            ? this.values.id
            : null;
    };
    /**
     * Get name
     *
     * @return {string|null}
     */
    Counter.prototype.getName = function () {
        return typeof this.values.name == "string"
            ? this.values.name
            : null;
    };
    /**
     * Get slug
     *
     * @return {string|null}
     */
    Counter.prototype.getSlug = function () {
        return typeof this.values.slug == "string"
            ? this.values.slug
            : null;
    };
    /**
     * Get level
     *
     * @return {number}
     */
    Counter.prototype.getLevel = function () {
        return typeof this.values.level == "number"
            ? this.values.level
            : 0;
    };
    /**
     * Get values
     *
     * @returns {{}}
     */
    Counter.prototype.getValues = function () {
        return this.values;
    };
    /**
     * Is used
     *
     * @returns {boolean}
     */
    Counter.prototype.isUsed = function () {
        return this.used;
    };
    /**
     * Get N
     *
     * @returns {number}
     */
    Counter.prototype.getN = function () {
        return this.n;
    };
    /**
     * Create by active elements
     *
     * @param name
     * @param n
     * @param activeElements
     */
    Counter.createByActiveElements = function (name, n, activeElements) {
        var values = Metadata_1.Metadata.fromMetadata(name);
        if (values == null) {
            return null;
        }
        var i = activeElements.length;
        var inActiveElements = false;
        while (i--) {
            if (activeElements[i] == values.id) {
                inActiveElements = true;
            }
        }
        return new Counter(values, inActiveElements, n);
    };
    /**
     * To array
     *
     * @return {{}}
     */
    Counter.prototype.toArray = function () {
        var values = {
            values: this.values,
            n: this.n
        };
        if (this.used === true) {
            values.used = true;
        }
        return values;
    };
    /**
     * Create from array
     *
     * @param array
     *
     * @return {Counter}
     */
    Counter.createFromArray = function (array) {
        array = JSON.parse(JSON.stringify(array));
        return new Counter(array.values, (typeof array.used == "boolean")
            ? array.used
            : false, array.n);
    };
    return Counter;
}());
exports.Counter = Counter;


/***/ }),

/***/ "./node_modules/apisearch/lib/Result/Result.js":
/*!*****************************************************!*\
  !*** ./node_modules/apisearch/lib/Result/Result.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
exports.Result = void 0;
var Item_1 = __webpack_require__(/*! ../Model/Item */ "./node_modules/apisearch/lib/Model/Item.js");
var ResultAggregations_1 = __webpack_require__(/*! ./ResultAggregations */ "./node_modules/apisearch/lib/Result/ResultAggregations.js");
/**
 * Result class
 */
var Result = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param queryUUID
     * @param totalItems
     * @param totalHits
     */
    function Result(queryUUID, totalItems, totalHits) {
        this.items = [];
        this.autocomplete = null;
        this.suggestions = [];
        this.subresults = {};
        this.metadata = {};
        this.queryUUID = queryUUID;
        this.totalItems = totalItems;
        this.totalHits = totalHits;
    }
    /**
     * @param queryUUID
     * @param totalItems
     * @param totalHits
     * @param aggregations
     * @param suggestions
     * @param items
     * @param autocomplete
     * @param metadata
     */
    Result.create = function (queryUUID, totalItems, totalHits, aggregations, suggestions, items, autocomplete, metadata) {
        if (autocomplete === void 0) { autocomplete = null; }
        if (metadata === void 0) { metadata = {}; }
        var result = new Result(queryUUID, totalItems, totalHits);
        result.aggregations = aggregations;
        result.suggestions = suggestions;
        result.items = items;
        result.autocomplete = autocomplete;
        result.metadata = metadata;
        return result;
    };
    /**
     * Create multi results
     *
     * @param subresults
     *
     * @returns {Result}
     */
    Result.createMultiresults = function (subresults) {
        var result = new Result('', 0, 0);
        result.subresults = subresults;
        return result;
    };
    /**
     * Add item
     *
     * @param item
     */
    Result.prototype.addItem = function (item) {
        this.items.push(item);
    };
    /**
     * Get items
     *
     * @return {Item[]}
     */
    Result.prototype.getItems = function () {
        return this.items;
    };
    /**
     * Get items grouped by types
     *
     * @return {any[]}
     */
    Result.prototype.getItemsGroupedByTypes = function () {
        if (this.itemsGroupedByTypeCache instanceof Object &&
            Object.keys(this.itemsGroupedByTypeCache).length > 0) {
            return this.itemsGroupedByTypeCache;
        }
        var itemsGroupedByTypes = {};
        for (var i in this.items) {
            var item = this.items[i];
            if (!(itemsGroupedByTypes[item.getType()] instanceof Array)) {
                itemsGroupedByTypes[item.getType()] = [];
            }
            itemsGroupedByTypes[item.getType()].push(item);
        }
        this.itemsGroupedByTypeCache = itemsGroupedByTypes;
        return itemsGroupedByTypes;
    };
    /**
     * Get items by type
     *
     * @param type
     *
     * @return {Array}
     */
    Result.prototype.getItemsByType = function (type) {
        var itemsGroupedByTypes = this.getItemsGroupedByTypes();
        return itemsGroupedByTypes[type] == null
            ? []
            : itemsGroupedByTypes[type];
    };
    /**
     * Get items by types
     *
     * @param types
     */
    Result.prototype.getItemsByTypes = function (types) {
        return this.items.filter(function (item) { return types.indexOf(item.getType()) >= 0; });
    };
    /**
     * Get first item
     *
     * @return {Item}
     */
    Result.prototype.getFirstItem = function () {
        return this.items.length > 0
            ? this.items[0]
            : null;
    };
    /**
     * Set aggregations
     *
     * @param aggregations
     */
    Result.prototype.setAggregations = function (aggregations) {
        this.aggregations = aggregations;
    };
    /**
     * Get aggregations
     *
     * @return {ResultAggregations}
     */
    Result.prototype.getAggregations = function () {
        return this.aggregations instanceof ResultAggregations_1.ResultAggregations
            ? this.aggregations
            : null;
    };
    /**
     * Get aggregation
     *
     * @param name
     *
     * @return {null}
     */
    Result.prototype.getAggregation = function (name) {
        return this.aggregations == null
            ? null
            : this.aggregations.getAggregation(name);
    };
    /**
     * Has no empty aggregation
     *
     * @param name
     *
     * @return {boolean}
     */
    Result.prototype.hasNotEmptyAggregation = function (name) {
        return this.aggregations == null
            ? false
            : this.aggregations.hasNotEmptyAggregation(name);
    };
    /**
     * Get suggestions
     *
     * @return {string[]}
     */
    Result.prototype.getSuggestions = function () {
        return this.suggestions;
    };
    /**
     * Get autocomplete
     *
     * @return {string|null}
     */
    Result.prototype.getAutocomplete = function () {
        return this.autocomplete;
    };
    /**
     * Get query uuid
     *
     * @return {string}
     */
    Result.prototype.getQueryUUID = function () {
        return this.queryUUID;
    };
    /**
     * Get total elements
     *
     * @return {number}
     */
    Result.prototype.getTotalItems = function () {
        return this.totalItems;
    };
    /**
     * Get total hits
     *
     * @return {number}
     */
    Result.prototype.getTotalHits = function () {
        return this.totalHits;
    };
    /**
     * Get subresults
     *
     * @return Object
     */
    Result.prototype.getSubresults = function () {
        return this.subresults;
    };
    /**
     * @return any
     */
    Result.prototype.getMetadata = function () {
        return this.metadata;
    };
    /**
     * @param name
     */
    Result.prototype.getMetadataValue = function (name) {
        var _a;
        return (_a = this.metadata[name]) !== null && _a !== void 0 ? _a : null;
    };
    /**
     * to array
     *
     * @return {{query: any, total_items: number, total_hits: number, items:any[], aggregations: any, suggestions: string[]}}
     */
    Result.prototype.toArray = function () {
        var array = {
            query_uuid: this.queryUUID,
            total_items: this.totalItems,
            total_hits: this.totalHits,
            items: this.items.map(function (item) { return item.toArray(); }),
            aggregations: this.aggregations == null
                ? null
                : this.aggregations.toArray(),
            suggests: this.suggestions,
            autocomplete: this.autocomplete === null
                ? undefined
                : this.autocomplete,
            metadata: this.metadata
        };
        if (this.subresults instanceof Object &&
            Object.keys(this.subresults).length) {
            array.subresults = {};
            for (var i in this.subresults) {
                var subresult = this.subresults[i];
                array.subresults[i] = subresult.toArray();
            }
        }
        return array;
    };
    /**
     * Create from array
     *
     * @param array
     *
     * @return {Result}
     */
    Result.createFromArray = function (array) {
        var result = Result.create(array.query_uuid
            ? array.query_uuid
            : '', array.total_items
            ? array.total_items
            : 0, array.total_hits
            ? array.total_hits
            : 0, array.aggregations instanceof Object
            ? ResultAggregations_1.ResultAggregations.createFromArray(array.aggregations)
            : null, array.suggests
            ? array.suggests
            : [], array.items instanceof Array
            ? array.items.map(function (itemAsArray) { return Item_1.Item.createFromArray(itemAsArray); })
            : [], array.autocomplete === undefined
            ? null
            : array.autocomplete, array.metadata === undefined
            ? {}
            : array.metadata);
        /**
         * Subqueries
         */
        var subresultsAsArray = typeof array.subresults === typeof {}
            ? array.subresults
            : {};
        for (var i in subresultsAsArray) {
            result.subresults[i] = Result.createFromArray(subresultsAsArray[i]);
        }
        return result;
    };
    return Result;
}());
exports.Result = Result;


/***/ }),

/***/ "./node_modules/apisearch/lib/Result/ResultAggregation.js":
/*!****************************************************************!*\
  !*** ./node_modules/apisearch/lib/Result/ResultAggregation.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
exports.ResultAggregation = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var Filter_1 = __webpack_require__(/*! ../Query/Filter */ "./node_modules/apisearch/lib/Query/Filter.js");
var Counter_1 = __webpack_require__(/*! ./Counter */ "./node_modules/apisearch/lib/Result/Counter.js");
/**
 * ResultAggregation class
 */
var ResultAggregation = /** @class */ (function () {
    /**
     * @param name
     * @param applicationType
     * @param totalElements
     * @param activeElements
     * @param metadata
     */
    function ResultAggregation(name, applicationType, totalElements, activeElements, metadata) {
        if (metadata === void 0) { metadata = {}; }
        this.counters = {};
        this.highestActiveElement = 0;
        this.name = name;
        this.applicationType = applicationType;
        this.totalElements = totalElements;
        this.activeElements = {};
        this.metadata = metadata;
        for (var i in activeElements) {
            var activeElement = activeElements[i];
            this.activeElements[activeElement] = activeElement;
        }
    }
    /**
     * Add counter
     *
     * @param name
     * @param counter
     */
    ResultAggregation.prototype.addCounter = function (name, counter) {
        if (counter == 0) {
            return;
        }
        var counterInstance = Counter_1.Counter.createByActiveElements(name, counter, Object.keys(this.activeElements));
        if (!(counterInstance instanceof Counter_1.Counter)) {
            return;
        }
        if ((this.applicationType & Filter_1.FILTER_MUST_ALL_WITH_LEVELS) &&
            (this.applicationType & ~Filter_1.FILTER_MUST_ALL) &&
            counterInstance.isUsed()) {
            this.activeElements[counterInstance.getId()] = counterInstance;
            this.highestActiveElement = Math.max(counterInstance.getLevel(), this.highestActiveElement);
            return;
        }
        this.counters[counterInstance.getId()] = counterInstance;
    };
    /**
     * Get name
     *
     * @return {string}
     */
    ResultAggregation.prototype.getName = function () {
        return this.name;
    };
    /**
     * Get counter
     *
     * @return {any}
     */
    ResultAggregation.prototype.getCounters = function () {
        return this.counters;
    };
    /**
     *
     */
    ResultAggregation.prototype.getMetadata = function () {
        return this.metadata;
    };
    /**
     * Return if the aggregation belongs to a filter.
     *
     * @return {boolean}
     */
    ResultAggregation.prototype.isFilter = function () {
        return (this.applicationType & Filter_1.FILTER_MUST_ALL) > 0;
    };
    /**
     * Aggregation has levels.
     *
     * @return {boolean}
     */
    ResultAggregation.prototype.hasLevels = function () {
        return (this.applicationType & Filter_1.FILTER_MUST_ALL_WITH_LEVELS) > 0;
    };
    /**
     * Get counter by name
     *
     * @param name
     *
     * @return {null}
     */
    ResultAggregation.prototype.getCounter = function (name) {
        return this.counters[name] instanceof Counter_1.Counter
            ? this.counters[name]
            : null;
    };
    /**
     * Get all elements
     *
     * @return {{}}
     */
    ResultAggregation.prototype.getAllElements = function () {
        return tslib_1.__assign(tslib_1.__assign({}, this.activeElements), this.counters);
    };
    /**
     * Get total elements
     *
     * @return {number}
     */
    ResultAggregation.prototype.getTotalElements = function () {
        return this.totalElements;
    };
    /**
     * Get active elements
     *
     * @return {any}
     */
    ResultAggregation.prototype.getActiveElements = function () {
        if (Object.keys(this.activeElements).length === 0) {
            return {};
        }
        if (this.applicationType === Filter_1.FILTER_MUST_ALL_WITH_LEVELS) {
            var value = null;
            for (var i in this.activeElements) {
                var activeElement = this.activeElements[i];
                if (!(activeElement instanceof Counter_1.Counter)) {
                    continue;
                }
                if (value == null) {
                    value = activeElement;
                }
                value = value.getLevel() > activeElement.getLevel()
                    ? value
                    : activeElement;
            }
            return value instanceof Counter_1.Counter
                ? { 0: value }
                : null;
        }
        return this.activeElements;
    };
    /**
     * Clean results by level and remove all levels higher than the lowest.
     */
    ResultAggregation.prototype.cleanCountersByLevel = function () {
        for (var i in this.counters) {
            var counter = this.counters[i];
            if (counter.getLevel() !== this.highestActiveElement + 1) {
                delete this.counters[i];
            }
        }
    };
    /**
     * Is empty
     *
     * @returns {boolean}
     */
    ResultAggregation.prototype.isEmpty = function () {
        return Object.keys(this.activeElements).length == 0 &&
            Object.keys(this.counters).length == 0;
    };
    /**
     * To array
     *
     * @return {any}
     */
    ResultAggregation.prototype.toArray = function () {
        var array = {
            name: this.name,
            counters: [],
            active_elements: [],
            metadata: this.metadata
        };
        for (var i in this.counters) {
            array.counters.push(this.counters[i].toArray());
        }
        if (this.applicationType !== Filter_1.FILTER_AT_LEAST_ONE) {
            array.application_type = this.applicationType;
        }
        if (this.totalElements > 0) {
            array.total_elements = this.totalElements;
        }
        for (var i in this.activeElements) {
            var activeElement = this.activeElements[i];
            array.active_elements.push(activeElement instanceof Counter_1.Counter
                ? activeElement.toArray()
                : activeElement);
        }
        if (this.highestActiveElement > 0) {
            array.highest_active_level = this.highestActiveElement;
        }
        if (array.counters.length === 0) {
            delete array.counters;
        }
        if (array.active_elements.length === 0) {
            delete array.active_elements;
        }
        if (Object.keys(array.metadata).length === 0) {
            delete array.metadata;
        }
        return array;
    };
    /**
     * Create from array
     *
     * @param array
     */
    ResultAggregation.createFromArray = function (array) {
        var activeElements = [];
        var activeElementsAsArray = array.active_elements;
        activeElementsAsArray = typeof activeElementsAsArray === typeof []
            ? activeElementsAsArray
            : [];
        for (var i in activeElementsAsArray) {
            var activeElementAsArray = activeElementsAsArray[i];
            activeElements.push(typeof activeElementAsArray === typeof {}
                ? Counter_1.Counter.createFromArray(activeElementAsArray)
                : activeElementAsArray);
        }
        var aggregation = new ResultAggregation(array.name, parseInt(array.application_type ? array.application_type : Filter_1.FILTER_AT_LEAST_ONE), parseInt(array.total_elements ? array.total_elements : 0), []);
        aggregation.activeElements = activeElements;
        var countersAsArray = typeof array.counters === typeof []
            ? array.counters
            : [];
        for (var i in countersAsArray) {
            var counterAsArray = countersAsArray[i];
            if (typeof counterAsArray !== "function") {
                var counter = Counter_1.Counter.createFromArray(counterAsArray);
                aggregation.counters['_' + counter.getId()] = counter;
            }
        }
        aggregation.highestActiveElement = typeof array.highest_active_level === "number"
            ? array.highest_active_level
            : 0;
        aggregation.metadata = typeof array.metadata === typeof {}
            ? array.metadata
            : {};
        return aggregation;
    };
    return ResultAggregation;
}());
exports.ResultAggregation = ResultAggregation;


/***/ }),

/***/ "./node_modules/apisearch/lib/Result/ResultAggregations.js":
/*!*****************************************************************!*\
  !*** ./node_modules/apisearch/lib/Result/ResultAggregations.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
exports.ResultAggregations = void 0;
var ResultAggregation_1 = __webpack_require__(/*! ./ResultAggregation */ "./node_modules/apisearch/lib/Result/ResultAggregation.js");
/**
 * ResultAggregation class
 */
var ResultAggregations = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param totalElements
     */
    function ResultAggregations(totalElements) {
        this.aggregations = {};
        this.totalElements = totalElements;
    }
    /**
     * Add aggregation
     *
     * @param name
     * @param aggregation
     */
    ResultAggregations.prototype.addAggregation = function (name, aggregation) {
        this.aggregations[name] = aggregation;
    };
    /**
     * Get aggregations
     *
     * @returns {{}}
     */
    ResultAggregations.prototype.getAggregations = function () {
        return this.aggregations;
    };
    /**
     * Get aggregation
     *
     * @param name
     *
     * @returns {Aggregation|null}
     */
    ResultAggregations.prototype.getAggregation = function (name) {
        return this.aggregations[name] instanceof ResultAggregation_1.ResultAggregation
            ? this.aggregations[name]
            : null;
    };
    /**
     * Has not empty aggregation
     *
     * @param name
     *
     * @returns {boolean}
     */
    ResultAggregations.prototype.hasNotEmptyAggregation = function (name) {
        var aggregation = this.getAggregation(name);
        return (aggregation instanceof ResultAggregation_1.ResultAggregation) &&
            (!aggregation.isEmpty());
    };
    /**
     * Get total elements
     *
     * @return {number}
     */
    ResultAggregations.prototype.getTotalElements = function () {
        return this.totalElements;
    };
    /**
     * To array
     *
     * @return {{total_elements?: number, aggregations?: {}}}
     */
    ResultAggregations.prototype.toArray = function () {
        var aggregationCollection = {};
        for (var i in this.aggregations) {
            aggregationCollection[i] = this.aggregations[i].toArray();
        }
        var array = {};
        if (this.totalElements > 0) {
            array.total_elements = this.totalElements;
        }
        if (Object.keys(aggregationCollection).length > 0) {
            array.aggregations = aggregationCollection;
        }
        return array;
    };
    /**
     * Create from array
     *
     * @param array
     *
     * @return {ResultAggregations}
     */
    ResultAggregations.createFromArray = function (array) {
        var aggregations = new ResultAggregations(typeof array.total_elements === "number"
            ? array.total_elements
            : 0);
        if (typeof array.aggregations === typeof {}) {
            for (var i in array.aggregations) {
                aggregations.addAggregation(i, ResultAggregation_1.ResultAggregation.createFromArray(array.aggregations[i]));
            }
        }
        return aggregations;
    };
    return ResultAggregations;
}());
exports.ResultAggregations = ResultAggregations;


/***/ }),

/***/ "./node_modules/apisearch/lib/Transformer/ReadTransformer.js":
/*!*******************************************************************!*\
  !*** ./node_modules/apisearch/lib/Transformer/ReadTransformer.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.__esModule = true;


/***/ }),

/***/ "./node_modules/apisearch/lib/Transformer/Transformer.js":
/*!***************************************************************!*\
  !*** ./node_modules/apisearch/lib/Transformer/Transformer.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
exports.Transformer = void 0;
var Item_1 = __webpack_require__(/*! ../Model/Item */ "./node_modules/apisearch/lib/Model/Item.js");
var ItemUUID_1 = __webpack_require__(/*! ../Model/ItemUUID */ "./node_modules/apisearch/lib/Model/ItemUUID.js");
/**
 * Transformer
 */
var Transformer = /** @class */ (function () {
    function Transformer() {
        this.readTransformers = [];
        this.writeTransformers = [];
    }
    /**
     * Add read transformer
     *
     * @param readTransformer
     */
    Transformer.prototype.addReadTransformer = function (readTransformer) {
        this
            .readTransformers
            .push(readTransformer);
    };
    /**
     * @return {boolean}
     */
    Transformer.prototype.hasReadTransformers = function () {
        return this.readTransformers.length > 0;
    };
    /**
     * Add write transformer
     *
     * @param writeTransformer
     */
    Transformer.prototype.addWriteTransformer = function (writeTransformer) {
        this
            .writeTransformers
            .push(writeTransformer);
    };
    /**
     * Items to objects
     *
     * @param items
     *
     * @returns {any[]}
     */
    Transformer.prototype.fromItems = function (items) {
        var objects = [];
        for (var i in items) {
            objects.push(this.fromItem(items[i]));
        }
        return objects;
    };
    /**
     * Item to object
     *
     * @param item
     *
     * @returns {any}
     */
    Transformer.prototype.fromItem = function (item) {
        for (var i in this.readTransformers) {
            var transformer = this.readTransformers[i];
            if (transformer.isValidItem(item)) {
                return transformer.fromItem(item);
            }
        }
        return item;
    };
    /**
     * Objects to items
     *
     * @param objects
     *
     * @returns {Item[]}
     */
    Transformer.prototype.toItems = function (objects) {
        var items = [];
        for (var i in objects) {
            var item = this.toItem(objects[i]);
            if (item instanceof Item_1.Item) {
                items.push(item);
            }
        }
        return items;
    };
    /**
     * Object to item
     *
     * @param object
     *
     * @returns {any}
     */
    Transformer.prototype.toItem = function (object) {
        for (var i in this.writeTransformers) {
            var transformer = this.writeTransformers[i];
            if (transformer.isValidObject(object)) {
                return transformer.toItem(object);
            }
        }
        return object;
    };
    /**
     * Objects to items
     *
     * @param objects
     *
     * @returns {ItemUUID[]}
     */
    Transformer.prototype.toItemUUIDs = function (objects) {
        var itemUUIDs = [];
        for (var i in objects) {
            var itemUUID = this.toItemUUID(objects[i]);
            if (itemUUID instanceof ItemUUID_1.ItemUUID) {
                itemUUIDs.push(itemUUID);
            }
        }
        return itemUUIDs;
    };
    /**
     * Object to item
     *
     * @param object
     *
     * @returns {any}
     */
    Transformer.prototype.toItemUUID = function (object) {
        for (var i in this.writeTransformers) {
            var transformer = this.writeTransformers[i];
            if (transformer.isValidObject(object)) {
                return transformer.toItemUUID(object);
            }
        }
        return object;
    };
    return Transformer;
}());
exports.Transformer = Transformer;


/***/ }),

/***/ "./node_modules/apisearch/lib/Transformer/WriteTransformer.js":
/*!********************************************************************!*\
  !*** ./node_modules/apisearch/lib/Transformer/WriteTransformer.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.__esModule = true;


/***/ }),

/***/ "./node_modules/apisearch/lib/index.js":
/*!*********************************************!*\
  !*** ./node_modules/apisearch/lib/index.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var Apisearch_1 = __webpack_require__(/*! ./Apisearch */ "./node_modules/apisearch/lib/Apisearch.js");
exports["default"] = Apisearch_1["default"];
tslib_1.__exportStar(__webpack_require__(/*! ./Config/Config */ "./node_modules/apisearch/lib/Config/Config.js"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./Config/Synonym */ "./node_modules/apisearch/lib/Config/Synonym.js"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./Error/ConnectionError */ "./node_modules/apisearch/lib/Error/ConnectionError.js"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./Error/ErrorWithMessage */ "./node_modules/apisearch/lib/Error/ErrorWithMessage.js"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./Error/EventError */ "./node_modules/apisearch/lib/Error/EventError.js"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./Error/ForbiddenError */ "./node_modules/apisearch/lib/Error/ForbiddenError.js"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./Error/InvalidFormatError */ "./node_modules/apisearch/lib/Error/InvalidFormatError.js"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./Error/InvalidTokenError */ "./node_modules/apisearch/lib/Error/InvalidTokenError.js"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./Error/ResourceExistsError */ "./node_modules/apisearch/lib/Error/ResourceExistsError.js"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./Error/ResourceNotAvailableError */ "./node_modules/apisearch/lib/Error/ResourceNotAvailableError.js"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./Error/UnsupportedContentTypeError */ "./node_modules/apisearch/lib/Error/UnsupportedContentTypeError.js"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./Geo/LocationRange */ "./node_modules/apisearch/lib/Geo/LocationRange.js"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./Http/AxiosClient */ "./node_modules/apisearch/lib/Http/AxiosClient.js"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./Http/Client */ "./node_modules/apisearch/lib/Http/Client.js"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./Http/HttpClient */ "./node_modules/apisearch/lib/Http/HttpClient.js"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./Http/Response */ "./node_modules/apisearch/lib/Http/Response.js"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./Http/CacheClient */ "./node_modules/apisearch/lib/Http/CacheClient.js"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./Model/Changes */ "./node_modules/apisearch/lib/Model/Changes.js"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./Model/Coordinate */ "./node_modules/apisearch/lib/Model/Coordinate.js"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./Model/Item */ "./node_modules/apisearch/lib/Model/Item.js"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./Model/ItemUUID */ "./node_modules/apisearch/lib/Model/ItemUUID.js"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./Model/Metadata */ "./node_modules/apisearch/lib/Model/Metadata.js"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./Model/User */ "./node_modules/apisearch/lib/Model/User.js"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./Query/Aggregation */ "./node_modules/apisearch/lib/Query/Aggregation.js"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./Query/Filter */ "./node_modules/apisearch/lib/Query/Filter.js"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./Query/Query */ "./node_modules/apisearch/lib/Query/Query.js"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./Query/Range */ "./node_modules/apisearch/lib/Query/Range.js"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./Query/ScoreStrategies */ "./node_modules/apisearch/lib/Query/ScoreStrategies.js"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./Query/ScoreStrategy */ "./node_modules/apisearch/lib/Query/ScoreStrategy.js"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./Query/SortBy */ "./node_modules/apisearch/lib/Query/SortBy.js"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./Repository/HttpRepository */ "./node_modules/apisearch/lib/Repository/HttpRepository.js"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./Repository/Repository */ "./node_modules/apisearch/lib/Repository/Repository.js"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./Result/ResultAggregation */ "./node_modules/apisearch/lib/Result/ResultAggregation.js"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./Result/ResultAggregations */ "./node_modules/apisearch/lib/Result/ResultAggregations.js"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./Result/Counter */ "./node_modules/apisearch/lib/Result/Counter.js"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./Result/Result */ "./node_modules/apisearch/lib/Result/Result.js"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./Transformer/ReadTransformer */ "./node_modules/apisearch/lib/Transformer/ReadTransformer.js"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./Transformer/Transformer */ "./node_modules/apisearch/lib/Transformer/Transformer.js"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./Transformer/WriteTransformer */ "./node_modules/apisearch/lib/Transformer/WriteTransformer.js"), exports);


/***/ }),

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/***/ ((module) => {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function errorListener(err) {
      emitter.removeListener(name, resolver);
      reject(err);
    }

    function resolver() {
      if (typeof emitter.removeListener === 'function') {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    };

    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
    if (name !== 'error') {
      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
    }
  });
}

function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
  if (typeof emitter.on === 'function') {
    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
  }
}

function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === 'function') {
    if (flags.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === 'function') {
    // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
      // IE does not have builtin `{ once: true }` support so we
      // have to do it manually.
      if (flags.once) {
        emitter.removeEventListener(name, wrapListener);
      }
      listener(arg);
    });
  } else {
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
  }
}


/***/ }),

/***/ "./node_modules/mustache/mustache.js":
/*!*******************************************!*\
  !*** ./node_modules/mustache/mustache.js ***!
  \*******************************************/
/***/ (function(module) {

(function (global, factory) {
   true ? module.exports = factory() :
  0;
}(this, (function () { 'use strict';

  /*!
   * mustache.js - Logic-less {{mustache}} templates with JavaScript
   * http://github.com/janl/mustache.js
   */

  var objectToString = Object.prototype.toString;
  var isArray = Array.isArray || function isArrayPolyfill (object) {
    return objectToString.call(object) === '[object Array]';
  };

  function isFunction (object) {
    return typeof object === 'function';
  }

  /**
   * More correct typeof string handling array
   * which normally returns typeof 'object'
   */
  function typeStr (obj) {
    return isArray(obj) ? 'array' : typeof obj;
  }

  function escapeRegExp (string) {
    return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
  }

  /**
   * Null safe way of checking whether or not an object,
   * including its prototype, has a given property
   */
  function hasProperty (obj, propName) {
    return obj != null && typeof obj === 'object' && (propName in obj);
  }

  /**
   * Safe way of detecting whether or not the given thing is a primitive and
   * whether it has the given property
   */
  function primitiveHasOwnProperty (primitive, propName) {
    return (
      primitive != null
      && typeof primitive !== 'object'
      && primitive.hasOwnProperty
      && primitive.hasOwnProperty(propName)
    );
  }

  // Workaround for https://issues.apache.org/jira/browse/COUCHDB-577
  // See https://github.com/janl/mustache.js/issues/189
  var regExpTest = RegExp.prototype.test;
  function testRegExp (re, string) {
    return regExpTest.call(re, string);
  }

  var nonSpaceRe = /\S/;
  function isWhitespace (string) {
    return !testRegExp(nonSpaceRe, string);
  }

  var entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
  };

  function escapeHtml (string) {
    return String(string).replace(/[&<>"'`=\/]/g, function fromEntityMap (s) {
      return entityMap[s];
    });
  }

  var whiteRe = /\s*/;
  var spaceRe = /\s+/;
  var equalsRe = /\s*=/;
  var curlyRe = /\s*\}/;
  var tagRe = /#|\^|\/|>|\{|&|=|!/;

  /**
   * Breaks up the given `template` string into a tree of tokens. If the `tags`
   * argument is given here it must be an array with two string values: the
   * opening and closing tags used in the template (e.g. [ "<%", "%>" ]). Of
   * course, the default is to use mustaches (i.e. mustache.tags).
   *
   * A token is an array with at least 4 elements. The first element is the
   * mustache symbol that was used inside the tag, e.g. "#" or "&". If the tag
   * did not contain a symbol (i.e. {{myValue}}) this element is "name". For
   * all text that appears outside a symbol this element is "text".
   *
   * The second element of a token is its "value". For mustache tags this is
   * whatever else was inside the tag besides the opening symbol. For text tokens
   * this is the text itself.
   *
   * The third and fourth elements of the token are the start and end indices,
   * respectively, of the token in the original template.
   *
   * Tokens that are the root node of a subtree contain two more elements: 1) an
   * array of tokens in the subtree and 2) the index in the original template at
   * which the closing tag for that section begins.
   *
   * Tokens for partials also contain two more elements: 1) a string value of
   * indendation prior to that tag and 2) the index of that tag on that line -
   * eg a value of 2 indicates the partial is the third tag on this line.
   */
  function parseTemplate (template, tags) {
    if (!template)
      return [];
    var lineHasNonSpace = false;
    var sections = [];     // Stack to hold section tokens
    var tokens = [];       // Buffer to hold the tokens
    var spaces = [];       // Indices of whitespace tokens on the current line
    var hasTag = false;    // Is there a {{tag}} on the current line?
    var nonSpace = false;  // Is there a non-space char on the current line?
    var indentation = '';  // Tracks indentation for tags that use it
    var tagIndex = 0;      // Stores a count of number of tags encountered on a line

    // Strips all whitespace tokens array for the current line
    // if there was a {{#tag}} on it and otherwise only space.
    function stripSpace () {
      if (hasTag && !nonSpace) {
        while (spaces.length)
          delete tokens[spaces.pop()];
      } else {
        spaces = [];
      }

      hasTag = false;
      nonSpace = false;
    }

    var openingTagRe, closingTagRe, closingCurlyRe;
    function compileTags (tagsToCompile) {
      if (typeof tagsToCompile === 'string')
        tagsToCompile = tagsToCompile.split(spaceRe, 2);

      if (!isArray(tagsToCompile) || tagsToCompile.length !== 2)
        throw new Error('Invalid tags: ' + tagsToCompile);

      openingTagRe = new RegExp(escapeRegExp(tagsToCompile[0]) + '\\s*');
      closingTagRe = new RegExp('\\s*' + escapeRegExp(tagsToCompile[1]));
      closingCurlyRe = new RegExp('\\s*' + escapeRegExp('}' + tagsToCompile[1]));
    }

    compileTags(tags || mustache.tags);

    var scanner = new Scanner(template);

    var start, type, value, chr, token, openSection;
    while (!scanner.eos()) {
      start = scanner.pos;

      // Match any text between tags.
      value = scanner.scanUntil(openingTagRe);

      if (value) {
        for (var i = 0, valueLength = value.length; i < valueLength; ++i) {
          chr = value.charAt(i);

          if (isWhitespace(chr)) {
            spaces.push(tokens.length);
            indentation += chr;
          } else {
            nonSpace = true;
            lineHasNonSpace = true;
            indentation += ' ';
          }

          tokens.push([ 'text', chr, start, start + 1 ]);
          start += 1;

          // Check for whitespace on the current line.
          if (chr === '\n') {
            stripSpace();
            indentation = '';
            tagIndex = 0;
            lineHasNonSpace = false;
          }
        }
      }

      // Match the opening tag.
      if (!scanner.scan(openingTagRe))
        break;

      hasTag = true;

      // Get the tag type.
      type = scanner.scan(tagRe) || 'name';
      scanner.scan(whiteRe);

      // Get the tag value.
      if (type === '=') {
        value = scanner.scanUntil(equalsRe);
        scanner.scan(equalsRe);
        scanner.scanUntil(closingTagRe);
      } else if (type === '{') {
        value = scanner.scanUntil(closingCurlyRe);
        scanner.scan(curlyRe);
        scanner.scanUntil(closingTagRe);
        type = '&';
      } else {
        value = scanner.scanUntil(closingTagRe);
      }

      // Match the closing tag.
      if (!scanner.scan(closingTagRe))
        throw new Error('Unclosed tag at ' + scanner.pos);

      if (type == '>') {
        token = [ type, value, start, scanner.pos, indentation, tagIndex, lineHasNonSpace ];
      } else {
        token = [ type, value, start, scanner.pos ];
      }
      tagIndex++;
      tokens.push(token);

      if (type === '#' || type === '^') {
        sections.push(token);
      } else if (type === '/') {
        // Check section nesting.
        openSection = sections.pop();

        if (!openSection)
          throw new Error('Unopened section "' + value + '" at ' + start);

        if (openSection[1] !== value)
          throw new Error('Unclosed section "' + openSection[1] + '" at ' + start);
      } else if (type === 'name' || type === '{' || type === '&') {
        nonSpace = true;
      } else if (type === '=') {
        // Set the tags for the next time around.
        compileTags(value);
      }
    }

    stripSpace();

    // Make sure there are no open sections when we're done.
    openSection = sections.pop();

    if (openSection)
      throw new Error('Unclosed section "' + openSection[1] + '" at ' + scanner.pos);

    return nestTokens(squashTokens(tokens));
  }

  /**
   * Combines the values of consecutive text tokens in the given `tokens` array
   * to a single token.
   */
  function squashTokens (tokens) {
    var squashedTokens = [];

    var token, lastToken;
    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
      token = tokens[i];

      if (token) {
        if (token[0] === 'text' && lastToken && lastToken[0] === 'text') {
          lastToken[1] += token[1];
          lastToken[3] = token[3];
        } else {
          squashedTokens.push(token);
          lastToken = token;
        }
      }
    }

    return squashedTokens;
  }

  /**
   * Forms the given array of `tokens` into a nested tree structure where
   * tokens that represent a section have two additional items: 1) an array of
   * all tokens that appear in that section and 2) the index in the original
   * template that represents the end of that section.
   */
  function nestTokens (tokens) {
    var nestedTokens = [];
    var collector = nestedTokens;
    var sections = [];

    var token, section;
    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
      token = tokens[i];

      switch (token[0]) {
        case '#':
        case '^':
          collector.push(token);
          sections.push(token);
          collector = token[4] = [];
          break;
        case '/':
          section = sections.pop();
          section[5] = token[2];
          collector = sections.length > 0 ? sections[sections.length - 1][4] : nestedTokens;
          break;
        default:
          collector.push(token);
      }
    }

    return nestedTokens;
  }

  /**
   * A simple string scanner that is used by the template parser to find
   * tokens in template strings.
   */
  function Scanner (string) {
    this.string = string;
    this.tail = string;
    this.pos = 0;
  }

  /**
   * Returns `true` if the tail is empty (end of string).
   */
  Scanner.prototype.eos = function eos () {
    return this.tail === '';
  };

  /**
   * Tries to match the given regular expression at the current position.
   * Returns the matched text if it can match, the empty string otherwise.
   */
  Scanner.prototype.scan = function scan (re) {
    var match = this.tail.match(re);

    if (!match || match.index !== 0)
      return '';

    var string = match[0];

    this.tail = this.tail.substring(string.length);
    this.pos += string.length;

    return string;
  };

  /**
   * Skips all text until the given regular expression can be matched. Returns
   * the skipped string, which is the entire tail if no match can be made.
   */
  Scanner.prototype.scanUntil = function scanUntil (re) {
    var index = this.tail.search(re), match;

    switch (index) {
      case -1:
        match = this.tail;
        this.tail = '';
        break;
      case 0:
        match = '';
        break;
      default:
        match = this.tail.substring(0, index);
        this.tail = this.tail.substring(index);
    }

    this.pos += match.length;

    return match;
  };

  /**
   * Represents a rendering context by wrapping a view object and
   * maintaining a reference to the parent context.
   */
  function Context (view, parentContext) {
    this.view = view;
    this.cache = { '.': this.view };
    this.parent = parentContext;
  }

  /**
   * Creates a new context using the given view with this context
   * as the parent.
   */
  Context.prototype.push = function push (view) {
    return new Context(view, this);
  };

  /**
   * Returns the value of the given name in this context, traversing
   * up the context hierarchy if the value is absent in this context's view.
   */
  Context.prototype.lookup = function lookup (name) {
    var cache = this.cache;

    var value;
    if (cache.hasOwnProperty(name)) {
      value = cache[name];
    } else {
      var context = this, intermediateValue, names, index, lookupHit = false;

      while (context) {
        if (name.indexOf('.') > 0) {
          intermediateValue = context.view;
          names = name.split('.');
          index = 0;

          /**
           * Using the dot notion path in `name`, we descend through the
           * nested objects.
           *
           * To be certain that the lookup has been successful, we have to
           * check if the last object in the path actually has the property
           * we are looking for. We store the result in `lookupHit`.
           *
           * This is specially necessary for when the value has been set to
           * `undefined` and we want to avoid looking up parent contexts.
           *
           * In the case where dot notation is used, we consider the lookup
           * to be successful even if the last "object" in the path is
           * not actually an object but a primitive (e.g., a string, or an
           * integer), because it is sometimes useful to access a property
           * of an autoboxed primitive, such as the length of a string.
           **/
          while (intermediateValue != null && index < names.length) {
            if (index === names.length - 1)
              lookupHit = (
                hasProperty(intermediateValue, names[index])
                || primitiveHasOwnProperty(intermediateValue, names[index])
              );

            intermediateValue = intermediateValue[names[index++]];
          }
        } else {
          intermediateValue = context.view[name];

          /**
           * Only checking against `hasProperty`, which always returns `false` if
           * `context.view` is not an object. Deliberately omitting the check
           * against `primitiveHasOwnProperty` if dot notation is not used.
           *
           * Consider this example:
           * ```
           * Mustache.render("The length of a football field is {{#length}}{{length}}{{/length}}.", {length: "100 yards"})
           * ```
           *
           * If we were to check also against `primitiveHasOwnProperty`, as we do
           * in the dot notation case, then render call would return:
           *
           * "The length of a football field is 9."
           *
           * rather than the expected:
           *
           * "The length of a football field is 100 yards."
           **/
          lookupHit = hasProperty(context.view, name);
        }

        if (lookupHit) {
          value = intermediateValue;
          break;
        }

        context = context.parent;
      }

      cache[name] = value;
    }

    if (isFunction(value))
      value = value.call(this.view);

    return value;
  };

  /**
   * A Writer knows how to take a stream of tokens and render them to a
   * string, given a context. It also maintains a cache of templates to
   * avoid the need to parse the same template twice.
   */
  function Writer () {
    this.templateCache = {
      _cache: {},
      set: function set (key, value) {
        this._cache[key] = value;
      },
      get: function get (key) {
        return this._cache[key];
      },
      clear: function clear () {
        this._cache = {};
      }
    };
  }

  /**
   * Clears all cached templates in this writer.
   */
  Writer.prototype.clearCache = function clearCache () {
    if (typeof this.templateCache !== 'undefined') {
      this.templateCache.clear();
    }
  };

  /**
   * Parses and caches the given `template` according to the given `tags` or
   * `mustache.tags` if `tags` is omitted,  and returns the array of tokens
   * that is generated from the parse.
   */
  Writer.prototype.parse = function parse (template, tags) {
    var cache = this.templateCache;
    var cacheKey = template + ':' + (tags || mustache.tags).join(':');
    var isCacheEnabled = typeof cache !== 'undefined';
    var tokens = isCacheEnabled ? cache.get(cacheKey) : undefined;

    if (tokens == undefined) {
      tokens = parseTemplate(template, tags);
      isCacheEnabled && cache.set(cacheKey, tokens);
    }
    return tokens;
  };

  /**
   * High-level method that is used to render the given `template` with
   * the given `view`.
   *
   * The optional `partials` argument may be an object that contains the
   * names and templates of partials that are used in the template. It may
   * also be a function that is used to load partial templates on the fly
   * that takes a single argument: the name of the partial.
   *
   * If the optional `config` argument is given here, then it should be an
   * object with a `tags` attribute or an `escape` attribute or both.
   * If an array is passed, then it will be interpreted the same way as
   * a `tags` attribute on a `config` object.
   *
   * The `tags` attribute of a `config` object must be an array with two
   * string values: the opening and closing tags used in the template (e.g.
   * [ "<%", "%>" ]). The default is to mustache.tags.
   *
   * The `escape` attribute of a `config` object must be a function which
   * accepts a string as input and outputs a safely escaped string.
   * If an `escape` function is not provided, then an HTML-safe string
   * escaping function is used as the default.
   */
  Writer.prototype.render = function render (template, view, partials, config) {
    var tags = this.getConfigTags(config);
    var tokens = this.parse(template, tags);
    var context = (view instanceof Context) ? view : new Context(view, undefined);
    return this.renderTokens(tokens, context, partials, template, config);
  };

  /**
   * Low-level method that renders the given array of `tokens` using
   * the given `context` and `partials`.
   *
   * Note: The `originalTemplate` is only ever used to extract the portion
   * of the original template that was contained in a higher-order section.
   * If the template doesn't use higher-order sections, this argument may
   * be omitted.
   */
  Writer.prototype.renderTokens = function renderTokens (tokens, context, partials, originalTemplate, config) {
    var buffer = '';

    var token, symbol, value;
    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
      value = undefined;
      token = tokens[i];
      symbol = token[0];

      if (symbol === '#') value = this.renderSection(token, context, partials, originalTemplate, config);
      else if (symbol === '^') value = this.renderInverted(token, context, partials, originalTemplate, config);
      else if (symbol === '>') value = this.renderPartial(token, context, partials, config);
      else if (symbol === '&') value = this.unescapedValue(token, context);
      else if (symbol === 'name') value = this.escapedValue(token, context, config);
      else if (symbol === 'text') value = this.rawValue(token);

      if (value !== undefined)
        buffer += value;
    }

    return buffer;
  };

  Writer.prototype.renderSection = function renderSection (token, context, partials, originalTemplate, config) {
    var self = this;
    var buffer = '';
    var value = context.lookup(token[1]);

    // This function is used to render an arbitrary template
    // in the current context by higher-order sections.
    function subRender (template) {
      return self.render(template, context, partials, config);
    }

    if (!value) return;

    if (isArray(value)) {
      for (var j = 0, valueLength = value.length; j < valueLength; ++j) {
        buffer += this.renderTokens(token[4], context.push(value[j]), partials, originalTemplate, config);
      }
    } else if (typeof value === 'object' || typeof value === 'string' || typeof value === 'number') {
      buffer += this.renderTokens(token[4], context.push(value), partials, originalTemplate, config);
    } else if (isFunction(value)) {
      if (typeof originalTemplate !== 'string')
        throw new Error('Cannot use higher-order sections without the original template');

      // Extract the portion of the original template that the section contains.
      value = value.call(context.view, originalTemplate.slice(token[3], token[5]), subRender);

      if (value != null)
        buffer += value;
    } else {
      buffer += this.renderTokens(token[4], context, partials, originalTemplate, config);
    }
    return buffer;
  };

  Writer.prototype.renderInverted = function renderInverted (token, context, partials, originalTemplate, config) {
    var value = context.lookup(token[1]);

    // Use JavaScript's definition of falsy. Include empty arrays.
    // See https://github.com/janl/mustache.js/issues/186
    if (!value || (isArray(value) && value.length === 0))
      return this.renderTokens(token[4], context, partials, originalTemplate, config);
  };

  Writer.prototype.indentPartial = function indentPartial (partial, indentation, lineHasNonSpace) {
    var filteredIndentation = indentation.replace(/[^ \t]/g, '');
    var partialByNl = partial.split('\n');
    for (var i = 0; i < partialByNl.length; i++) {
      if (partialByNl[i].length && (i > 0 || !lineHasNonSpace)) {
        partialByNl[i] = filteredIndentation + partialByNl[i];
      }
    }
    return partialByNl.join('\n');
  };

  Writer.prototype.renderPartial = function renderPartial (token, context, partials, config) {
    if (!partials) return;
    var tags = this.getConfigTags(config);

    var value = isFunction(partials) ? partials(token[1]) : partials[token[1]];
    if (value != null) {
      var lineHasNonSpace = token[6];
      var tagIndex = token[5];
      var indentation = token[4];
      var indentedValue = value;
      if (tagIndex == 0 && indentation) {
        indentedValue = this.indentPartial(value, indentation, lineHasNonSpace);
      }
      var tokens = this.parse(indentedValue, tags);
      return this.renderTokens(tokens, context, partials, indentedValue, config);
    }
  };

  Writer.prototype.unescapedValue = function unescapedValue (token, context) {
    var value = context.lookup(token[1]);
    if (value != null)
      return value;
  };

  Writer.prototype.escapedValue = function escapedValue (token, context, config) {
    var escape = this.getConfigEscape(config) || mustache.escape;
    var value = context.lookup(token[1]);
    if (value != null)
      return (typeof value === 'number' && escape === mustache.escape) ? String(value) : escape(value);
  };

  Writer.prototype.rawValue = function rawValue (token) {
    return token[1];
  };

  Writer.prototype.getConfigTags = function getConfigTags (config) {
    if (isArray(config)) {
      return config;
    }
    else if (config && typeof config === 'object') {
      return config.tags;
    }
    else {
      return undefined;
    }
  };

  Writer.prototype.getConfigEscape = function getConfigEscape (config) {
    if (config && typeof config === 'object' && !isArray(config)) {
      return config.escape;
    }
    else {
      return undefined;
    }
  };

  var mustache = {
    name: 'mustache.js',
    version: '4.2.0',
    tags: [ '{{', '}}' ],
    clearCache: undefined,
    escape: undefined,
    parse: undefined,
    render: undefined,
    Scanner: undefined,
    Context: undefined,
    Writer: undefined,
    /**
     * Allows a user to override the default caching strategy, by providing an
     * object with set, get and clear methods. This can also be used to disable
     * the cache by setting it to the literal `undefined`.
     */
    set templateCache (cache) {
      defaultWriter.templateCache = cache;
    },
    /**
     * Gets the default or overridden caching object from the default writer.
     */
    get templateCache () {
      return defaultWriter.templateCache;
    }
  };

  // All high-level mustache.* functions use this writer.
  var defaultWriter = new Writer();

  /**
   * Clears all cached templates in the default writer.
   */
  mustache.clearCache = function clearCache () {
    return defaultWriter.clearCache();
  };

  /**
   * Parses and caches the given template in the default writer and returns the
   * array of tokens it contains. Doing this ahead of time avoids the need to
   * parse templates on the fly as they are rendered.
   */
  mustache.parse = function parse (template, tags) {
    return defaultWriter.parse(template, tags);
  };

  /**
   * Renders the `template` with the given `view`, `partials`, and `config`
   * using the default writer.
   */
  mustache.render = function render (template, view, partials, config) {
    if (typeof template !== 'string') {
      throw new TypeError('Invalid template! Template should be a "string" ' +
                          'but "' + typeStr(template) + '" was given as the first ' +
                          'argument for mustache#render(template, view, partials)');
    }

    return defaultWriter.render(template, view, partials, config);
  };

  // Export the escaping function so that the user may override it.
  // See https://github.com/janl/mustache.js/issues/244
  mustache.escape = escapeHtml;

  // Export these mainly for testing, but also for advanced usage.
  mustache.Scanner = Scanner;
  mustache.Context = Context;
  mustache.Writer = Writer;

  return mustache;

})));


/***/ }),

/***/ "./node_modules/preact/compat/dist/compat.module.js":
/*!**********************************************************!*\
  !*** ./node_modules/preact/compat/dist/compat.module.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Children": () => (/* binding */ A),
/* harmony export */   "Component": () => (/* reexport safe */ preact__WEBPACK_IMPORTED_MODULE_1__.Component),
/* harmony export */   "Fragment": () => (/* reexport safe */ preact__WEBPACK_IMPORTED_MODULE_1__.Fragment),
/* harmony export */   "PureComponent": () => (/* binding */ w),
/* harmony export */   "StrictMode": () => (/* binding */ an),
/* harmony export */   "Suspense": () => (/* binding */ F),
/* harmony export */   "SuspenseList": () => (/* binding */ D),
/* harmony export */   "__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED": () => (/* binding */ tn),
/* harmony export */   "cloneElement": () => (/* binding */ on),
/* harmony export */   "createContext": () => (/* reexport safe */ preact__WEBPACK_IMPORTED_MODULE_1__.createContext),
/* harmony export */   "createElement": () => (/* reexport safe */ preact__WEBPACK_IMPORTED_MODULE_1__.createElement),
/* harmony export */   "createFactory": () => (/* binding */ rn),
/* harmony export */   "createPortal": () => (/* binding */ P),
/* harmony export */   "createRef": () => (/* reexport safe */ preact__WEBPACK_IMPORTED_MODULE_1__.createRef),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "findDOMNode": () => (/* binding */ ln),
/* harmony export */   "forwardRef": () => (/* binding */ k),
/* harmony export */   "hydrate": () => (/* binding */ Z),
/* harmony export */   "isValidElement": () => (/* binding */ un),
/* harmony export */   "lazy": () => (/* binding */ j),
/* harmony export */   "memo": () => (/* binding */ C),
/* harmony export */   "render": () => (/* binding */ H),
/* harmony export */   "unmountComponentAtNode": () => (/* binding */ cn),
/* harmony export */   "unstable_batchedUpdates": () => (/* binding */ fn),
/* harmony export */   "useCallback": () => (/* reexport safe */ preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useCallback),
/* harmony export */   "useContext": () => (/* reexport safe */ preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useContext),
/* harmony export */   "useDebugValue": () => (/* reexport safe */ preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useDebugValue),
/* harmony export */   "useEffect": () => (/* reexport safe */ preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useEffect),
/* harmony export */   "useErrorBoundary": () => (/* reexport safe */ preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useErrorBoundary),
/* harmony export */   "useImperativeHandle": () => (/* reexport safe */ preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useImperativeHandle),
/* harmony export */   "useLayoutEffect": () => (/* reexport safe */ preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect),
/* harmony export */   "useMemo": () => (/* reexport safe */ preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useMemo),
/* harmony export */   "useReducer": () => (/* reexport safe */ preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useReducer),
/* harmony export */   "useRef": () => (/* reexport safe */ preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useRef),
/* harmony export */   "useState": () => (/* reexport safe */ preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useState),
/* harmony export */   "version": () => (/* binding */ en)
/* harmony export */ });
/* harmony import */ var preact_hooks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact/hooks */ "./node_modules/preact/hooks/dist/hooks.module.js");
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
function E(n,t){for(var e in t)n[e]=t[e];return n}function S(n,t){for(var e in n)if("__source"!==e&&!(e in t))return!0;for(var r in t)if("__source"!==r&&n[r]!==t[r])return!0;return!1}function w(n){this.props=n}function C(n,t){function e(n){var e=this.props.ref,r=e==n.ref;return!r&&e&&(e.call?e(null):e.current=null),t?!t(this.props,n)||!r:S(this.props,n)}function r(t){return this.shouldComponentUpdate=e,(0,preact__WEBPACK_IMPORTED_MODULE_1__.createElement)(n,t)}return r.displayName="Memo("+(n.displayName||n.name)+")",r.prototype.isReactComponent=!0,r.__f=!0,r}(w.prototype=new preact__WEBPACK_IMPORTED_MODULE_1__.Component).isPureReactComponent=!0,w.prototype.shouldComponentUpdate=function(n,t){return S(this.props,n)||S(this.state,t)};var R=preact__WEBPACK_IMPORTED_MODULE_1__.options.__b;preact__WEBPACK_IMPORTED_MODULE_1__.options.__b=function(n){n.type&&n.type.__f&&n.ref&&(n.props.ref=n.ref,n.ref=null),R&&R(n)};var x="undefined"!=typeof Symbol&&Symbol.for&&Symbol.for("react.forward_ref")||3911;function k(n){function t(t,e){var r=E({},t);return delete r.ref,n(r,(e=t.ref||e)&&("object"!=typeof e||"current"in e)?e:null)}return t.$$typeof=x,t.render=t,t.prototype.isReactComponent=t.__f=!0,t.displayName="ForwardRef("+(n.displayName||n.name)+")",t}var O=function(n,t){return null==n?null:(0,preact__WEBPACK_IMPORTED_MODULE_1__.toChildArray)((0,preact__WEBPACK_IMPORTED_MODULE_1__.toChildArray)(n).map(t))},A={map:O,forEach:O,count:function(n){return n?(0,preact__WEBPACK_IMPORTED_MODULE_1__.toChildArray)(n).length:0},only:function(n){var t=(0,preact__WEBPACK_IMPORTED_MODULE_1__.toChildArray)(n);if(1!==t.length)throw"Children.only";return t[0]},toArray:preact__WEBPACK_IMPORTED_MODULE_1__.toChildArray},N=preact__WEBPACK_IMPORTED_MODULE_1__.options.__e;function L(n){return n&&((n=E({},n)).__c=null,n.__k=n.__k&&n.__k.map(L)),n}function U(n){return n&&(n.__v=null,n.__k=n.__k&&n.__k.map(U)),n}function F(){this.__u=0,this.t=null,this.__b=null}function M(n){var t=n.__.__c;return t&&t.__e&&t.__e(n)}function j(n){var t,e,r;function u(u){if(t||(t=n()).then(function(n){e=n.default||n},function(n){r=n}),r)throw r;if(!e)throw t;return (0,preact__WEBPACK_IMPORTED_MODULE_1__.createElement)(e,u)}return u.displayName="Lazy",u.__f=!0,u}function D(){this.u=null,this.o=null}preact__WEBPACK_IMPORTED_MODULE_1__.options.__e=function(n,t,e){if(n.then)for(var r,u=t;u=u.__;)if((r=u.__c)&&r.__c)return null==t.__e&&(t.__e=e.__e,t.__k=e.__k),r.__c(n,t.__c);N(n,t,e)},(F.prototype=new preact__WEBPACK_IMPORTED_MODULE_1__.Component).__c=function(n,t){var e=this;null==e.t&&(e.t=[]),e.t.push(t);var r=M(e.__v),u=!1,o=function(){u||(u=!0,t.componentWillUnmount=t.__c,r?r(i):i())};t.__c=t.componentWillUnmount,t.componentWillUnmount=function(){o(),t.__c&&t.__c()};var i=function(){var n;if(!--e.__u)for(e.__v.__k[0]=U(e.state.__e),e.setState({__e:e.__b=null});n=e.t.pop();)n.forceUpdate()},c=e.__v;c&&!0===c.__h||e.__u++||e.setState({__e:e.__b=e.__v.__k[0]}),n.then(o,o)},F.prototype.componentWillUnmount=function(){this.t=[]},F.prototype.render=function(n,t){this.__b&&(this.__v.__k&&(this.__v.__k[0]=L(this.__b)),this.__b=null);var e=t.__e&&(0,preact__WEBPACK_IMPORTED_MODULE_1__.createElement)(preact__WEBPACK_IMPORTED_MODULE_1__.Fragment,null,n.fallback);return e&&(e.__h=null),[(0,preact__WEBPACK_IMPORTED_MODULE_1__.createElement)(preact__WEBPACK_IMPORTED_MODULE_1__.Fragment,null,t.__e?null:n.children),e]};var I=function(n,t,e){if(++e[1]===e[0]&&n.o.delete(t),n.props.revealOrder&&("t"!==n.props.revealOrder[0]||!n.o.size))for(e=n.u;e;){for(;e.length>3;)e.pop()();if(e[1]<e[0])break;n.u=e=e[2]}};function T(n){return this.getChildContext=function(){return n.context},n.children}function W(n){var t=this,e=n.i,r=(0,preact__WEBPACK_IMPORTED_MODULE_1__.createElement)(T,{context:t.context},n.__v);t.componentWillUnmount=function(){var n=t.l.parentNode;n&&n.removeChild(t.l),(0,preact__WEBPACK_IMPORTED_MODULE_1__.__u)(t.s)},t.i&&t.i!==e&&(t.componentWillUnmount(),t.h=!1),n.__v?t.h?(e.__k=t.__k,(0,preact__WEBPACK_IMPORTED_MODULE_1__.render)(r,e),t.__k=e.__k):(t.l=document.createTextNode(""),t.__k=e.__k,(0,preact__WEBPACK_IMPORTED_MODULE_1__.hydrate)("",e),e.appendChild(t.l),t.h=!0,t.i=e,(0,preact__WEBPACK_IMPORTED_MODULE_1__.render)(r,e,t.l),e.__k=t.__k,t.__k=t.l.__k):t.h&&t.componentWillUnmount(),t.s=r}function P(n,t){return (0,preact__WEBPACK_IMPORTED_MODULE_1__.createElement)(W,{__v:n,i:t})}(D.prototype=new preact__WEBPACK_IMPORTED_MODULE_1__.Component).__e=function(n){var t=this,e=M(t.__v),r=t.o.get(n);return r[0]++,function(u){var o=function(){t.props.revealOrder?(r.push(u),I(t,n,r)):u()};e?e(o):o()}},D.prototype.render=function(n){this.u=null,this.o=new Map;var t=(0,preact__WEBPACK_IMPORTED_MODULE_1__.toChildArray)(n.children);n.revealOrder&&"b"===n.revealOrder[0]&&t.reverse();for(var e=t.length;e--;)this.o.set(t[e],this.u=[1,0,this.u]);return n.children},D.prototype.componentDidUpdate=D.prototype.componentDidMount=function(){var n=this;this.o.forEach(function(t,e){I(n,e,t)})};var z="undefined"!=typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103,V=/^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|fill|flood|font|glyph(?!R)|horiz|marker(?!H|W|U)|overline|paint|stop|strikethrough|stroke|text(?!L)|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/,B="undefined"!=typeof Symbol?/fil|che|rad/i:/fil|che|ra/i;function H(n,t,e){return null==t.__k&&(t.textContent=""),(0,preact__WEBPACK_IMPORTED_MODULE_1__.render)(n,t),"function"==typeof e&&e(),n?n.__c:null}function Z(n,t,e){return (0,preact__WEBPACK_IMPORTED_MODULE_1__.hydrate)(n,t),"function"==typeof e&&e(),n?n.__c:null}preact__WEBPACK_IMPORTED_MODULE_1__.Component.prototype.isReactComponent={},["componentWillMount","componentWillReceiveProps","componentWillUpdate"].forEach(function(n){Object.defineProperty(preact__WEBPACK_IMPORTED_MODULE_1__.Component.prototype,n,{configurable:!0,get:function(){return this["UNSAFE_"+n]},set:function(t){Object.defineProperty(this,n,{configurable:!0,writable:!0,value:t})}})});var Y=preact__WEBPACK_IMPORTED_MODULE_1__.options.event;function $(){}function q(){return this.cancelBubble}function G(){return this.defaultPrevented}preact__WEBPACK_IMPORTED_MODULE_1__.options.event=function(n){return Y&&(n=Y(n)),n.persist=$,n.isPropagationStopped=q,n.isDefaultPrevented=G,n.nativeEvent=n};var J,K={configurable:!0,get:function(){return this.class}},Q={configurable:!0,get:function(){return this.className}},X=preact__WEBPACK_IMPORTED_MODULE_1__.options.vnode;preact__WEBPACK_IMPORTED_MODULE_1__.options.vnode=function(n){var t=n.type,e=n.props,r=e;if("string"==typeof t){for(var u in r={},e){var o=e[u];"defaultValue"===u&&"value"in e&&null==e.value?u="value":"download"===u&&!0===o?o="":/ondoubleclick/i.test(u)?u="ondblclick":/^onchange(textarea|input)/i.test(u+t)&&!B.test(e.type)?u="oninput":/^on(Ani|Tra|Tou|BeforeInp)/.test(u)?u=u.toLowerCase():V.test(u)?u=u.replace(/[A-Z0-9]/,"-$&").toLowerCase():null===o&&(o=void 0),r[u]=o}"select"==t&&r.multiple&&Array.isArray(r.value)&&(r.value=(0,preact__WEBPACK_IMPORTED_MODULE_1__.toChildArray)(e.children).forEach(function(n){n.props.selected=-1!=r.value.indexOf(n.props.value)})),n.props=r}t&&r&&("className"in r?Object.defineProperty(r,"class",Q):Object.defineProperty(r,"className",K)),n.$$typeof=z,X&&X(n)};var nn=preact__WEBPACK_IMPORTED_MODULE_1__.options.__r;preact__WEBPACK_IMPORTED_MODULE_1__.options.__r=function(n){nn&&nn(n),J=n.__c};var tn={ReactCurrentDispatcher:{current:{readContext:function(n){return J.__n[n.__c].props.value}}}},en="16.8.0";function rn(n){return preact__WEBPACK_IMPORTED_MODULE_1__.createElement.bind(null,n)}function un(n){return!!n&&n.$$typeof===z}function on(n){return un(n)?preact__WEBPACK_IMPORTED_MODULE_1__.cloneElement.apply(null,arguments):n}function cn(n){return!!n.__k&&((0,preact__WEBPACK_IMPORTED_MODULE_1__.render)(null,n),!0)}function ln(n){return n&&(n.base||1===n.nodeType&&n)||null}var fn=function(n,t){return n(t)},an=preact__WEBPACK_IMPORTED_MODULE_1__.Fragment;/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({useState:preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useState,useReducer:preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useReducer,useEffect:preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useEffect,useLayoutEffect:preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect,useRef:preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useRef,useImperativeHandle:preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useImperativeHandle,useMemo:preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useMemo,useCallback:preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useCallback,useContext:preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useContext,useDebugValue:preact_hooks__WEBPACK_IMPORTED_MODULE_0__.useDebugValue,version:"16.8.0",Children:A,render:H,hydrate:Z,unmountComponentAtNode:cn,createPortal:P,createElement:preact__WEBPACK_IMPORTED_MODULE_1__.createElement,createContext:preact__WEBPACK_IMPORTED_MODULE_1__.createContext,createFactory:rn,cloneElement:on,createRef:preact__WEBPACK_IMPORTED_MODULE_1__.createRef,Fragment:preact__WEBPACK_IMPORTED_MODULE_1__.Fragment,isValidElement:un,findDOMNode:ln,Component:preact__WEBPACK_IMPORTED_MODULE_1__.Component,PureComponent:w,memo:C,forwardRef:k,unstable_batchedUpdates:fn,StrictMode:preact__WEBPACK_IMPORTED_MODULE_1__.Fragment,Suspense:F,SuspenseList:D,lazy:j,__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:tn});
//# sourceMappingURL=compat.module.js.map


/***/ }),

/***/ "./node_modules/preact/dist/preact.module.js":
/*!***************************************************!*\
  !*** ./node_modules/preact/dist/preact.module.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Component": () => (/* binding */ d),
/* harmony export */   "Fragment": () => (/* binding */ p),
/* harmony export */   "__u": () => (/* binding */ L),
/* harmony export */   "cloneElement": () => (/* binding */ q),
/* harmony export */   "createContext": () => (/* binding */ B),
/* harmony export */   "createElement": () => (/* binding */ h),
/* harmony export */   "createRef": () => (/* binding */ y),
/* harmony export */   "h": () => (/* binding */ h),
/* harmony export */   "hydrate": () => (/* binding */ S),
/* harmony export */   "isValidElement": () => (/* binding */ l),
/* harmony export */   "options": () => (/* binding */ n),
/* harmony export */   "render": () => (/* binding */ O),
/* harmony export */   "toChildArray": () => (/* binding */ b)
/* harmony export */ });
var n,l,u,i,t,o,r,f={},e=[],c=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function s(n,l){for(var u in l)n[u]=l[u];return n}function a(n){var l=n.parentNode;l&&l.removeChild(n)}function h(n,l,u){var i,t,o,r=arguments,f={};for(o in l)"key"==o?i=l[o]:"ref"==o?t=l[o]:f[o]=l[o];if(arguments.length>3)for(u=[u],o=3;o<arguments.length;o++)u.push(r[o]);if(null!=u&&(f.children=u),"function"==typeof n&&null!=n.defaultProps)for(o in n.defaultProps)void 0===f[o]&&(f[o]=n.defaultProps[o]);return v(n,f,i,t,null)}function v(l,u,i,t,o){var r={type:l,props:u,key:i,ref:t,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:o};return null==o&&(r.__v=r),null!=n.vnode&&n.vnode(r),r}function y(){return{current:null}}function p(n){return n.children}function d(n,l){this.props=n,this.context=l}function _(n,l){if(null==l)return n.__?_(n.__,n.__.__k.indexOf(n)+1):null;for(var u;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e)return u.__e;return"function"==typeof n.type?_(n):null}function w(n){var l,u;if(null!=(n=n.__)&&null!=n.__c){for(n.__e=n.__c.base=null,l=0;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e){n.__e=n.__c.base=u.__e;break}return w(n)}}function k(l){(!l.__d&&(l.__d=!0)&&u.push(l)&&!g.__r++||t!==n.debounceRendering)&&((t=n.debounceRendering)||i)(g)}function g(){for(var n;g.__r=u.length;)n=u.sort(function(n,l){return n.__v.__b-l.__v.__b}),u=[],n.some(function(n){var l,u,i,t,o,r,f;n.__d&&(r=(o=(l=n).__v).__e,(f=l.__P)&&(u=[],(i=s({},o)).__v=i,t=$(f,o,i,l.__n,void 0!==f.ownerSVGElement,null!=o.__h?[r]:null,u,null==r?_(o):r,o.__h),j(u,o),t!=r&&w(o)))})}function m(n,l,u,i,t,o,r,c,s,h){var y,d,w,k,g,m,b,A=i&&i.__k||e,P=A.length;for(s==f&&(s=null!=r?r[0]:P?_(i,0):null),u.__k=[],y=0;y<l.length;y++)if(null!=(k=u.__k[y]=null==(k=l[y])||"boolean"==typeof k?null:"string"==typeof k||"number"==typeof k?v(null,k,null,null,k):Array.isArray(k)?v(p,{children:k},null,null,null):null!=k.__e||null!=k.__c?v(k.type,k.props,k.key,null,k.__v):k)){if(k.__=u,k.__b=u.__b+1,null===(w=A[y])||w&&k.key==w.key&&k.type===w.type)A[y]=void 0;else for(d=0;d<P;d++){if((w=A[d])&&k.key==w.key&&k.type===w.type){A[d]=void 0;break}w=null}g=$(n,k,w=w||f,t,o,r,c,s,h),(d=k.ref)&&w.ref!=d&&(b||(b=[]),w.ref&&b.push(w.ref,null,k),b.push(d,k.__c||g,k)),null!=g?(null==m&&(m=g),s=x(n,k,w,A,r,g,s),h||"option"!=u.type?"function"==typeof u.type&&(u.__d=s):n.value=""):s&&w.__e==s&&s.parentNode!=n&&(s=_(w))}if(u.__e=m,null!=r&&"function"!=typeof u.type)for(y=r.length;y--;)null!=r[y]&&a(r[y]);for(y=P;y--;)null!=A[y]&&L(A[y],A[y]);if(b)for(y=0;y<b.length;y++)I(b[y],b[++y],b[++y])}function b(n,l){return l=l||[],null==n||"boolean"==typeof n||(Array.isArray(n)?n.some(function(n){b(n,l)}):l.push(n)),l}function x(n,l,u,i,t,o,r){var f,e,c;if(void 0!==l.__d)f=l.__d,l.__d=void 0;else if(t==u||o!=r||null==o.parentNode)n:if(null==r||r.parentNode!==n)n.appendChild(o),f=null;else{for(e=r,c=0;(e=e.nextSibling)&&c<i.length;c+=2)if(e==o)break n;n.insertBefore(o,r),f=r}return void 0!==f?f:o.nextSibling}function A(n,l,u,i,t){var o;for(o in u)"children"===o||"key"===o||o in l||C(n,o,null,u[o],i);for(o in l)t&&"function"!=typeof l[o]||"children"===o||"key"===o||"value"===o||"checked"===o||u[o]===l[o]||C(n,o,l[o],u[o],i)}function P(n,l,u){"-"===l[0]?n.setProperty(l,u):n[l]=null==u?"":"number"!=typeof u||c.test(l)?u:u+"px"}function C(n,l,u,i,t){var o,r,f;if(t&&"className"==l&&(l="class"),"style"===l)if("string"==typeof u)n.style.cssText=u;else{if("string"==typeof i&&(n.style.cssText=i=""),i)for(l in i)u&&l in u||P(n.style,l,"");if(u)for(l in u)i&&u[l]===i[l]||P(n.style,l,u[l])}else"o"===l[0]&&"n"===l[1]?(o=l!==(l=l.replace(/Capture$/,"")),(r=l.toLowerCase())in n&&(l=r),l=l.slice(2),n.l||(n.l={}),n.l[l+o]=u,f=o?N:z,u?i||n.addEventListener(l,f,o):n.removeEventListener(l,f,o)):"list"!==l&&"tagName"!==l&&"form"!==l&&"type"!==l&&"size"!==l&&"download"!==l&&"href"!==l&&!t&&l in n?n[l]=null==u?"":u:"function"!=typeof u&&"dangerouslySetInnerHTML"!==l&&(l!==(l=l.replace(/xlink:?/,""))?null==u||!1===u?n.removeAttributeNS("http://www.w3.org/1999/xlink",l.toLowerCase()):n.setAttributeNS("http://www.w3.org/1999/xlink",l.toLowerCase(),u):null==u||!1===u&&!/^ar/.test(l)?n.removeAttribute(l):n.setAttribute(l,u))}function z(l){this.l[l.type+!1](n.event?n.event(l):l)}function N(l){this.l[l.type+!0](n.event?n.event(l):l)}function T(n,l,u){var i,t;for(i=0;i<n.__k.length;i++)(t=n.__k[i])&&(t.__=n,t.__e&&("function"==typeof t.type&&t.__k.length>1&&T(t,l,u),l=x(u,t,t,n.__k,null,t.__e,l),"function"==typeof n.type&&(n.__d=l)))}function $(l,u,i,t,o,r,f,e,c){var a,h,v,y,_,w,k,g,b,x,A,P=u.type;if(void 0!==u.constructor)return null;null!=i.__h&&(c=i.__h,e=u.__e=i.__e,u.__h=null,r=[e]),(a=n.__b)&&a(u);try{n:if("function"==typeof P){if(g=u.props,b=(a=P.contextType)&&t[a.__c],x=a?b?b.props.value:a.__:t,i.__c?k=(h=u.__c=i.__c).__=h.__E:("prototype"in P&&P.prototype.render?u.__c=h=new P(g,x):(u.__c=h=new d(g,x),h.constructor=P,h.render=M),b&&b.sub(h),h.props=g,h.state||(h.state={}),h.context=x,h.__n=t,v=h.__d=!0,h.__h=[]),null==h.__s&&(h.__s=h.state),null!=P.getDerivedStateFromProps&&(h.__s==h.state&&(h.__s=s({},h.__s)),s(h.__s,P.getDerivedStateFromProps(g,h.__s))),y=h.props,_=h.state,v)null==P.getDerivedStateFromProps&&null!=h.componentWillMount&&h.componentWillMount(),null!=h.componentDidMount&&h.__h.push(h.componentDidMount);else{if(null==P.getDerivedStateFromProps&&g!==y&&null!=h.componentWillReceiveProps&&h.componentWillReceiveProps(g,x),!h.__e&&null!=h.shouldComponentUpdate&&!1===h.shouldComponentUpdate(g,h.__s,x)||u.__v===i.__v){h.props=g,h.state=h.__s,u.__v!==i.__v&&(h.__d=!1),h.__v=u,u.__e=i.__e,u.__k=i.__k,h.__h.length&&f.push(h),T(u,e,l);break n}null!=h.componentWillUpdate&&h.componentWillUpdate(g,h.__s,x),null!=h.componentDidUpdate&&h.__h.push(function(){h.componentDidUpdate(y,_,w)})}h.context=x,h.props=g,h.state=h.__s,(a=n.__r)&&a(u),h.__d=!1,h.__v=u,h.__P=l,a=h.render(h.props,h.state,h.context),h.state=h.__s,null!=h.getChildContext&&(t=s(s({},t),h.getChildContext())),v||null==h.getSnapshotBeforeUpdate||(w=h.getSnapshotBeforeUpdate(y,_)),A=null!=a&&a.type==p&&null==a.key?a.props.children:a,m(l,Array.isArray(A)?A:[A],u,i,t,o,r,f,e,c),h.base=u.__e,u.__h=null,h.__h.length&&f.push(h),k&&(h.__E=h.__=null),h.__e=!1}else null==r&&u.__v===i.__v?(u.__k=i.__k,u.__e=i.__e):u.__e=H(i.__e,u,i,t,o,r,f,c);(a=n.diffed)&&a(u)}catch(l){u.__v=null,(c||null!=r)&&(u.__e=e,u.__h=!!c,r[r.indexOf(e)]=null),n.__e(l,u,i)}return u.__e}function j(l,u){n.__c&&n.__c(u,l),l.some(function(u){try{l=u.__h,u.__h=[],l.some(function(n){n.call(u)})}catch(l){n.__e(l,u.__v)}})}function H(n,l,u,i,t,o,r,c){var s,a,h,v,y,p=u.props,d=l.props;if(t="svg"===l.type||t,null!=o)for(s=0;s<o.length;s++)if(null!=(a=o[s])&&((null===l.type?3===a.nodeType:a.localName===l.type)||n==a)){n=a,o[s]=null;break}if(null==n){if(null===l.type)return document.createTextNode(d);n=t?document.createElementNS("http://www.w3.org/2000/svg",l.type):document.createElement(l.type,d.is&&{is:d.is}),o=null,c=!1}if(null===l.type)p===d||c&&n.data===d||(n.data=d);else{if(null!=o&&(o=e.slice.call(n.childNodes)),h=(p=u.props||f).dangerouslySetInnerHTML,v=d.dangerouslySetInnerHTML,!c){if(null!=o)for(p={},y=0;y<n.attributes.length;y++)p[n.attributes[y].name]=n.attributes[y].value;(v||h)&&(v&&(h&&v.__html==h.__html||v.__html===n.innerHTML)||(n.innerHTML=v&&v.__html||""))}A(n,d,p,t,c),v?l.__k=[]:(s=l.props.children,m(n,Array.isArray(s)?s:[s],l,u,i,"foreignObject"!==l.type&&t,o,r,f,c)),c||("value"in d&&void 0!==(s=d.value)&&(s!==n.value||"progress"===l.type&&!s)&&C(n,"value",s,p.value,!1),"checked"in d&&void 0!==(s=d.checked)&&s!==n.checked&&C(n,"checked",s,p.checked,!1))}return n}function I(l,u,i){try{"function"==typeof l?l(u):l.current=u}catch(l){n.__e(l,i)}}function L(l,u,i){var t,o,r;if(n.unmount&&n.unmount(l),(t=l.ref)&&(t.current&&t.current!==l.__e||I(t,null,u)),i||"function"==typeof l.type||(i=null!=(o=l.__e)),l.__e=l.__d=void 0,null!=(t=l.__c)){if(t.componentWillUnmount)try{t.componentWillUnmount()}catch(l){n.__e(l,u)}t.base=t.__P=null}if(t=l.__k)for(r=0;r<t.length;r++)t[r]&&L(t[r],u,i);null!=o&&a(o)}function M(n,l,u){return this.constructor(n,u)}function O(l,u,i){var t,r,c;n.__&&n.__(l,u),r=(t=i===o)?null:i&&i.__k||u.__k,l=h(p,null,[l]),c=[],$(u,(t?u:i||u).__k=l,r||f,f,void 0!==u.ownerSVGElement,i&&!t?[i]:r?null:u.childNodes.length?e.slice.call(u.childNodes):null,c,i||f,t),j(c,l)}function S(n,l){O(n,l,o)}function q(n,l,u){var i,t,o,r=arguments,f=s({},n.props);for(o in l)"key"==o?i=l[o]:"ref"==o?t=l[o]:f[o]=l[o];if(arguments.length>3)for(u=[u],o=3;o<arguments.length;o++)u.push(r[o]);return null!=u&&(f.children=u),v(n.type,f,i||n.key,t||n.ref,null)}function B(n,l){var u={__c:l="__cC"+r++,__:n,Consumer:function(n,l){return n.children(l)},Provider:function(n,u,i){return this.getChildContext||(u=[],(i={})[l]=this,this.getChildContext=function(){return i},this.shouldComponentUpdate=function(n){this.props.value!==n.value&&u.some(k)},this.sub=function(n){u.push(n);var l=n.componentWillUnmount;n.componentWillUnmount=function(){u.splice(u.indexOf(n),1),l&&l.call(n)}}),n.children}};return u.Provider.__=u.Consumer.contextType=u}n={__e:function(n,l){for(var u,i,t,o=l.__h;l=l.__;)if((u=l.__c)&&!u.__)try{if((i=u.constructor)&&null!=i.getDerivedStateFromError&&(u.setState(i.getDerivedStateFromError(n)),t=u.__d),null!=u.componentDidCatch&&(u.componentDidCatch(n),t=u.__d),t)return l.__h=o,u.__E=u}catch(l){n=l}throw n}},l=function(n){return null!=n&&void 0===n.constructor},d.prototype.setState=function(n,l){var u;u=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=s({},this.state),"function"==typeof n&&(n=n(s({},u),this.props)),n&&s(u,n),null!=n&&this.__v&&(l&&this.__h.push(l),k(this))},d.prototype.forceUpdate=function(n){this.__v&&(this.__e=!0,n&&this.__h.push(n),k(this))},d.prototype.render=p,u=[],i="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,g.__r=0,o=f,r=0;
//# sourceMappingURL=preact.module.js.map


/***/ }),

/***/ "./node_modules/preact/hooks/dist/hooks.module.js":
/*!********************************************************!*\
  !*** ./node_modules/preact/hooks/dist/hooks.module.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useCallback": () => (/* binding */ A),
/* harmony export */   "useContext": () => (/* binding */ F),
/* harmony export */   "useDebugValue": () => (/* binding */ T),
/* harmony export */   "useEffect": () => (/* binding */ y),
/* harmony export */   "useErrorBoundary": () => (/* binding */ d),
/* harmony export */   "useImperativeHandle": () => (/* binding */ s),
/* harmony export */   "useLayoutEffect": () => (/* binding */ l),
/* harmony export */   "useMemo": () => (/* binding */ _),
/* harmony export */   "useReducer": () => (/* binding */ p),
/* harmony export */   "useRef": () => (/* binding */ h),
/* harmony export */   "useState": () => (/* binding */ m)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
var t,u,r,o=0,i=[],c=preact__WEBPACK_IMPORTED_MODULE_0__.options.__r,f=preact__WEBPACK_IMPORTED_MODULE_0__.options.diffed,e=preact__WEBPACK_IMPORTED_MODULE_0__.options.__c,a=preact__WEBPACK_IMPORTED_MODULE_0__.options.unmount;function v(t,r){preact__WEBPACK_IMPORTED_MODULE_0__.options.__h&&preact__WEBPACK_IMPORTED_MODULE_0__.options.__h(u,t,o||r),o=0;var i=u.__H||(u.__H={__:[],__h:[]});return t>=i.__.length&&i.__.push({}),i.__[t]}function m(n){return o=1,p(k,n)}function p(n,r,o){var i=v(t++,2);return i.t=n,i.__c||(i.__=[o?o(r):k(void 0,r),function(n){var t=i.t(i.__[0],n);i.__[0]!==t&&(i.__=[t,i.__[1]],i.__c.setState({}))}],i.__c=u),i.__}function y(r,o){var i=v(t++,3);!preact__WEBPACK_IMPORTED_MODULE_0__.options.__s&&j(i.__H,o)&&(i.__=r,i.__H=o,u.__H.__h.push(i))}function l(r,o){var i=v(t++,4);!preact__WEBPACK_IMPORTED_MODULE_0__.options.__s&&j(i.__H,o)&&(i.__=r,i.__H=o,u.__h.push(i))}function h(n){return o=5,_(function(){return{current:n}},[])}function s(n,t,u){o=6,l(function(){"function"==typeof n?n(t()):n&&(n.current=t())},null==u?u:u.concat(n))}function _(n,u){var r=v(t++,7);return j(r.__H,u)&&(r.__=n(),r.__H=u,r.__h=n),r.__}function A(n,t){return o=8,_(function(){return n},t)}function F(n){var r=u.context[n.__c],o=v(t++,9);return o.__c=n,r?(null==o.__&&(o.__=!0,r.sub(u)),r.props.value):n.__}function T(t,u){preact__WEBPACK_IMPORTED_MODULE_0__.options.useDebugValue&&preact__WEBPACK_IMPORTED_MODULE_0__.options.useDebugValue(u?u(t):t)}function d(n){var r=v(t++,10),o=m();return r.__=n,u.componentDidCatch||(u.componentDidCatch=function(n){r.__&&r.__(n),o[1](n)}),[o[0],function(){o[1](void 0)}]}function q(){i.some(function(t){if(t.__P)try{t.__H.__h.forEach(b),t.__H.__h.forEach(g),t.__H.__h=[]}catch(u){return t.__H.__h=[],preact__WEBPACK_IMPORTED_MODULE_0__.options.__e(u,t.__v),!0}}),i=[]}preact__WEBPACK_IMPORTED_MODULE_0__.options.__r=function(n){c&&c(n),t=0;var r=(u=n.__c).__H;r&&(r.__h.forEach(b),r.__h.forEach(g),r.__h=[])},preact__WEBPACK_IMPORTED_MODULE_0__.options.diffed=function(t){f&&f(t);var u=t.__c;u&&u.__H&&u.__H.__h.length&&(1!==i.push(u)&&r===preact__WEBPACK_IMPORTED_MODULE_0__.options.requestAnimationFrame||((r=preact__WEBPACK_IMPORTED_MODULE_0__.options.requestAnimationFrame)||function(n){var t,u=function(){clearTimeout(r),x&&cancelAnimationFrame(t),setTimeout(n)},r=setTimeout(u,100);x&&(t=requestAnimationFrame(u))})(q))},preact__WEBPACK_IMPORTED_MODULE_0__.options.__c=function(t,u){u.some(function(t){try{t.__h.forEach(b),t.__h=t.__h.filter(function(n){return!n.__||g(n)})}catch(r){u.some(function(n){n.__h&&(n.__h=[])}),u=[],preact__WEBPACK_IMPORTED_MODULE_0__.options.__e(r,t.__v)}}),e&&e(t,u)},preact__WEBPACK_IMPORTED_MODULE_0__.options.unmount=function(t){a&&a(t);var u=t.__c;if(u&&u.__H)try{u.__H.__.forEach(b)}catch(t){preact__WEBPACK_IMPORTED_MODULE_0__.options.__e(t,u.__v)}};var x="function"==typeof requestAnimationFrame;function b(n){"function"==typeof n.u&&n.u()}function g(n){n.u=n.__()}function j(n,t){return!n||n.length!==t.length||t.some(function(t,u){return t!==n[u]})}function k(n,t){return"function"==typeof t?t(n):t}
//# sourceMappingURL=hooks.module.js.map


/***/ }),

/***/ "./src/ApisearchHelper.ts":
/*!********************************!*\
  !*** ./src/ApisearchHelper.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
var SortByHelper_1 = __webpack_require__(/*! ./components/SortBy/SortByHelper */ "./src/components/SortBy/SortByHelper.ts");
var apisearch_1 = __webpack_require__(/*! apisearch */ "./node_modules/apisearch/lib/index.js");
/**
 * ApisearchUI class
 */
var ApisearchHelper = /** @class */ (function () {
    function ApisearchHelper() {
    }
    /**
     * @param query
     * @param sortBy
     */
    ApisearchHelper.prototype.sortBy = function (query, sortBy) {
        (0, SortByHelper_1.applySortByToQuery)(query, sortBy);
    };
    /**
     * @param query
     * @param field
     * @param value
     * @param weight
     */
    ApisearchHelper.prototype.boostByWeightAndFilter = function (query, field, value, weight) {
        var _a;
        var scoreStrategies = (_a = query.getScoreStrategies()) !== null && _a !== void 0 ? _a : apisearch_1.ScoreStrategies.createEmpty(apisearch_1.MULTIPLY);
        scoreStrategies.addScoreStrategy(apisearch_1.ScoreStrategy.createFromArray({
            "type": "weight",
            "weight": weight,
            "filter": {
                "field": field,
                "values": [value],
                "application_type": apisearch_1.FILTER_MUST_ALL,
                "filter_type": apisearch_1.FILTER_TYPE_FIELD
            },
            "match_main_query": true
        }));
        query.setScoreStrategies(scoreStrategies);
    };
    return ApisearchHelper;
}());
exports["default"] = ApisearchHelper;


/***/ }),

/***/ "./src/ApisearchUI.ts":
/*!****************************!*\
  !*** ./src/ApisearchUI.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var apisearch_1 = __webpack_require__(/*! apisearch */ "./node_modules/apisearch/lib/index.js");
var apisearch_2 = __webpack_require__(/*! apisearch */ "./node_modules/apisearch/lib/index.js");
var IndexUUID_1 = __webpack_require__(/*! apisearch/lib/Model/IndexUUID */ "./node_modules/apisearch/lib/Model/IndexUUID.js");
var ApisearchHelper_1 = __webpack_require__(/*! ./ApisearchHelper */ "./src/ApisearchHelper.ts");
var ApisearchUIFactory_1 = __webpack_require__(/*! ./ApisearchUIFactory */ "./src/ApisearchUIFactory.ts");
var Bootstrap_1 = __webpack_require__(/*! ./Bootstrap */ "./src/Bootstrap.ts");
var Constants_1 = __webpack_require__(/*! ./Constants */ "./src/Constants.ts");
var Container_1 = __webpack_require__(/*! ./Container */ "./src/Container.ts");
var Environment_1 = __webpack_require__(/*! ./Environment */ "./src/Environment.ts");
var Widgets_1 = __webpack_require__(/*! ./widgets/Widgets */ "./src/widgets/Widgets.ts");
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


/***/ }),

/***/ "./src/ApisearchUIFactory.ts":
/*!***********************************!*\
  !*** ./src/ApisearchUIFactory.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
var ApisearchUI_1 = __webpack_require__(/*! ./ApisearchUI */ "./src/ApisearchUI.ts");
/**
 * ApisearchUIFactory class
 */
var ApisearchUIFactory = /** @class */ (function () {
    function ApisearchUIFactory() {
    }
    /**
     * Create instance
     *
     * @param config
     *
     * @return {ApisearchUIFactory}
     */
    ApisearchUIFactory.fromConfig = function (config) {
        var instance = new ApisearchUIFactory();
        instance.config = config;
        return instance;
    };
    /**
     * @param hash
     *
     * @return {ApisearchUI}
     */
    ApisearchUIFactory.prototype.createUI = function (hash) {
        if (hash === void 0) { hash = null; }
        return ApisearchUI_1["default"].create(this.config, hash);
    };
    return ApisearchUIFactory;
}());
exports["default"] = ApisearchUIFactory;


/***/ }),

/***/ "./src/Bootstrap.ts":
/*!**************************!*\
  !*** ./src/Bootstrap.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
exports.bootstrap = void 0;
var Dispatcher_1 = __webpack_require__(/*! ./Dispatcher */ "./src/Dispatcher.ts");
var apisearch_1 = __webpack_require__(/*! apisearch */ "./node_modules/apisearch/lib/index.js");
var ApisearchUI_1 = __webpack_require__(/*! ./ApisearchUI */ "./src/ApisearchUI.ts");
var Container_1 = __webpack_require__(/*! ./Container */ "./src/Container.ts");
var Store_1 = __webpack_require__(/*! ./Store */ "./src/Store.ts");
var Constants_1 = __webpack_require__(/*! ./Constants */ "./src/Constants.ts");
/**
 * @param environmentId
 * @param config
 * @param hash
 */
function bootstrap(environmentId, config, hash) {
    var configAsString = JSON.stringify(config);
    var repositoryId = "".concat(Constants_1.APISEARCH_REPOSITORY, "__").concat(configAsString);
    var storeId = "".concat(Constants_1.APISEARCH_STORE, "__").concat(environmentId);
    var dispatcherId = "".concat(Constants_1.APISEARCH_DISPATCHER, "__").concat(environmentId);
    var configId = "".concat(Constants_1.APISEARCH_CONFIG, "__").concat(environmentId);
    var asuiId = "".concat(Constants_1.APISEARCH_UI, "__").concat(environmentId);
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


/***/ }),

/***/ "./src/Constants.ts":
/*!**************************!*\
  !*** ./src/Constants.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.__esModule = true;
exports.APISEARCH_CONFIG = exports.APISEARCH_UI = exports.APISEARCH_DISPATCHER = exports.APISEARCH_STORE = exports.APISEARCH_REPOSITORY = void 0;
/**
 * Service constants
 */
exports.APISEARCH_REPOSITORY = "apisearch_repository";
exports.APISEARCH_STORE = "apisearch_store";
exports.APISEARCH_DISPATCHER = "apisearch_dispatcher";
exports.APISEARCH_UI = "apisearch_ui";
exports.APISEARCH_CONFIG = "apisearch_config";


/***/ }),

/***/ "./src/Container.ts":
/*!**************************!*\
  !*** ./src/Container.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.__esModule = true;
/**
 * Apisearch Dependency Injection Container
 */
var Container = /** @class */ (function () {
    function Container() {
        this.services = {};
    }
    /**
     * Get service
     *
     * @param id
     */
    Container.prototype.get = function (id) {
        if (this.services[id]) {
            return this.services[id];
        }
        throw new Error("Service with id (".concat(id, ") is not registered."));
    };
    /**
     * Register service
     *
     * @param id
     * @param serviceCallback
     */
    Container.prototype.register = function (id, serviceCallback) {
        this.services[id] = serviceCallback();
    };
    return Container;
}());
exports["default"] = new Container;


/***/ }),

/***/ "./src/Dispatcher.ts":
/*!***************************!*\
  !*** ./src/Dispatcher.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.__esModule = true;
exports.Dispatcher = void 0;
var Dispatcher = /** @class */ (function () {
    function Dispatcher() {
        this.events = {};
    }
    Dispatcher.prototype.registerListener = function (event, callback) {
        // Create the event if not exists
        if (this.events[event] === undefined) {
            this.events[event] = {
                listeners: []
            };
        }
        this.events[event].listeners.push(callback);
    };
    Dispatcher.prototype.dispatch = function (event, payload) {
        this.events[event].listeners.forEach(function (listener) {
            listener(payload);
        });
    };
    return Dispatcher;
}());
exports.Dispatcher = Dispatcher;


/***/ }),

/***/ "./src/Environment.ts":
/*!****************************!*\
  !*** ./src/Environment.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.__esModule = true;
exports.createEnvironmentId = void 0;
/**
 * Create an envID
 */
var createEnvironmentId = function () { return "env_".concat(Math.ceil(Math.random() * (9999999 - 1) + 1)); };
exports.createEnvironmentId = createEnvironmentId;


/***/ }),

/***/ "./src/Highlight.ts":
/*!**************************!*\
  !*** ./src/Highlight.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.__esModule = true;
exports.levenshteinDistance = exports.highlightLine = exports.highlightElement = void 0;
function highlightElement(element, inputText) {
    var children = element.querySelectorAll(".highlight");
    var inputTextParts = inputText.split(" ").filter(function (word) { return (word !== ""); });
    for (var i = 0; i < children.length; i++) {
        highlightLine(children[i], inputTextParts);
    }
}
exports.highlightElement = highlightElement;
function highlightLine(element, inputTextParts) {
    var lineText = element.textContent;
    var lineTextParts = lineText.split(" ").filter(function (word) { return (word !== ""); });
    var replaces = {};
    for (var i = 0; i < lineTextParts.length; i++) {
        for (var j = 0; j < inputTextParts.length; j++) {
            var lineWord = lineTextParts[i];
            var inputWord = inputTextParts[j];
            var minLength = Math.min(lineWord.length, inputWord.length);
            minLength = Math.max(minLength, inputWord.length);
            var lineWordSplit = lineWord.substring(0, minLength).toLowerCase();
            var inputWordSplit = inputWord.substring(0, minLength).toLowerCase();
            var distance = levenshteinDistance(lineWordSplit, inputWordSplit);
            var allowedDistance = 0;
            if (minLength >= 5 && minLength < 10) {
                allowedDistance = 1;
            }
            else if (minLength >= 10) {
                allowedDistance = 2;
            }
            if (distance <= allowedDistance) {
                replaces[lineWord] = "<em>" + lineWord + "</em>";
                break;
            }
        }
    }
    for (var _i = 0, _a = Object.entries(replaces); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        lineText = lineText.replaceAll(key, value);
    }
    element.innerHTML = lineText;
}
exports.highlightLine = highlightLine;
function levenshteinDistance(str1, str2) {
    if (str1 === void 0) { str1 = ""; }
    if (str2 === void 0) { str2 = ""; }
    var track = Array(str2.length + 1).fill(null).map(function () {
        return Array(str1.length + 1).fill(null);
    });
    for (var i = 0; i <= str1.length; i += 1) {
        track[0][i] = i;
    }
    for (var j = 0; j <= str2.length; j += 1) {
        track[j][0] = j;
    }
    for (var j = 1; j <= str2.length; j += 1) {
        for (var i = 1; i <= str1.length; i += 1) {
            var indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
            track[j][i] = Math.min(track[j][i - 1] + 1, // deletion
            track[j - 1][i] + 1, // insertion
            track[j - 1][i - 1] + indicator);
        }
    }
    return track[str2.length][str1.length];
}
exports.levenshteinDistance = levenshteinDistance;


/***/ }),

/***/ "./src/Store.ts":
/*!**********************!*\
  !*** ./src/Store.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var apisearch_1 = __webpack_require__(/*! apisearch */ "./node_modules/apisearch/lib/index.js");
var events_1 = __webpack_require__(/*! events */ "./node_modules/events/events.js");
var Constants_1 = __webpack_require__(/*! ./Constants */ "./src/Constants.ts");
var Container_1 = __webpack_require__(/*! ./Container */ "./src/Container.ts");
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
     * @param site
     * @param device
     * @param generateRandomSessionUUID
     * @param initialState
     */
    function Store(coordinate, minScore, hash, userId, site, device, generateRandomSessionUUID, initialState) {
        var _this = _super.call(this) || this;
        _this.withHash = false;
        _this.doNotCleanUrlHashAtFirst = false;
        _this.dirty = true;
        _this.site = site;
        _this.device = device;
        _this.initialState = initialState;
        var initialQuery = Store.loadInitialQuery(coordinate, userId, site, device);
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
     *
     */
    Store.prototype.getSite = function () {
        return this.site;
    };
    /**
     *
     */
    Store.prototype.getDevice = function () {
        return this.device;
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
     * @param result
     */
    Store.prototype.setCurrentResult = function (result) {
        this.currentResult = result;
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
        var dispatcher = Container_1["default"].get("".concat(Constants_1.APISEARCH_DISPATCHER, "__").concat(environmentId));
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
     * @param site
     * @param device
     *
     * @private
     */
    Store.loadInitialQuery = function (coordinate, userId, site, device) {
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
        if (q.metadata === undefined) {
            q.metadata = { device: device };
        }
        if (site !== "") {
            q.metadata.site = site;
        }
        return apisearch_1.Query.createFromArray(q);
    };
    /**
     * @param query
     */
    Store.prototype.loadQuery = function (query) {
        var queryAsObject = query.toArray();
        if (Object.keys(this.initialState).length > 0) {
            this.emit("fromUrlObject", this.initialState, queryAsObject);
            return apisearch_1.Query.createFromArray(queryAsObject);
        }
        if (!this.withHash) {
            return query;
        }
        var urlObject = {};
        if (this.urlHash.match("q=.*") !== null) {
            var urlHashQuery = decodeURI(this.urlHash.slice(2));
            urlObject = { q: urlHashQuery };
            this.emit("fromUrlObject", urlObject, queryAsObject);
        }
        else {
            try {
                urlObject = (this.urlHash !== undefined &&
                    this.urlHash !== null &&
                    this.urlHash !== "" &&
                    this.urlHash !== "/")
                    ? JSON.parse(decodeURI(this.urlHash))
                    : {};
                if (Object.keys(urlObject).length > 0) {
                    this.emit("fromUrlObject", urlObject, queryAsObject);
                }
            }
            catch (e) {
                // Silent pass
                this.doNotCleanUrlHashAtFirst = true;
            }
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
        var objectAsJson;
        if (Object.keys(urlObject).length === 1 &&
            typeof urlObject.q !== "undefined") {
            objectAsJson = "q=" + urlObject.q;
        }
        else {
            objectAsJson = decodeURI(JSON.stringify(urlObject));
            objectAsJson = (objectAsJson === "{}") ? "" : objectAsJson;
            objectAsJson = encodeURI(objectAsJson);
        }
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


/***/ }),

/***/ "./src/components/CheckboxFilter/CheckboxFilterActions.ts":
/*!****************************************************************!*\
  !*** ./src/components/CheckboxFilter/CheckboxFilterActions.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
exports.onChangeSearchAction = exports.aggregationSetup = void 0;
/**
 * Checkbox filter actions
 */
var apisearch_1 = __webpack_require__(/*! apisearch */ "./node_modules/apisearch/lib/index.js");
var Constants_1 = __webpack_require__(/*! ../../Constants */ "./src/Constants.ts");
var Container_1 = __webpack_require__(/*! ../../Container */ "./src/Container.ts");
var Clone_1 = __webpack_require__(/*! ../Clone */ "./src/components/Clone.ts");
/**
 * Define aggregations setup
 *
 * @param environmentId
 * @param currentQuery
 * @param filterName
 * @param aggregationField
 */
function aggregationSetup(environmentId, currentQuery, filterName, aggregationField) {
    var clonedQuery = Clone_1["default"].object(currentQuery);
    clonedQuery.aggregateBy(filterName, aggregationField, apisearch_1.FILTER_TYPE_FIELD);
    var dispatcher = Container_1["default"].get("".concat(Constants_1.APISEARCH_DISPATCHER, "__").concat(environmentId));
    dispatcher.dispatch("UPDATE_APISEARCH_SETUP", {
        query: clonedQuery
    });
}
exports.aggregationSetup = aggregationSetup;
/**
 * @param environmentId
 * @param currentQuery
 * @param repository
 * @param filterName
 * @param filterField
 * @param isChecked
 * @param filterValue
 */
function onChangeSearchAction(environmentId, currentQuery, repository, filterName, filterField, isChecked, filterValue) {
    window.postMessage({
        name: "apisearch_scroll_top"
    }, "*");
    var clonedQuery = Clone_1["default"].object(currentQuery);
    clonedQuery.filterBy(filterName, filterField, isChecked
        ? [filterValue]
        : [], apisearch_1.FILTER_MUST_ALL, false);
    clonedQuery.page = 1;
    var dispatcher = Container_1["default"].get("".concat(Constants_1.APISEARCH_DISPATCHER, "__").concat(environmentId));
    repository
        .query(clonedQuery)
        .then(function (result) {
        dispatcher.dispatch("RENDER_FETCHED_DATA", {
            query: clonedQuery,
            result: result
        });
    })["catch"](function (error) {
        // Do nothing
    });
}
exports.onChangeSearchAction = onChangeSearchAction;


/***/ }),

/***/ "./src/components/CheckboxFilter/CheckboxFilterComponent.tsx":
/*!*******************************************************************!*\
  !*** ./src/components/CheckboxFilter/CheckboxFilterComponent.tsx ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var preact_1 = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
var Helpers_1 = __webpack_require__(/*! ../MultipleFilter/Helpers */ "./src/components/MultipleFilter/Helpers.ts");
var CheckboxFilterActions_1 = __webpack_require__(/*! ./CheckboxFilterActions */ "./src/components/CheckboxFilter/CheckboxFilterActions.ts");
var Template_1 = __webpack_require__(/*! ../Template */ "./src/components/Template.tsx");
var defaultTemplates_1 = __webpack_require__(/*! ./defaultTemplates */ "./src/components/CheckboxFilter/defaultTemplates.tsx");
/**
 * Checkbox Filter Component
 */
var CheckboxFilterComponent = /** @class */ (function (_super) {
    __extends(CheckboxFilterComponent, _super);
    function CheckboxFilterComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * @param activeElement
         */
        _this.handleChange = function (activeElement) {
            var props = _this.props;
            /**
             * Dispatch action
             */
            (0, CheckboxFilterActions_1.onChangeSearchAction)(props.environmentId, props.store.getCurrentQuery(), props.repository, props.filterName, props.filterField, activeElement, props.filterValue);
        };
        return _this;
    }
    /**
     * Component will mount
     */
    CheckboxFilterComponent.prototype.componentWillMount = function () {
        var props = this.props;
        var environmentId = props.environmentId;
        var filterName = props.filterName;
        var aggregationField = props.filterField;
        var currentQuery = props.store.getCurrentQuery();
        /**
         * Dispatch action
         */
        (0, CheckboxFilterActions_1.aggregationSetup)(environmentId, currentQuery, filterName, aggregationField);
    };
    /**
     * Component will receive props
     *
     * @param props
     */
    CheckboxFilterComponent.prototype.componentWillReceiveProps = function (props) {
        this.setState(function (prevState) {
            return {
                aggregation: props
                    .store
                    .getCurrentResult()
                    .getAggregation(props.filterName)
            };
        });
    };
    /**
     * Render
     *
     * @return {any}
     */
    CheckboxFilterComponent.prototype.render = function (props, state) {
        var containerClassName = props.classNames.container;
        var topClassName = props.classNames.top;
        var itemClassName = props.classNames.item;
        var activeClassName = props.classNames.active;
        var topTemplate = props.template.top;
        var itemTemplate = props.template.item;
        var filterValue = props.filterValue;
        if (typeof filterValue === "boolean") {
            filterValue = filterValue ? "true" : "false";
        }
        var n = 0;
        var isActive = (0, Helpers_1.getFilterValuesFromQuery)(props.store.getCurrentQuery(), props.filterName)[0];
        var aggregation = state.aggregation;
        if (aggregation != null) {
            var counters = aggregation.getCounters();
            for (var i in counters) {
                var counter = counters[i];
                if (counter.values.name === filterValue) {
                    n = counter.getN();
                    break;
                }
            }
        }
        var label = props.label
            ? props.label
            : props.filterName;
        var that = this;
        var uid = Math.floor(Math.random() * 10000000000);
        var templateData = {
            n: n,
            isActive: isActive,
            label: label,
            uid: uid
        };
        if (n === 0) {
            return null;
        }
        return ((0, preact_1.h)("div", { className: "as-checkboxFilter ".concat(containerClassName) },
            (0, preact_1.h)(Template_1["default"], { template: topTemplate, className: "as-checkboxFilter__top ".concat(topClassName), dictionary: this.props.dictionary }),
            (0, preact_1.h)("div", { className: "as-checkboxFilter__item " +
                    "".concat(itemClassName, " ") +
                    "".concat((isActive) ? activeClassName : ""), onClick: function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    that.handleChange(!isActive);
                } },
                (0, preact_1.h)(Template_1["default"], { template: itemTemplate, data: templateData, dictionary: this.props.dictionary }))));
    };
    return CheckboxFilterComponent;
}(preact_1.Component));
CheckboxFilterComponent.defaultProps = {
    filterValue: 'true',
    classNames: {
        container: "",
        top: "",
        item: "",
        active: "as-checkboxFilter__item--active"
    },
    template: {
        top: null,
        item: defaultTemplates_1.defaultItemTemplate
    }
};
exports["default"] = CheckboxFilterComponent;


/***/ }),

/***/ "./src/components/CheckboxFilter/defaultTemplates.tsx":
/*!************************************************************!*\
  !*** ./src/components/CheckboxFilter/defaultTemplates.tsx ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.__esModule = true;
exports.defaultItemTemplate = void 0;
exports.defaultItemTemplate = "\n    <input\n        type=\"checkbox\"\n        class=\"as-checkboxFilter__checkbox\"\n        id=\"filter_{{uid}}\"\n        {{#isActive}}checked=\"checked\"{{/isActive}}\n    />\n    <label\n        class=\"as-checkboxFilter__label\"\n        for=\"filter_{{uid}}\"\n    >\n        {{{label}}}\n    </label>\n    <span class=\"as-checkboxFilter__itemNumber\">\n        {{n}}\n    </span>\n";


/***/ }),

/***/ "./src/components/ClearFilters/ClearFiltersActions.ts":
/*!************************************************************!*\
  !*** ./src/components/ClearFilters/ClearFiltersActions.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
exports.clearFiltersAction = void 0;
var Constants_1 = __webpack_require__(/*! ../../Constants */ "./src/Constants.ts");
var Container_1 = __webpack_require__(/*! ../../Container */ "./src/Container.ts");
var Clone_1 = __webpack_require__(/*! ../Clone */ "./src/components/Clone.ts");
/**
 * @param environmentId
 * @param currentQuery
 * @param repository
 * @param filterToClear
 * @param filterValueToClear
 */
function clearFiltersAction(environmentId, currentQuery, repository, filterToClear, filterValueToClear) {
    if (filterToClear === void 0) { filterToClear = null; }
    if (filterValueToClear === void 0) { filterValueToClear = null; }
    window.postMessage({
        name: "apisearch_scroll_top"
    }, "*");
    var clonedQuery = Clone_1["default"].object(currentQuery);
    if (filterToClear === null) {
        clonedQuery.filters = {
            _query: currentQuery.getFilter("_query")
        };
    }
    else if (filterValueToClear === null) {
        delete clonedQuery.filters[filterToClear];
    }
    else {
        var values = clonedQuery.filters[filterToClear].values;
        var valueIndex = values.indexOf(filterValueToClear, 0);
        if (valueIndex > -1) {
            clonedQuery.filters[filterToClear].values.splice(valueIndex, 1);
        }
    }
    clonedQuery.page = 1;
    var dispatcher = Container_1["default"].get("".concat(Constants_1.APISEARCH_DISPATCHER, "__").concat(environmentId));
    repository
        .query(clonedQuery)
        .then(function (result) {
        dispatcher.dispatch("RENDER_FETCHED_DATA", {
            query: clonedQuery,
            result: result
        });
    })["catch"](function (error) {
        // Do nothing
    });
}
exports.clearFiltersAction = clearFiltersAction;


/***/ }),

/***/ "./src/components/ClearFilters/ClearFiltersComponent.tsx":
/*!***************************************************************!*\
  !*** ./src/components/ClearFilters/ClearFiltersComponent.tsx ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var apisearch_1 = __webpack_require__(/*! apisearch */ "./node_modules/apisearch/lib/index.js");
var preact_1 = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
var Template_1 = __webpack_require__(/*! ../Template */ "./src/components/Template.tsx");
var ClearFiltersActions_1 = __webpack_require__(/*! ./ClearFiltersActions */ "./src/components/ClearFilters/ClearFiltersActions.ts");
/**
 * Result Information Component
 */
var ClearFiltersComponent = /** @class */ (function (_super) {
    __extends(ClearFiltersComponent, _super);
    /**
     * Constructor
     */
    function ClearFiltersComponent() {
        var _this = _super.call(this) || this;
        /**
         * Handle click
         */
        _this.handleClick = function () {
            var props = _this.props;
            var environmentId = props.environmentId;
            var currentQuery = props.store.getCurrentQuery();
            var repository = props.repository;
            _this.setState(function (prevState) {
                return {
                    appliedFilters: [],
                    showClearFilters: false
                };
            });
            /**
             * Dispatch a clear filter action
             */
            (0, ClearFiltersActions_1.clearFiltersAction)(environmentId, currentQuery, repository);
        };
        /**
         * Handle individual click
         */
        _this.handleIndividualClick = function (filterKey, filterValue) {
            var props = _this.props;
            var environmentId = props.environmentId;
            var currentQuery = props.store.getCurrentQuery();
            var repository = props.repository;
            /**
             * Dispatch a clear filter action
             */
            (0, ClearFiltersActions_1.clearFiltersAction)(environmentId, currentQuery, repository, filterKey, filterValue);
        };
        _this.state = {
            appliedFilters: [],
            showClearFilters: false
        };
        return _this;
    }
    /**
     * Component receive props
     *
     * @param props
     */
    ClearFiltersComponent.prototype.componentWillReceiveProps = function (props) {
        var appliedFiltersFormatted = this.getFiltersToShow();
        this.setState(function (prevState) {
            return {
                appliedFilters: appliedFiltersFormatted,
                showClearFilters: appliedFiltersFormatted.length > 0
            };
        });
    };
    /**
     * @param filterToAvoid
     */
    ClearFiltersComponent.prototype.getFiltersToShow = function (filterToAvoid) {
        if (filterToAvoid === void 0) { filterToAvoid = null; }
        var appliedFilters = this.props.store.getCurrentQuery().getFilters();
        var appliedFiltersFormatted = [];
        for (var _i = 0, _a = Object.entries(appliedFilters); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], filter = _b[1];
            if (filter instanceof apisearch_1.Filter && (key !== "_query") && (key !== filterToAvoid)) {
                appliedFiltersFormatted.push({
                    filter: key,
                    num: filter.getValues().length,
                    values: filter.getValues()
                });
            }
        }
        return appliedFiltersFormatted;
    };
    /**
     * Render
     *
     * @return {}
     */
    ClearFiltersComponent.prototype.render = function () {
        var _this = this;
        var props = this.props;
        var containerClassName = props.classNames.container;
        var filtersListClassName = props.classNames.filtersList;
        var filterClassName = props.classNames.filter;
        var containerTemplate = props.template.container;
        var filterTemplate = props.template.filter;
        var appliedFiltersFormatted = this.state.appliedFilters;
        var individualFilterClear = null;
        if (props.showIndividualFilterValueClear) {
            var values_1 = [];
            this.state.appliedFilters.forEach(function (filter) {
                filter.values.forEach(function (value) { return values_1.push({
                    filter: filter.filter,
                    value: value
                }); });
            });
            individualFilterClear = (0, preact_1.h)("ul", { className: "as-clearFilters__filtersList ".concat(filtersListClassName) }, values_1.map(function (filter) {
                return (0, preact_1.h)("li", { className: "as-clearFilters__filter ".concat(filterClassName), onClick: function () { return _this.handleIndividualClick(filter.filter, filter.value); } },
                    (0, preact_1.h)(Template_1["default"], { template: filterTemplate, dictionary: _this.props.dictionary, data: filter }));
            }));
        }
        else if (props.showIndividualFilterClear) {
            individualFilterClear = (0, preact_1.h)("ul", { className: "as-clearFilters__filtersList ".concat(filtersListClassName) }, appliedFiltersFormatted.map(function (filter) {
                return (0, preact_1.h)("li", { className: "as-clearFilters__filter ".concat(filterClassName), onClick: function () { return _this.handleIndividualClick(filter.filter, null); } },
                    (0, preact_1.h)(Template_1["default"], { template: filterTemplate, dictionary: _this.props.dictionary, data: filter }));
            }));
        }
        return (this.state.showClearFilters)
            ? ((0, preact_1.h)("div", { className: "as-clearFilters ".concat(containerClassName) },
                props.showGlobalFilterClear
                    ? (0, preact_1.h)("div", { onClick: this.handleClick },
                        (0, preact_1.h)(Template_1["default"], { template: containerTemplate, dictionary: this.props.dictionary }))
                    : "",
                individualFilterClear)) : null;
    };
    return ClearFiltersComponent;
}(preact_1.Component));
ClearFiltersComponent.defaultProps = {
    classNames: {
        container: "",
        filter: "",
        filtersList: ""
    },
    showGlobalFilterClear: true,
    showIndividualFilterClear: false,
    showIndividualFilterValueClear: false,
    template: {
        container: "Clear filters",
        filter: "Clear {{filter}} ({{num}})"
    }
};
exports["default"] = ClearFiltersComponent;


/***/ }),

/***/ "./src/components/Clone.ts":
/*!*********************************!*\
  !*** ./src/components/Clone.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.__esModule = true;
var Clone = /** @class */ (function () {
    function Clone() {
    }
    Clone.object = function (object) {
        return Object.assign(Object.create(Object.getPrototypeOf(object)), object);
    };
    return Clone;
}());
exports["default"] = Clone;


/***/ }),

/***/ "./src/components/Common.ts":
/*!**********************************!*\
  !*** ./src/components/Common.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
exports.onWordClickAction = void 0;
var apisearch_1 = __webpack_require__(/*! apisearch */ "./node_modules/apisearch/lib/index.js");
var Clone_1 = __webpack_require__(/*! ./Clone */ "./src/components/Clone.ts");
var Container_1 = __webpack_require__(/*! ../Container */ "./src/Container.ts");
var Constants_1 = __webpack_require__(/*! ../Constants */ "./src/Constants.ts");
/**
 *
 * @param environmentId
 * @param currentQuery
 * @param repository
 * @param word
 * @param category
 */
function onWordClickAction(environmentId, currentQuery, repository, word, category) {
    if (category === void 0) { category = null; }
    var clonedQuery = Clone_1["default"].object(currentQuery);
    clonedQuery.filters._query.values = [word];
    clonedQuery.page = 1;
    if (category) {
        clonedQuery = apisearch_1.Query.createFromArray(clonedQuery);
        clonedQuery.filterBy("Categoría", "category_level_0", [category]);
    }
    var dispatcher = Container_1["default"].get("".concat(Constants_1.APISEARCH_DISPATCHER, "__").concat(environmentId));
    repository
        .query(clonedQuery)
        .then(function (result) {
        dispatcher.dispatch("RENDER_FETCHED_DATA", {
            query: clonedQuery,
            result: result
        });
    })["catch"](function (error) {
        // Do nothing
    });
}
exports.onWordClickAction = onWordClickAction;


/***/ }),

/***/ "./src/components/Information/InformationComponent.tsx":
/*!*************************************************************!*\
  !*** ./src/components/Information/InformationComponent.tsx ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var preact_1 = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
var Template_1 = __webpack_require__(/*! ../Template */ "./src/components/Template.tsx");
/**
 * Result Information Component
 */
var InformationComponent = /** @class */ (function (_super) {
    __extends(InformationComponent, _super);
    /**
     * Constructor
     */
    function InformationComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            hits: 0,
            total: 0,
            visible: false
        };
        return _this;
    }
    /**
     * Component will receive props
     *
     * @param props
     */
    InformationComponent.prototype.componentWillReceiveProps = function (props) {
        this.setState(function (prevState) {
            return (props.store.getCurrentResult() == null)
                ? {
                    hits: 0,
                    total: 0,
                    visible: false
                }
                : {
                    hits: props.store.getCurrentResult().getTotalHits(),
                    total: props.store.getCurrentResult().getTotalItems(),
                    visible: true
                };
        });
    };
    InformationComponent.prototype.render = function () {
        var props = this.props;
        var containerClassName = props.classNames.container;
        var containerTemplate = props.template.container;
        var formatData = props.formatData;
        if (!this.state.visible) {
            return;
        }
        var currentQuery = this.props.store.getCurrentQuery();
        var size = currentQuery.getSize();
        var page = currentQuery.getPage();
        var from = (page - 1) * size;
        var to = from + size;
        var totalHits = this.state.hits.toLocaleString();
        if (totalHits === "10,000") {
            totalHits = '+10,000';
        }
        /**
         * Data accessible to the template
         */
        var reducedTemplateData = {
            total_hits: totalHits,
            total_items: this.state.total.toLocaleString(),
            page: page,
            size: size,
            from: from + 1,
            to: to
        };
        var formattedTemplateData = formatData(reducedTemplateData);
        return ((0, preact_1.h)(Template_1["default"], { template: containerTemplate, data: formattedTemplateData, className: "as-information ".concat(containerClassName), dictionary: this.props.dictionary }));
    };
    return InformationComponent;
}(preact_1.Component));
InformationComponent.defaultProps = {
    classNames: {
        container: ''
    },
    template: {
        container: 'Found {{total_hits}}/{{total_items}}'
    },
    formatData: function (data) { return data; }
};
exports["default"] = InformationComponent;


/***/ }),

/***/ "./src/components/MultipleFilter/Helpers.ts":
/*!**************************************************!*\
  !*** ./src/components/MultipleFilter/Helpers.ts ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, exports) {

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
exports.isLeveledFilter = exports.getFilterValuesFromQuery = exports.isFilterAvailable = exports.getShadowFilterValuesFromQuery = exports.manageCurrentFilterItems = exports.wasElementRecentlySelected = void 0;
/**
 * @param selectedItem
 * @param currentItems
 */
function wasElementRecentlySelected(selectedItem, currentItems) {
    return !currentItems.some(function (item) { return item === selectedItem; });
}
exports.wasElementRecentlySelected = wasElementRecentlySelected;
/**
 * Manage filter items
 *
 * If an item is on the list, remove it
 * else, add it!
 *
 * @param selectedItem
 * @param currentItems
 * @param wasElementRecentlySelected
 * @param deleteIfWasRemoved
 *
 * @returns {any}
 */
function manageCurrentFilterItems(selectedItem, currentItems, wasElementRecentlySelected, deleteIfWasRemoved) {
    if (!wasElementRecentlySelected) {
        return deleteIfWasRemoved
            ? currentItems.filter(function (item) { return item !== selectedItem; })
            : currentItems;
    }
    else {
        return __spreadArray(__spreadArray([], currentItems, true), [
            selectedItem,
        ], false);
    }
}
exports.manageCurrentFilterItems = manageCurrentFilterItems;
/**
 * @param query
 * @param filterName
 * @param withCurrent
 */
function getShadowFilterValuesFromQuery(query, filterName, withCurrent) {
    var fields = [];
    if (isFilterAvailable(query, filterName, 6)) {
        var fieldName = query.filters[filterName].field.substr(17);
        var fieldNameParts = fieldName.split("_");
        var currentLevel = parseInt(fieldNameParts[fieldNameParts.length - 1], 10);
        var fieldNameWithoutLevel = fieldNameParts.slice(0, fieldNameParts.length - 1).join("_");
        for (var it_1 = 1; it_1 < currentLevel; it_1++) {
            var iterationFieldName = fieldNameWithoutLevel + "_" + it_1;
            if (query.filters[iterationFieldName] !== undefined) {
                fields.push(query.filters[iterationFieldName].values[0]);
            }
        }
        if (withCurrent) {
            fields.push(query.filters[filterName].values[0]);
        }
    }
    return fields;
}
exports.getShadowFilterValuesFromQuery = getShadowFilterValuesFromQuery;
/**
 * @param query
 * @param filterName
 * @param applicationType
 */
function isFilterAvailable(query, filterName, applicationType) {
    if (applicationType === void 0) { applicationType = null; }
    return (query.filters !== undefined &&
        query.filters !== null &&
        typeof query.filters === "object" &&
        query.filters[filterName] !== undefined &&
        query.filters[filterName] !== null &&
        (applicationType === null ||
            query.filters[filterName].applicationType === applicationType ||
            query.filters[filterName].application_type === applicationType));
}
exports.isFilterAvailable = isFilterAvailable;
/**
 * @param query
 * @param filterName
 * @param applicationType
 */
function getFilterValuesFromQuery(query, filterName, applicationType) {
    if (applicationType === void 0) { applicationType = null; }
    return isFilterAvailable(query, filterName, applicationType)
        ? query.filters[filterName].values
        : [];
}
exports.getFilterValuesFromQuery = getFilterValuesFromQuery;
/**
 * @param filter
 */
function isLeveledFilter(filter) {
    return filter.application_type === 6 ||
        filter.applicationType === 6;
}
exports.isLeveledFilter = isLeveledFilter;


/***/ }),

/***/ "./src/components/MultipleFilter/MultipleFilterActions.ts":
/*!****************************************************************!*\
  !*** ./src/components/MultipleFilter/MultipleFilterActions.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
exports.configureQueryWithShadowLeveledFilters = exports.modifyQueryAggregationWithProperLevelValue = exports.filterAction = exports.aggregationSetup = void 0;
/**
 * Multiple filter actions
 */
var apisearch_1 = __webpack_require__(/*! apisearch */ "./node_modules/apisearch/lib/index.js");
var Constants_1 = __webpack_require__(/*! ../../Constants */ "./src/Constants.ts");
var apisearch_2 = __webpack_require__(/*! apisearch */ "./node_modules/apisearch/lib/index.js");
var Container_1 = __webpack_require__(/*! ../../Container */ "./src/Container.ts");
var Clone_1 = __webpack_require__(/*! ../Clone */ "./src/components/Clone.ts");
/**
 * Define aggregations setup
 *
 * @param environmentId
 * @param currentQuery
 * @param filterName
 * @param filterField
 * @param aggregationField
 * @param applicationType
 * @param sortBy
 * @param fetchLimit
 * @param ranges
 * @param promoted
 */
function aggregationSetup(environmentId, currentQuery, filterName, filterField, aggregationField, applicationType, sortBy, fetchLimit, ranges, promoted) {
    var clonedQuery = Clone_1["default"].object(currentQuery);
    var rangesValues = Object.keys(ranges);
    if (rangesValues.length > 0) {
        clonedQuery.aggregateByRange(filterName, aggregationField, rangesValues, applicationType, apisearch_2.FILTER_TYPE_RANGE, sortBy, fetchLimit, promoted);
    }
    else {
        clonedQuery.aggregateBy(filterName, aggregationField, applicationType, sortBy, fetchLimit, promoted);
    }
    var dispatcher = Container_1["default"].get("".concat(Constants_1.APISEARCH_DISPATCHER, "__").concat(environmentId));
    dispatcher.dispatch("UPDATE_APISEARCH_SETUP", {
        query: clonedQuery
    });
}
exports.aggregationSetup = aggregationSetup;
/**
 * Filter action
 *
 * @param environmentId
 * @param currentQuery
 * @param repository
 * @param filterName
 * @param filterField
 * @param aggregationField
 * @param filterValues
 * @param applicationType
 * @param sortBy
 * @param fetchLimit
 * @param ranges
 * @param labels
 * @param shadowLeveledFilters
 * @param originalFilterField
 */
function filterAction(environmentId, currentQuery, repository, filterName, filterField, aggregationField, filterValues, applicationType, sortBy, fetchLimit, ranges, labels, shadowLeveledFilters, originalFilterField) {
    window.postMessage({
        name: "apisearch_scroll_top"
    }, "*");
    var clonedQuery = Clone_1["default"].object(currentQuery);
    var rangesValues = Object.keys(ranges);
    if (rangesValues.length > 0) {
        clonedQuery.filterByRange(filterName, filterField, rangesValues, filterValues, applicationType, apisearch_2.FILTER_TYPE_RANGE, false, sortBy);
        clonedQuery.aggregateByRange(filterName, aggregationField, rangesValues, applicationType, apisearch_2.FILTER_TYPE_RANGE, sortBy, fetchLimit);
    }
    else {
        clonedQuery.filterBy(filterName, filterField, filterValues, applicationType, false, sortBy);
        clonedQuery.aggregateBy(filterName, aggregationField, applicationType, sortBy, fetchLimit);
    }
    if (applicationType === 6) {
        configureQueryWithShadowLeveledFilters(clonedQuery, shadowLeveledFilters, originalFilterField);
    }
    clonedQuery.page = 1;
    var dispatcher = Container_1["default"].get("".concat(Constants_1.APISEARCH_DISPATCHER, "__").concat(environmentId));
    repository
        .query(clonedQuery)
        .then(function (result) {
        dispatcher.dispatch("RENDER_FETCHED_DATA", {
            query: clonedQuery,
            result: result
        });
    })["catch"](function (error) {
        // Do nothing
    });
}
exports.filterAction = filterAction;
/**
 * @param environmentId
 * @param currentQuery
 * @param filterName
 * @param filterField
 * @param aggregationField
 */
function modifyQueryAggregationWithProperLevelValue(environmentId, currentQuery, filterName, filterField, aggregationField) {
    if (currentQuery.filters !== undefined &&
        currentQuery.filters[filterName] !== undefined) {
        var clonedQuery = Clone_1["default"].object(currentQuery);
        var fieldName = currentQuery.filters[filterName].field;
        var fieldNameParts = fieldName.split("_");
        var currentLevel = parseInt(fieldNameParts[fieldNameParts.length - 1], 10);
        var fieldNameWithoutLevel = fieldNameParts.slice(0, fieldNameParts.length - 1).join("_");
        clonedQuery.aggregations[filterName].field = fieldNameWithoutLevel + "_" + (currentLevel + 1);
        var dispatcher = Container_1["default"].get("".concat(Constants_1.APISEARCH_DISPATCHER, "__").concat(environmentId));
        dispatcher.dispatch("UPDATE_APISEARCH_SETUP", {
            query: clonedQuery
        });
    }
}
exports.modifyQueryAggregationWithProperLevelValue = modifyQueryAggregationWithProperLevelValue;
/**
 * @param query
 * @param shadowLeveledFilters
 * @param originalFilterField
 */
function configureQueryWithShadowLeveledFilters(query, shadowLeveledFilters, originalFilterField) {
    for (var it_1 = 1; it_1 < 10; it_1++) {
        var iterationFieldName = originalFilterField + "_level_" + it_1;
        delete (query.filters[iterationFieldName]);
        delete (query.aggregations[iterationFieldName]);
    }
    if (shadowLeveledFilters.length > 0) {
        var levelCounter_1 = 1;
        shadowLeveledFilters.forEach(function (filterValue) {
            var leveledFieldName = originalFilterField + "_level_" + (levelCounter_1++);
            query.filterBy(leveledFieldName, leveledFieldName, [filterValue], apisearch_1.FILTER_AT_LEAST_ONE);
        });
    }
}
exports.configureQueryWithShadowLeveledFilters = configureQueryWithShadowLeveledFilters;


/***/ }),

/***/ "./src/components/MultipleFilter/MultipleFilterComponent.tsx":
/*!*******************************************************************!*\
  !*** ./src/components/MultipleFilter/MultipleFilterComponent.tsx ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var preact_1 = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
var MultipleFilterActions_1 = __webpack_require__(/*! ./MultipleFilterActions */ "./src/components/MultipleFilter/MultipleFilterActions.ts");
var Helpers_1 = __webpack_require__(/*! ./Helpers */ "./src/components/MultipleFilter/Helpers.ts");
var Template_1 = __webpack_require__(/*! ../Template */ "./src/components/Template.tsx");
var ShowMoreComponent_1 = __webpack_require__(/*! ./ShowMoreComponent */ "./src/components/MultipleFilter/ShowMoreComponent.tsx");
var defaultTemplates_1 = __webpack_require__(/*! ./defaultTemplates */ "./src/components/MultipleFilter/defaultTemplates.tsx");
/**
 * Filter Component
 */
var MultipleFilterComponent = /** @class */ (function (_super) {
    __extends(MultipleFilterComponent, _super);
    /**
     * Constructor
     */
    function MultipleFilterComponent() {
        var _this = _super.call(this) || this;
        _this.currentLevel = 0;
        _this.propsReceived = false;
        /**
         * @param selectedFilter
         * @param level
         */
        _this.handleClick = function (selectedFilter, level) {
            var _a;
            var props = _this.props;
            var environmentId = props.environmentId;
            var filterName = props.filterName;
            var filterField = props.filterField;
            var aggregationField = (_a = props.aggregationField) !== null && _a !== void 0 ? _a : filterField;
            var applicationType = props.applicationType;
            var sortBy = props.sortBy;
            var ranges = props.ranges;
            var labels = props.labels;
            var fetchLimit = props.fetchLimit;
            var repository = props.repository;
            var currentQuery = props.store.getCurrentQuery();
            var selectedFilterAsString = String(selectedFilter);
            var valuesAsString = (applicationType === 6)
                ? (0, Helpers_1.getShadowFilterValuesFromQuery)(currentQuery, filterName, true)
                : (0, Helpers_1.getFilterValuesFromQuery)(currentQuery, filterName);
            var wasSelected = (0, Helpers_1.wasElementRecentlySelected)(selectedFilterAsString, valuesAsString);
            var filterItems = (0, Helpers_1.manageCurrentFilterItems)(selectedFilterAsString, valuesAsString, wasSelected, (applicationType !== 6));
            var currentLevel = level;
            if (applicationType === 6) {
                currentLevel = wasSelected ? currentLevel : (currentLevel - 1);
            }
            var shadowLeveledFilters = [];
            var originalFilterField = filterField;
            if (applicationType === 6) {
                filterField = filterField + "_level_" + (currentLevel);
                aggregationField = aggregationField + "_level_" + (currentLevel + 1);
                filterItems = filterItems.slice(0, currentLevel);
                shadowLeveledFilters = filterItems.slice(0, -1);
                filterItems = filterItems.slice(-1);
            }
            _this.currentLevel = currentLevel;
            /**
             * Dispatch filter action
             */
            (0, MultipleFilterActions_1.filterAction)(environmentId, currentQuery, repository, filterName, filterField, aggregationField, filterItems, applicationType, sortBy, fetchLimit, ranges, labels, shadowLeveledFilters, originalFilterField);
        };
        /**
         * Handle show more
         */
        _this.handleShowMore = function () {
            var viewLimit = _this.state.aggregations.length;
            _this.setState(function (prevState) {
                return { viewLimit: viewLimit };
            });
        };
        /**
         * Handle show less
         */
        _this.handleShowLess = function () {
            var viewLimit = _this.props.viewLimit;
            _this.setState(function (prevState) {
                return { viewLimit: viewLimit };
            });
        };
        _this.state = {
            aggregations: [],
            viewLimit: 0
        };
        return _this;
    }
    /**
     * Components will mount
     */
    MultipleFilterComponent.prototype.componentWillMount = function () {
        var _a;
        var props = this.props;
        var aggregationField = (_a = props.aggregationField) !== null && _a !== void 0 ? _a : props.filterField;
        var applicationType = props.applicationType;
        var fetchLimit = props.fetchLimit;
        var viewLimit = props.viewLimit;
        /**
         * Set view items limit
         */
        var isViewLimitProperlySet = (viewLimit && viewLimit < fetchLimit);
        this.setState(function (_) {
            return {
                viewLimit: (isViewLimitProperlySet)
                    ? viewLimit
                    : fetchLimit
            };
        });
        if (applicationType === 6) {
            aggregationField = aggregationField + "_level_1";
        }
        /**
         * Dispatch action
         */
        (0, MultipleFilterActions_1.aggregationSetup)(props.environmentId, props.store.getCurrentQuery(), props.filterName, props.filterField, aggregationField, applicationType, props.sortBy, fetchLimit, props.ranges, props.promoted);
    };
    /**
     * Component will receive props
     *
     * @param props
     */
    MultipleFilterComponent.prototype.componentWillReceiveProps = function (props) {
        var filterName = props.filterName;
        if (props.store.getCurrentResult() == null) {
            this.setState(function (prevState) {
                return {
                    aggregations: [],
                    filters: []
                };
            });
            return;
        }
        var result = props.store.getCurrentResult();
        var aggregation = result.getAggregation(filterName);
        var aggregations = [];
        if (aggregation && typeof aggregation.getCounters === "function") {
            /**
             * Getting aggregation from aggregations
             */
            var counters = aggregation.getCounters();
            var countersAsArray = Object.values(counters);
            aggregations = props.activeFirst
                ? __spreadArray(__spreadArray([], countersAsArray.filter(function (counter) {
                    return true === counter.isUsed();
                }), true), countersAsArray.filter(function (counter) {
                    return (false === counter.isUsed() ||
                        null === counter.isUsed());
                }), true) : countersAsArray;
        }
        this.setState(function (prevState) {
            return {
                aggregations: aggregations
            };
        });
        if (props.applicationType === 6 &&
            this.propsReceived === false) {
            var filter = props.store.getCurrentQuery().getFilter(filterName);
            this.currentLevel = (filter === undefined || filter === null)
                ? this.currentLevel
                : filter.values
                    ? (filter.values.length + 1)
                    : this.currentLevel;
            this.propsReceived = true;
        }
    };
    /**
     * Render
     *
     * @return {any}
     */
    MultipleFilterComponent.prototype.render = function () {
        var _this = this;
        var props = this.props;
        var viewLimit = props.viewLimit;
        var fetchLimit = props.fetchLimit;
        var containerClassName = props.classNames.container;
        var topClassName = props.classNames.top;
        var itemsListClassName = props.classNames.itemsList;
        var itemClassName = props.classNames.item;
        var activeClassName = props.classNames.active;
        var showMoreContainerClassName = props.classNames.showMoreContainer;
        var topTemplate = props.template.top;
        var itemTemplate = props.template.item;
        var showMoreTemplate = props.template.showMore;
        var showLessTemplate = props.template.showLess;
        var currentQuery = props.store.getCurrentQuery();
        var formatData = props.formatData;
        var labels = Object.keys(props.ranges).length > 0
            ? props.ranges
            : props.labels;
        /**
         * Get aggregation items
         */
        var that = this;
        var itemsIds = {};
        var allItems = this.state.aggregations.map(function (item) {
            var uid = Math.floor(Math.random() * 10000000000);
            var values = item.getValues();
            values.name = labels[values.name] ? labels[values.name] : values.name;
            itemsIds[values.id] = true;
            return {
                isActive: item.isUsed(),
                n: item.getN(),
                uid: uid,
                values: values
            };
        });
        /**
         * Shadow filters. These filters are not part of the aggregation list but are applied. Should always be listed
         * first
         */
        var appliedFilters = (props.applicationType === 6)
            ? (0, Helpers_1.getShadowFilterValuesFromQuery)(currentQuery, props.filterName, true)
            : (0, Helpers_1.getFilterValuesFromQuery)(currentQuery, props.filterName);
        if (appliedFilters.length > 0) {
            var zeroItemsFilters_1 = [];
            appliedFilters.forEach(function (filter) {
                if (itemsIds[filter] === undefined) {
                    var uid = Math.floor(Math.random() * 10000000000);
                    zeroItemsFilters_1.push({
                        isActive: true,
                        n: 0,
                        uid: uid,
                        values: {
                            id: filter,
                            name: filter
                        }
                    });
                }
            });
            allItems = __spreadArray(__spreadArray([], zeroItemsFilters_1, true), allItems, true);
        }
        /**
         * Get existing applied filters if they exist
         */
        if (allItems.length === 0) {
            return null;
        }
        var items = allItems.slice(0, this.state.viewLimit);
        var allItemsLength = allItems.length;
        var levelCounter = 1;
        /**
         * Check available view limit
         */
        var isViewLimitProperlySet = (viewLimit &&
            viewLimit < fetchLimit &&
            allItemsLength > viewLimit);
        return ((0, preact_1.h)("div", { className: "as-multipleFilter ".concat(containerClassName) },
            (0, preact_1.h)(Template_1["default"], { template: topTemplate, className: "as-multipleFilter__top ".concat(topClassName), dictionary: this.props.dictionary }),
            (0, preact_1.h)("div", { className: "as-multipleFilter__itemsList ".concat(itemsListClassName) },
                (0, preact_1.h)("ul", null, items.map(function (item) {
                    var formattedTemplateData = formatData(item);
                    var level = Math.min(levelCounter, _this.currentLevel + 1);
                    levelCounter++;
                    return ((0, preact_1.h)("li", { className: "as-multipleFilter__item " +
                            "".concat(itemClassName, " ") +
                            "".concat((item.isActive) ? activeClassName : ""), onClick: function (e) {
                            e.stopPropagation();
                            e.preventDefault();
                            that.handleClick(item.values.id, level);
                        } },
                        (0, preact_1.h)(Template_1["default"], { template: itemTemplate, data: formattedTemplateData, dictionary: _this.props.dictionary })));
                }))),
            (isViewLimitProperlySet)
                ? (0, preact_1.h)(ShowMoreComponent_1["default"], { allItemsLength: allItemsLength, currentLimit: this.state.viewLimit, handleShowMore: this.handleShowMore, handleShowLess: this.handleShowLess, showMoreContainerClassName: showMoreContainerClassName, showMoreTemplate: showMoreTemplate, showLessTemplate: showLessTemplate, dictionary: this.props.dictionary }) : null));
    };
    return MultipleFilterComponent;
}(preact_1.Component));
MultipleFilterComponent.defaultProps = {
    aggregationField: null,
    applicationType: 8,
    fetchLimit: 10,
    viewLimit: null,
    sortBy: ['_term', 'desc'],
    ranges: {},
    labels: {},
    classNames: {
        container: "",
        top: "",
        itemsList: "",
        item: "",
        active: "as-multipleFilter__item--active",
        showMoreContainer: ""
    },
    template: {
        top: null,
        item: defaultTemplates_1.defaultItemTemplate,
        showMore: "+ Show more",
        showLess: "- Show less"
    },
    formatData: function (data) { return data; },
    activeFirst: true,
    promoted: []
};
exports["default"] = MultipleFilterComponent;


/***/ }),

/***/ "./src/components/MultipleFilter/ShowMoreComponent.tsx":
/*!*************************************************************!*\
  !*** ./src/components/MultipleFilter/ShowMoreComponent.tsx ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
var preact_1 = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
var Template_1 = __webpack_require__(/*! ../Template */ "./src/components/Template.tsx");
/**
 * Show more component
 *
 * Provides two items
 *   -> Show more element
 *   -> Show less element
 */
var ShowMoreComponent = function (_a) {
    var allItemsLength = _a.allItemsLength, currentLimit = _a.currentLimit, handleShowMore = _a.handleShowMore, handleShowLess = _a.handleShowLess, showMoreContainerClassName = _a.showMoreContainerClassName, showMoreTemplate = _a.showMoreTemplate, showLessTemplate = _a.showLessTemplate, dictionary = _a.dictionary;
    return (allItemsLength > currentLimit)
        ? ((0, preact_1.h)("div", { className: "as-showMore ".concat(showMoreContainerClassName), onClick: handleShowMore },
            (0, preact_1.h)(Template_1["default"], { template: showMoreTemplate, className: "as-showMore--more", dictionary: dictionary })))
        : (allItemsLength === currentLimit)
            ? ((0, preact_1.h)("div", { className: "as-showMore ".concat(showMoreContainerClassName), onClick: handleShowLess },
                (0, preact_1.h)(Template_1["default"], { template: showLessTemplate, className: "as-showMore--less", dictionary: dictionary })))
            : null;
};
exports["default"] = ShowMoreComponent;


/***/ }),

/***/ "./src/components/MultipleFilter/defaultTemplates.tsx":
/*!************************************************************!*\
  !*** ./src/components/MultipleFilter/defaultTemplates.tsx ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.__esModule = true;
exports.defaultItemTemplate = void 0;
exports.defaultItemTemplate = "\n    <input\n        type=\"checkbox\"\n        id=\"filter_{{uid}}\"\n        class=\"as-multipleFilter__itemCheckbox\"\n        {{#isActive}}checked=\"checked\"{{/isActive}}\n    >\n    <label\n        class=\"as-multipleFilter__itemName\"\n        for=\"filter_{{uid}}\"\n    >\n        {{{values.name}}}\n    </label>\n    <span class=\"as-multipleFilter__itemNumber\">\n        {{n}}\n    </span>\n";


/***/ }),

/***/ "./src/components/Pagination/Helpers.ts":
/*!**********************************************!*\
  !*** ./src/components/Pagination/Helpers.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.__esModule = true;
exports.getEnd = exports.getStart = exports.totalPagesToArray = exports.getTotalPages = void 0;
/**
 * Get total pages from the total reached hits
 * divided by the hits per page configured
 *
 * If there are more than 10.000 items
 * We reduce the max num of items to 9.999
 * to take care of performance
 *
 * If total resulted pages are bigger than 999
 * we set 999 as the max number of pages
 *
 * @param totalHits
 * @param hitsPerPage
 *
 * @return {number}
 */
function getTotalPages(totalHits, hitsPerPage) {
    totalHits = (totalHits >= 10000)
        ? 9999
        : totalHits;
    var totalPages = Math.ceil(totalHits / hitsPerPage);
    return (totalPages > 999)
        ? 999
        : totalPages;
}
exports.getTotalPages = getTotalPages;
/**
 * Pass total pages number into an array of numbers
 *
 * @param totalPages
 *
 * @return {number[]}
 */
function totalPagesToArray(totalPages) {
    var pages = [];
    for (var index = 1; index <= totalPages; index++) {
        pages.push(index);
    }
    return pages;
}
exports.totalPagesToArray = totalPagesToArray;
/**
 * Get the starting point of the pages spectre
 *
 * @param totalPages
 * @param padding
 * @param currentPage
 * @param spectreSize
 * @param isTouchingLeft
 * @param isTouchingRight
 *
 * @return {number}
 */
function getStart(totalPages, padding, currentPage, spectreSize, isTouchingLeft, isTouchingRight) {
    if (isTouchingLeft) {
        return currentPage - (currentPage % spectreSize);
    }
    if (isTouchingRight) {
        var start = currentPage - (spectreSize - (totalPages % currentPage));
        return (start > 0) ? start : 0;
    }
    return currentPage - (padding + 1);
}
exports.getStart = getStart;
/**
 * Get the ending point of the pages spectre
 *
 * @param totalPages
 * @param padding
 * @param currentPage
 * @param spectreSize
 * @param isTouchingLeft
 * @param isTouchingRight
 *
 * @return {number}
 */
function getEnd(totalPages, padding, currentPage, spectreSize, isTouchingLeft, isTouchingRight) {
    if (isTouchingLeft) {
        return spectreSize;
    }
    if (isTouchingRight) {
        return totalPages;
    }
    return currentPage + padding;
}
exports.getEnd = getEnd;


/***/ }),

/***/ "./src/components/Pagination/NavigationComponent.tsx":
/*!***********************************************************!*\
  !*** ./src/components/Pagination/NavigationComponent.tsx ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
var preact_1 = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
var Template_1 = __webpack_require__(/*! ../Template */ "./src/components/Template.tsx");
/**
 * Arrow navigation component
 */
function NavigationComponent(_a) {
    var isVisible = _a.isVisible, classNames = _a.classNames, template = _a.template, handleClick = _a.handleClick;
    return (isVisible)
        ? ((0, preact_1.h)("li", { className: classNames, onClick: handleClick },
            (0, preact_1.h)(Template_1["default"], { template: template, dictionary: this.props.dictionary })))
        : null;
}
exports["default"] = NavigationComponent;


/***/ }),

/***/ "./src/components/Pagination/PaginationActions.ts":
/*!********************************************************!*\
  !*** ./src/components/Pagination/PaginationActions.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
exports.paginationChangeAction = void 0;
var Constants_1 = __webpack_require__(/*! ../../Constants */ "./src/Constants.ts");
var Container_1 = __webpack_require__(/*! ../../Container */ "./src/Container.ts");
var Clone_1 = __webpack_require__(/*! ../Clone */ "./src/components/Clone.ts");
/**
 * Pagination change
 *
 * @param environmentId
 * @param currentQuery
 * @param repository
 * @param selectedPage
 */
function paginationChangeAction(environmentId, currentQuery, repository, selectedPage) {
    window.postMessage({
        name: "apisearch_scroll_top"
    }, "*");
    var clonedQuery = Clone_1["default"].object(currentQuery);
    clonedQuery.page = selectedPage;
    var dispatcher = Container_1["default"].get("".concat(Constants_1.APISEARCH_DISPATCHER, "__").concat(environmentId));
    repository
        .query(clonedQuery)
        .then(function (result) {
        dispatcher.dispatch("RENDER_FETCHED_DATA", {
            query: clonedQuery,
            result: result
        });
    })["catch"](function (error) {
        // Do nothing
    });
}
exports.paginationChangeAction = paginationChangeAction;


/***/ }),

/***/ "./src/components/Pagination/PaginationComponent.tsx":
/*!***********************************************************!*\
  !*** ./src/components/Pagination/PaginationComponent.tsx ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var preact_1 = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
var Template_1 = __webpack_require__(/*! ../Template */ "./src/components/Template.tsx");
var Helpers_1 = __webpack_require__(/*! ./Helpers */ "./src/components/Pagination/Helpers.ts");
var NavigationComponent_1 = __webpack_require__(/*! ./NavigationComponent */ "./src/components/Pagination/NavigationComponent.tsx");
var PaginationActions_1 = __webpack_require__(/*! ./PaginationActions */ "./src/components/Pagination/PaginationActions.ts");
/**
 * Pagination Component
 */
var PaginationComponent = /** @class */ (function (_super) {
    __extends(PaginationComponent, _super);
    /**
     * Constructor
     */
    function PaginationComponent() {
        var _this = _super.call(this) || this;
        /**
         * Handle click
         *
         * @param page
         */
        _this.handleClick = function (page) {
            var _a = _this.props, store = _a.store, environmentId = _a.environmentId, repository = _a.repository;
            var currentResult = store.getCurrentResult();
            var currentQuery = store.getCurrentQuery();
            var totalPages = (0, Helpers_1.getTotalPages)(currentResult.getTotalHits(), currentQuery.getSize());
            /**
             * Do not let go further
             */
            if (page <= 0)
                page = 1;
            if (page >= totalPages)
                page = totalPages;
            if (currentQuery.getPage() === page) {
                return;
            }
            /**
             * Dispatch change page action
             */
            (0, PaginationActions_1.paginationChangeAction)(environmentId, currentQuery, repository, page);
        };
        _this.state = {
            page: 1
        };
        return _this;
    }
    /**
     * Component will receive props
     *
     * @param props
     */
    PaginationComponent.prototype.componentWillReceiveProps = function (props) {
        var page = props.store.getCurrentQuery().getPage();
        this.setState(function (prevState) {
            return {
                page: page
            };
        });
    };
    /**
     * Render
     *
     * @return {any}
     */
    PaginationComponent.prototype.render = function () {
        var _this = this;
        var props = this.props;
        var currentResult = props.store.getCurrentResult();
        if (props.store.getCurrentResult() == null) {
            return;
        }
        var currentQuerySize = props.store.getCurrentQuery().getSize();
        var totalPages = (0, Helpers_1.getTotalPages)(currentResult.getTotalHits(), currentQuerySize);
        /**
         * Hide container if hits are empty
         */
        if (currentResult.getTotalHits() === 0 ||
            totalPages === 1) {
            return null;
        }
        var padding = props.padding;
        var goFirstLast = props.goFirstLast;
        var containerClassName = props.classNames.container;
        var itemClassName = props.classNames.item;
        var activeClassName = props.classNames.active;
        var disabledClassName = props.classNames.disabled;
        var nextClassName = props.classNames.next;
        var previousClassName = props.classNames.previous;
        var lastClassName = props.classNames.last;
        var firstClassName = props.classNames.first;
        var itemTemplate = props.template.item;
        var nextTemplate = props.template.next;
        var previousTemplate = props.template.previous;
        var firstTemplate = props.template.first;
        var lastTemplate = props.template.last;
        var currentQueryPage = props.store.getCurrentQuery().getPage();
        /**
         * Get Total pages
         */
        var pages = (0, Helpers_1.totalPagesToArray)(totalPages);
        /**
         *  Get pages spectre
         */
        var spectreSize = (padding * 2) + 1;
        var isTouchingLeft = currentQueryPage <= (padding + 1);
        var isTouchingRight = (currentQueryPage + padding) >= totalPages;
        var spectre = pages.slice((0, Helpers_1.getStart)(totalPages, padding, currentQueryPage, spectreSize, isTouchingLeft, isTouchingRight), (0, Helpers_1.getEnd)(totalPages, padding, currentQueryPage, spectreSize, isTouchingLeft, isTouchingRight));
        /**
         * Dynamic disabled classes
         */
        var previousDisabledClass = (currentQueryPage === 1) ? disabledClassName : '';
        var nextDisabledClass = (currentQueryPage === totalPages) ? disabledClassName : '';
        return ((0, preact_1.h)("ul", { className: "as-pagination ".concat(containerClassName) },
            (0, preact_1.h)(NavigationComponent_1["default"], { isVisible: goFirstLast, classNames: "as-pagination__item as-pagination__item--first ".concat(firstClassName, " ").concat(previousDisabledClass), template: firstTemplate, handleClick: function () { return _this.handleClick(1); } }),
            (0, preact_1.h)(NavigationComponent_1["default"], { isVisible: true, classNames: "as-pagination__item as-pagination__item--previous ".concat(previousClassName, " ").concat(previousDisabledClass), template: previousTemplate, handleClick: function () { return _this.handleClick(currentQueryPage - 1); } }),
            spectre.map(function (page) { return ((0, preact_1.h)("li", { className: "as-pagination__item as-pagination__item--link ".concat(itemClassName, " ").concat((currentQueryPage === page) ? activeClassName : ''), onClick: function () { return _this.handleClick(page); } },
                (0, preact_1.h)(Template_1["default"], { template: itemTemplate, data: { page: page.toLocaleString('de-DE') }, dictionary: _this.props.dictionary }))); }),
            (0, preact_1.h)(NavigationComponent_1["default"], { isVisible: true, classNames: "as-pagination__item as-pagination__item--next ".concat(nextClassName, " ").concat(nextDisabledClass), template: nextTemplate, handleClick: function () { return _this.handleClick(currentQueryPage + 1); } }),
            (0, preact_1.h)(NavigationComponent_1["default"], { isVisible: goFirstLast, classNames: "as-pagination__item as-pagination__item--last ".concat(lastClassName, " ").concat(nextDisabledClass), template: lastTemplate, handleClick: function () { return _this.handleClick(totalPages); } })));
    };
    return PaginationComponent;
}(preact_1.Component));
PaginationComponent.defaultProps = {
    padding: 3,
    goFirstLast: false,
    classNames: {
        container: '',
        item: '',
        active: 'as-pagination__item--active',
        disabled: 'as-pagination__item--disabled',
        next: '',
        first: '',
        previous: '',
        last: ''
    },
    template: {
        item: '{{page}}',
        next: '>',
        previous: '<',
        first: '<<',
        last: '>>'
    }
};
exports["default"] = PaginationComponent;


/***/ }),

/***/ "./src/components/RangeFilter/RangeFilterActions.ts":
/*!**********************************************************!*\
  !*** ./src/components/RangeFilter/RangeFilterActions.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
exports.filterAction = exports.aggregationSetup = void 0;
/**
 * SortBy actions
 */
var apisearch_1 = __webpack_require__(/*! apisearch */ "./node_modules/apisearch/lib/index.js");
var Constants_1 = __webpack_require__(/*! ../../Constants */ "./src/Constants.ts");
var Container_1 = __webpack_require__(/*! ../../Container */ "./src/Container.ts");
var Clone_1 = __webpack_require__(/*! ../Clone */ "./src/components/Clone.ts");
/**
 * @param environmentId
 * @param currentQuery
 * @param filterName
 * @param filterField
 * @param min
 * @param max
 */
function aggregationSetup(environmentId, currentQuery, filterName, filterField, min, max) {
    var withMinMax = min === null || max === null;
    var clonedQuery = Clone_1["default"].object(currentQuery);
    var filterType = withMinMax ? 'range_min_max' : 'range';
    var filterValues = withMinMax ? ['..'] : [min + '..' + max];
    clonedQuery.aggregateByRange(filterName, filterField, filterValues, apisearch_1.FILTER_AT_LEAST_ONE, filterType);
    var dispatcher = Container_1["default"].get("".concat(Constants_1.APISEARCH_DISPATCHER, "__").concat(environmentId));
    dispatcher.dispatch("UPDATE_APISEARCH_SETUP", {
        query: clonedQuery
    });
}
exports.aggregationSetup = aggregationSetup;
/**
 * @param environmentId
 * @param currentQuery
 * @param repository
 * @param filterName
 * @param filterField
 * @param from
 * @param to
 * @param deleteMinMaxAggregation
 */
function filterAction(environmentId, currentQuery, repository, filterName, filterField, from, to) {
    window.postMessage({
        name: "apisearch_scroll_top"
    }, "*");
    var clonedQuery = Clone_1["default"].object(currentQuery);
    var realValueFrom = Math.min(from, to);
    var realValueTo = Math.max(from, to);
    var toWithIncluded = realValueTo + ']';
    clonedQuery.filterByRange(filterName, filterField, [], [realValueFrom + ".." + toWithIncluded], apisearch_1.FILTER_AT_LEAST_ONE, 'range_min_max', false);
    clonedQuery.page = 1;
    var dispatcher = Container_1["default"].get("".concat(Constants_1.APISEARCH_DISPATCHER, "__").concat(environmentId));
    repository
        .query(clonedQuery)
        .then(function (result) {
        dispatcher.dispatch("RENDER_FETCHED_DATA", {
            query: clonedQuery,
            result: result
        });
    })["catch"](function (error) {
        // Do nothing
    });
}
exports.filterAction = filterAction;


/***/ }),

/***/ "./src/components/RangeFilter/RangeFilterComponent.tsx":
/*!*************************************************************!*\
  !*** ./src/components/RangeFilter/RangeFilterComponent.tsx ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var apisearch_1 = __webpack_require__(/*! apisearch */ "./node_modules/apisearch/lib/index.js");
var preact_1 = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
var compat_1 = __webpack_require__(/*! preact/compat */ "./node_modules/preact/compat/dist/compat.module.js");
var Template_1 = __webpack_require__(/*! ../Template */ "./src/components/Template.tsx");
var RangeFilterActions_1 = __webpack_require__(/*! ./RangeFilterActions */ "./src/components/RangeFilter/RangeFilterActions.ts");
/**
 * Range Filter Component
 */
var RangeFilterComponent = /** @class */ (function (_super) {
    __extends(RangeFilterComponent, _super);
    function RangeFilterComponent() {
        var _this = _super.call(this) || this;
        _this.uid = Math.random().toString(16).substr(2, 12);
        _this.observerFrom = _this.configureFromObserver();
        _this.observerTo = _this.configureToObserver();
        _this.rangeUid = 'range-' + _this.uid;
        _this.setState(function (prevState) {
            return {
                from: null,
                to: null,
                min: null,
                max: null,
                visible: true
            };
        });
        return _this;
    }
    /**
     * Components will mount
     */
    RangeFilterComponent.prototype.componentWillMount = function () {
        var props = this.props;
        var environmentId = props.environmentId;
        var filterName = props.filterName;
        var filterField = props.filterField;
        var currentQuery = props.store.getCurrentQuery();
        (0, RangeFilterActions_1.aggregationSetup)(environmentId, currentQuery, filterName, filterField, props.minValue, props.maxValue);
    };
    RangeFilterComponent.prototype.configureFromObserver = function () {
        var that = this;
        return new MutationObserver(function (mutationsList, observer) {
            // Use traditional 'for loops' for IE 11
            for (var _i = 0, mutationsList_1 = mutationsList; _i < mutationsList_1.length; _i++) {
                var mutation = mutationsList_1[_i];
                if (mutation.attributeName === 'value') {
                    var value = parseInt(mutation.target["defaultValue"]);
                    if (value == that.state.from) {
                        return;
                    }
                    that.handleSliderChange([value, that.state.to]);
                }
            }
        });
    };
    RangeFilterComponent.prototype.configureToObserver = function () {
        var that = this;
        return new MutationObserver(function (mutationsList, observer) {
            // Use traditional 'for loops' for IE 11
            for (var _i = 0, mutationsList_2 = mutationsList; _i < mutationsList_2.length; _i++) {
                var mutation = mutationsList_2[_i];
                if (mutation.attributeName === 'value') {
                    var value = parseInt(mutation.target["defaultValue"]);
                    if (value == that.state.to) {
                        return;
                    }
                    that.handleSliderChange([that.state.from, value]);
                }
            }
        });
    };
    RangeFilterComponent.prototype.componentDidMount = function () {
        this.observerFrom.observe(document.getElementsByClassName('as-rangeFilter__from__' + this.uid)[0], { attributes: true });
        this.observerTo.observe(document.getElementsByClassName('as-rangeFilter__to__' + this.uid)[0], { attributes: true });
    };
    RangeFilterComponent.prototype.componentWillUnmount = function () {
        this.observerFrom.disconnect();
        this.observerTo.disconnect();
    };
    /**
     * Handle change
     *
     * @param e
     */
    RangeFilterComponent.prototype.handleChange = function (e) {
        var uid = this.uid;
        this.applyFilter(e.target.parentNode.getElementsByClassName('as-rangeFilter__from__' + uid)[0].value, e.target.parentNode.getElementsByClassName('as-rangeFilter__to__' + uid)[0].value);
    };
    ;
    RangeFilterComponent.prototype.handleSliderChange = function (values) {
        if (values[0] === this.state.from &&
            values[1] === this.state.to) {
            return false;
        }
        this.applyFilter(values[0], values[1]);
    };
    ;
    /**
     * @param values
     */
    RangeFilterComponent.prototype.handleSliderMove = function (values) {
        this.updateRangeLayer(this.props, this.state, values[0], values[1]);
    };
    ;
    /**
     * Component will receive props
     *
     * @param props
     */
    RangeFilterComponent.prototype.componentWillReceiveProps = function (props) {
        var currentResult = props
            .store
            .getCurrentResult();
        var aggregation = currentResult.getAggregation(props.filterName);
        if (!(aggregation instanceof apisearch_1.ResultAggregation)) {
            this.setState(function (prevState) {
                return {
                    from: prevState.from,
                    to: prevState.to,
                    min: prevState.min,
                    max: prevState.max,
                    currency_placeholder: prevState.currency_placeholder,
                    visible: false
                };
            });
            return;
        }
        var metadata = aggregation.getMetadata();
        var filter = props
            .store
            .getCurrentQuery()
            .getFilter(props.filterName);
        var min = typeof props.minValue === "number" && props.minValue > 0
            ? props.minValue
            : (typeof metadata['min'] === "number"
                ? Math.floor(metadata['min'])
                : undefined);
        var max = typeof props.maxValue === "number" && props.maxValue > 0
            ? props.maxValue
            : (typeof metadata['max'] === "number"
                ? Math.ceil(metadata['max'])
                : undefined);
        var currencyPlaceholder = null;
        var firstItem = currentResult.getFirstItem();
        if (firstItem) {
            var firstItemPrice = firstItem.get('price');
            var firstItemPriceWithCurrency = firstItem.get('price_with_currency');
            if (firstItemPrice && firstItemPriceWithCurrency) {
                currencyPlaceholder = this.getCurrencyPlaceholderFromPriceAndPriceWithCurrency(firstItemPrice, firstItemPriceWithCurrency);
            }
        }
        var fromTo = this.getFromToFromFilter(filter, min, max);
        this.setState(function (prevState) {
            return {
                from: fromTo[0],
                to: fromTo[1],
                min: min,
                max: max,
                currency_placeholder: currencyPlaceholder,
                visible: ((typeof min === "number") && (typeof max === "number"))
            };
        });
    };
    /**
     * @param filter
     * @param min
     * @param max
     */
    RangeFilterComponent.prototype.getFromToFromFilter = function (filter, min, max) {
        var realMin = Math.min(min, max);
        var realMax = Math.max(min, max);
        if (filter instanceof apisearch_1.Filter) {
            var filterValue = filter.getValues()[0];
            if (typeof filterValue === "string") {
                var parts = filterValue.split('..');
                var from = parts[0];
                var to = parts[1].slice(0, -1);
                return [
                    Math.max(realMin, parseInt(from)),
                    Math.min(realMax, parseInt(to)),
                ];
            }
        }
        return [realMin, realMax];
    };
    /**
     * @param previousProps
     * @param previousState
     */
    RangeFilterComponent.prototype.componentDidUpdate = function (previousProps, previousState) {
        this.updateRangeLayer(previousProps, previousState, previousState.from, previousState.to);
    };
    /**
     * @param props
     * @param state
     * @param from
     * @param to
     */
    RangeFilterComponent.prototype.updateRangeLayer = function (props, state, from, to) {
        var min = state.min;
        var max = state.max;
        if (typeof from === "number" &&
            typeof to === "number" &&
            typeof props.callback === "function") {
            props.callback(Math.min(from, to), Math.max(from, to), min, max, this.rangeUid, state.currency_placeholder);
        }
    };
    /**
     * @param props
     * @param state
     */
    RangeFilterComponent.prototype.render = function (props, state) {
        var _this = this;
        var filterName = props.filterName;
        var ref = (0, compat_1.useRef)(null);
        var topTemplate = props.template.top;
        var sliderTemplate = props.template.slider;
        var containerClassName = props.classNames.container;
        var topClassName = props.classNames.top;
        var wrapperClassName = props.classNames.wrapper;
        var that = this;
        (0, compat_1.useEffect)(function () {
            var self = _this;
            if (!ref.current) {
                return;
            }
            var uid = _this.uid;
            /**
             * Alert if clicked on outside of element
             */
            function handleChange(event) {
                var target = event.target;
                var parentNode = target.parentNode;
                self.applyFilter(parentNode.getElementsByClassName('as-rangeFilter__from__' + uid)[0].value, parentNode.getElementsByClassName('as-rangeFilter__to__' + uid)[0].value);
            }
            // Bind the event listener
            ref.current.addEventListener("change", handleChange);
            return function () {
                // Unbind the event listener on clean up
                ref.current.removeEventListener("change", handleChange);
            };
        }, [ref]);
        var isNative = props.native;
        var isNotNative = !isNative;
        var type = isNative ? 'range' : 'number';
        var eventName = 'onClick';
        var from = state.from;
        var to = state.to;
        var min = state.min;
        var max = state.max;
        var isVisible = state.visible && !(props.store.currentResult.getTotalHits() === 0 &&
            from === min &&
            to === max);
        var visibleStyle = isVisible ? '' : 'display:none!important;';
        return ((0, preact_1.h)("div", { id: this.rangeUid, className: "as-rangeFilter ".concat(containerClassName), style: visibleStyle },
            (0, preact_1.h)(Template_1["default"], { template: topTemplate, className: "as-rangeFilter__top ".concat(topClassName), dictionary: this.props.dictionary }),
            (0, preact_1.h)("div", { className: "as-rangeFilter__wrapper ".concat(wrapperClassName) },
                (0, preact_1.h)("input", __assign({ type: type, "class": "as-rangeFilter__from ".concat(props.classNames.input, " as-rangeFilter__").concat(this.uid, " as-rangeFilter__from__").concat(this.uid) }, props.attributes.from, { value: from, min: min, max: max, step: props.step, onClick: function (e) {
                        if (isNotNative)
                            return false;
                        that.handleSliderChange([parseInt(e.target.value), to]);
                    }, onTouchEnd: function (e) {
                        if (isNotNative)
                            return false;
                        that.handleSliderChange([parseInt(e.target.value), to]);
                    }, onChange: function (e) {
                        var positions = [parseInt(e.target.value), to];
                        if (isNative) {
                            that.handleSliderMove(positions);
                            return false;
                        }
                        that.handleSliderChange(positions);
                    }, autocomplete: "off" })),
                (0, preact_1.h)("input", __assign({ type: type, "class": "as-rangeFilter__to ".concat(props.classNames.input, " as-rangeFilter__").concat(this.uid, " as-rangeFilter__to__").concat(this.uid) }, props.attributes.to, { value: to, min: min, max: max, step: props.step, onClick: function (e) {
                        if (isNotNative)
                            return false;
                        that.handleSliderChange([from, parseInt(e.target.value)]);
                    }, onTouchEnd: function (e) {
                        if (isNotNative)
                            return false;
                        that.handleSliderChange([from, parseInt(e.target.value)]);
                    }, onChange: function (e) {
                        var positions = [from, parseInt(e.target.value)];
                        if (isNative) {
                            that.handleSliderMove(positions);
                            return false;
                        }
                        that.handleSliderChange(positions);
                    }, autocomplete: "off" })),
                (0, preact_1.h)("div", { "class": "slider" },
                    (0, preact_1.h)(Template_1["default"], { template: sliderTemplate, dictionary: this.props.dictionary })))));
    };
    /**
     * Apply filter
     */
    RangeFilterComponent.prototype.applyFilter = function (valueFrom, valueTo) {
        var props = this.props;
        /**
         * Dispatch action
         */
        (0, RangeFilterActions_1.filterAction)(props.environmentId, props.store.getCurrentQuery(), props.repository, props.filterName, props.filterField, valueFrom, valueTo);
    };
    /**
     * @param price
     * @param priceWithCurrency
     * @private
     */
    RangeFilterComponent.prototype.getCurrencyPlaceholderFromPriceAndPriceWithCurrency = function (price, priceWithCurrency) {
        price = (price + '').replace('.', '').replace(',', '');
        priceWithCurrency = (priceWithCurrency + '').replace('.', '').replace(',', '');
        var regex = new RegExp(price + '0*');
        var currencyPlaceholder = priceWithCurrency.replace(regex, "__price__");
        return currencyPlaceholder;
    };
    return RangeFilterComponent;
}(preact_1.Component));
RangeFilterComponent.defaultProps = {
    maxValueIncluded: true,
    step: 1,
    minValue: null,
    maxValue: null,
    native: false,
    classNames: {
        container: '',
        top: '',
        wrapper: '',
        input: '',
        from: '',
        to: ''
    },
    attributes: {
        from: '',
        to: ''
    },
    template: {
        top: '',
        slider: ''
    }
};
exports["default"] = RangeFilterComponent;


/***/ }),

/***/ "./src/components/Reload/ReloadActions.ts":
/*!************************************************!*\
  !*** ./src/components/Reload/ReloadActions.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
exports.reloadAction = void 0;
/**
 * Clear filters actions
 */
var apisearch_1 = __webpack_require__(/*! apisearch */ "./node_modules/apisearch/lib/index.js");
var Constants_1 = __webpack_require__(/*! ../../Constants */ "./src/Constants.ts");
var Container_1 = __webpack_require__(/*! ../../Container */ "./src/Container.ts");
var Clone_1 = __webpack_require__(/*! ../Clone */ "./src/components/Clone.ts");
/**
 * Clear filters action
 *
 * @param environmentId
 * @param currentQuery
 * @param repository
 */
function reloadAction(environmentId, currentQuery, repository) {
    window.postMessage({
        name: "apisearch_scroll_top"
    }, "*");
    var clonedQuery = Clone_1["default"].object(currentQuery);
    var dispatcher = Container_1["default"].get("".concat(Constants_1.APISEARCH_DISPATCHER, "__").concat(environmentId));
    if (repository instanceof apisearch_1.HttpRepository) {
        var httpClient = repository.getHttpClient();
        if (httpClient instanceof apisearch_1.CacheClient) {
            httpClient.flushCache();
        }
    }
    repository
        .query(clonedQuery)
        .then(function (result) {
        dispatcher.dispatch("RENDER_FETCHED_DATA", {
            query: clonedQuery,
            result: result
        });
    })["catch"](function (error) {
        // Do nothing
    });
}
exports.reloadAction = reloadAction;


/***/ }),

/***/ "./src/components/Reload/ReloadComponent.tsx":
/*!***************************************************!*\
  !*** ./src/components/Reload/ReloadComponent.tsx ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var preact_1 = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
var Template_1 = __webpack_require__(/*! ../Template */ "./src/components/Template.tsx");
var ReloadActions_1 = __webpack_require__(/*! ./ReloadActions */ "./src/components/Reload/ReloadActions.ts");
/**
 * ReloadComponent
 */
var ReloadComponent = /** @class */ (function (_super) {
    __extends(ReloadComponent, _super);
    function ReloadComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Handle click
         */
        _this.handleClick = function () {
            var props = _this.props;
            var environmentId = props.environmentId;
            var currentQuery = props.store.getCurrentQuery();
            var repository = props.repository;
            /**
             * Dispatch a clear filter action
             */
            (0, ReloadActions_1.reloadAction)(environmentId, currentQuery, repository);
        };
        return _this;
    }
    /**
     * Render
     *
     * @return {}
     */
    ReloadComponent.prototype.render = function () {
        var props = this.props;
        var containerClassName = props.classNames.container;
        var containerTemplate = props.template.container;
        return ((0, preact_1.h)("div", { className: "as-clearFilters ".concat(containerClassName), onClick: this.handleClick },
            (0, preact_1.h)(Template_1["default"], { template: containerTemplate, dictionary: this.props.dictionary })));
    };
    return ReloadComponent;
}(preact_1.Component));
ReloadComponent.defaultProps = {
    classNames: {
        container: ""
    },
    template: {
        container: "Reload"
    }
};
exports["default"] = ReloadComponent;


/***/ }),

/***/ "./src/components/Result/Item.tsx":
/*!****************************************!*\
  !*** ./src/components/Result/Item.tsx ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var preact_1 = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
var Highlight_1 = __webpack_require__(/*! ../../Highlight */ "./src/Highlight.ts");
var Template_1 = __webpack_require__(/*! ../Template */ "./src/components/Template.tsx");
/**
 * Item
 */
var Item = /** @class */ (function (_super) {
    __extends(Item, _super);
    function Item() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param nextProps
     * @param nextState
     */
    Item.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        var shouldUpdate = this.props.data.uuid_composed !== nextProps.data.uuid_composed;
        if (!shouldUpdate) {
            this.highlight();
        }
        return shouldUpdate;
    };
    Item.prototype.componentDidMount = function () {
        this.highlight();
    };
    Item.prototype.componentDidUpdate = function () {
        this.highlight();
    };
    Item.prototype.highlight = function () {
        var queryText = this.props.data.query_text;
        if (this.props.data.highlights_enabled && queryText !== "") {
            var element = document.getElementById("as-result-" + this.props.data.uuid_composed);
            (0, Highlight_1.highlightElement)(element, queryText);
        }
    };
    /**
     * Render
     *
     * @return {any}
     */
    Item.prototype.render = function () {
        var _a;
        var props = this.props;
        var template = props.template;
        var data = props.data;
        var dictionary = (_a = props.dictionary) !== null && _a !== void 0 ? _a : {};
        var id = "as-result-" + data.uuid_composed;
        return (0, preact_1.h)(Template_1["default"], { template: template, data: data, id: id, className: "".concat(props.className), dictionary: dictionary });
    };
    return Item;
}(preact_1.Component));
exports["default"] = Item;


/***/ }),

/***/ "./src/components/Result/ResultActions.ts":
/*!************************************************!*\
  !*** ./src/components/Result/ResultActions.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
exports.infiniteScrollNextPageAction = exports.configureQuery = void 0;
var Constants_1 = __webpack_require__(/*! ../../Constants */ "./src/Constants.ts");
var Container_1 = __webpack_require__(/*! ../../Container */ "./src/Container.ts");
var Clone_1 = __webpack_require__(/*! ../Clone */ "./src/components/Clone.ts");
/**
 *
 * Configure query
 *
 * @param environmentId
 * @param currentQuery
 * @param itemsPerPage
 * @param highlightsEnabled
 * @param promotedUUIDs
 * @param excludedUUIDs
 * @param fields
 * @param filter
 * @param minScore
 */
function configureQuery(environmentId, currentQuery, itemsPerPage, highlightsEnabled, promotedUUIDs, excludedUUIDs, fields, filter, minScore) {
    var clonedQuery = Clone_1["default"].object(currentQuery);
    filter(clonedQuery);
    /**
     * Set result size
     */
    clonedQuery.size = itemsPerPage;
    /**
     * Set specific fields
     */
    clonedQuery.setFields(fields);
    /**
     * Promoted uuids
     */
    for (var i in promotedUUIDs) {
        clonedQuery.promoteUUID(promotedUUIDs[i]);
    }
    /**
     * excluded uuids
     */
    for (var i in excludedUUIDs) {
        clonedQuery.excludeUUID(excludedUUIDs[i]);
    }
    if (minScore > 0) {
        clonedQuery.minScore = minScore;
    }
    var dispatcher = Container_1["default"].get("".concat(Constants_1.APISEARCH_DISPATCHER, "__").concat(environmentId));
    dispatcher.dispatch("UPDATE_APISEARCH_SETUP", {
        query: clonedQuery
    });
}
exports.configureQuery = configureQuery;
/**
 * Pagination change
 *
 * @param environmentId
 * @param currentQuery
 * @param repository
 * @param nextPage
 */
function infiniteScrollNextPageAction(environmentId, currentQuery, repository, nextPage) {
    var clonedQuery = Clone_1["default"].object(currentQuery);
    clonedQuery.page = nextPage;
    var dispatcher = Container_1["default"].get("".concat(Constants_1.APISEARCH_DISPATCHER, "__").concat(environmentId));
    repository
        .query(clonedQuery)
        .then(function (result) {
        dispatcher.dispatch("RENDER_FETCHED_DATA", {
            query: clonedQuery,
            result: result
        });
    })["catch"](function (error) {
        // Do nothing
    });
}
exports.infiniteScrollNextPageAction = infiniteScrollNextPageAction;


/***/ }),

/***/ "./src/components/Result/ResultComponent.tsx":
/*!***************************************************!*\
  !*** ./src/components/Result/ResultComponent.tsx ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var ItemUUID_1 = __webpack_require__(/*! apisearch/lib/Model/ItemUUID */ "./node_modules/apisearch/lib/Model/ItemUUID.js");
var preact_1 = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
var compat_1 = __webpack_require__(/*! preact/compat */ "./node_modules/preact/compat/dist/compat.module.js");
var Constants_1 = __webpack_require__(/*! ../../Constants */ "./src/Constants.ts");
var Container_1 = __webpack_require__(/*! ../../Container */ "./src/Container.ts");
var Template_1 = __webpack_require__(/*! ../Template */ "./src/components/Template.tsx");
var defaultTemplates_1 = __webpack_require__(/*! ./defaultTemplates */ "./src/components/Result/defaultTemplates.tsx");
var Item_1 = __webpack_require__(/*! ./Item */ "./src/components/Result/Item.tsx");
var ResultActions_1 = __webpack_require__(/*! ./ResultActions */ "./src/components/Result/ResultActions.ts");
var Common_1 = __webpack_require__(/*! ../Common */ "./src/components/Common.ts");
/**
 * Result Component
 */
var ResultComponent = /** @class */ (function (_super) {
    __extends(ResultComponent, _super);
    /**
     * Constructor
     */
    function ResultComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.fromLoadingNextPage = false;
        _this.observer = (0, compat_1.useRef)();
        _this.endResultsBoxRef = (0, compat_1.useCallback)(function (node) {
            if (_this.observer.current instanceof IntersectionObserver) {
                _this.observer.current.disconnect();
            }
            _this.observer.current = new IntersectionObserver(function (entries) {
                if (entries[0].isIntersecting) {
                    _this.loadNextPage();
                }
            });
            if ((_this.observer.current instanceof IntersectionObserver) && node) {
                _this.observer.current.observe(node);
            }
        }, []);
        /**
         * @param word
         */
        _this.handleAlternativeClick = function (word) {
            var props = _this.props;
            /**
             * Dispatch action
             */
            (0, Common_1.onWordClickAction)(props.environmentId, props.store.getCurrentQuery(), props.repository, word);
        };
        _this.state = {
            customResponse: "",
            focus: props.fadeInSelector === "",
            hasNewPage: false,
            items: [],
            page: 0
        };
        return _this;
    }
    ResultComponent.prototype.loadNextPage = function () {
        var _a = this.props, environmentId = _a.environmentId, store = _a.store, repository = _a.repository;
        this.fromLoadingNextPage = true;
        this.currentExpectedPage = this.state.page + 1;
        (0, ResultActions_1.infiniteScrollNextPageAction)(environmentId, store.getCurrentQuery(), repository, this.currentExpectedPage);
    };
    /**
     * Hook that change state once mouse clicks inside or outside the container
     */
    ResultComponent.prototype.addMouseDownListeners = function (ref, fadeInSelector) {
        var _this = this;
        (0, compat_1.useEffect)(function () {
            var self = _this;
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                self.setState(function () {
                    return {
                        focus: event.target.closest(fadeInSelector) != null
                    };
                });
            }
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return function () {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    };
    /**
     * Component will receive props
     *
     * @param props
     */
    ResultComponent.prototype.componentWillReceiveProps = function (props) {
        if (props.store.getCurrentResult() == null) {
            this.setState(function (_) {
                return {
                    customResponse: "",
                    hasNewPage: false,
                    items: [],
                    page: 0
                };
            });
            return;
        }
        var currentResult = props.store.getCurrentResult();
        var currentQuery = props.store.getCurrentQuery();
        var items = currentResult.getItems();
        var currentPage = this.page();
        var hasNewPage = (currentResult.getTotalHits() > (currentPage * currentQuery.getSize()));
        var currentItems = this.fromLoadingNextPage
            ? this.state.items.concat(items)
            : items;
        this.fromLoadingNextPage = false;
        this.currentExpectedPage = undefined;
        this.setState(function (_) {
            return {
                customResponse: currentResult.getMetadataValue("custom_response"),
                hasNewPage: hasNewPage,
                items: currentItems,
                page: currentPage
            };
        });
    };
    /**
     * Component will mount
     */
    ResultComponent.prototype.componentWillMount = function () {
        var props = this.props;
        /**
         * Dispatch action
         */
        (0, ResultActions_1.configureQuery)(props.environmentId, props.store.getCurrentQuery(), props.itemsPerPage, props.highlightsEnabled, props.promote.map(function (itemUUID) {
            return itemUUID instanceof ItemUUID_1.ItemUUID
                ? itemUUID
                : ItemUUID_1.ItemUUID.createFromArray(itemUUID);
        }), props.exclude.map(function (itemUUID) {
            return itemUUID instanceof ItemUUID_1.ItemUUID
                ? itemUUID
                : ItemUUID_1.ItemUUID.createFromArray(itemUUID);
        }), props.fields, props.filter, props.minScore);
    };
    /**
     * @private
     */
    ResultComponent.prototype.page = function () {
        var _a;
        return (_a = this.currentExpectedPage) !== null && _a !== void 0 ? _a : this.props.store.getCurrentQuery().getPage();
    };
    /**
     * Render
     *
     * @return {any}
     */
    ResultComponent.prototype.render = function () {
        var _this = this;
        var _a;
        var that = this;
        var props = this.props;
        var dirty = props.store.isDirty();
        var containerClassName = props.classNames.container;
        var itemsListClassName = props.classNames.itemsList;
        var placeholderClassName = props.classNames.placeholder;
        var itemsListTemplate = props.template.itemsList;
        var placeholderTemplate = (_a = props.template.placeholder) !== null && _a !== void 0 ? _a : "";
        var currentResult = props.store.getCurrentResult();
        var currentQuery = props.store.getCurrentQuery();
        var currentVisibleResults = props.currentVisibleResults;
        var subResults = Object.values(currentResult.getSubresults());
        var wrapperRef = (0, compat_1.useRef)(null);
        var customResponse = currentResult.getMetadataValue("custom_response");
        var redirection = currentResult.getMetadataValue("redirection");
        // Check for custom response html
        var customResponseBody;
        if (customResponse) {
            customResponseBody = ((0, preact_1.h)(Template_1["default"], { template: customResponse.content, className: "as-result__custom_response", dictionary: this.props.dictionary }));
            if (customResponse.only) {
                return customResponseBody;
            }
        }
        var withoutEnterRedirection = false;
        if (redirection) {
            if (redirection.type === "automatic") {
                window.top.location.href = redirection.url;
            }
            else if (redirection.type === "on_enter") {
                window.postMessage({
                    name: "apisearch_bind_enter_redirection",
                    url: redirection.url
                }, "*");
                withoutEnterRedirection = false;
            }
        }
        if (withoutEnterRedirection) {
            window.postMessage({
                name: "apisearch_bind_enter_redirection",
                url: undefined
            }, "*");
        }
        var hasInfiniteScrollNextPage = (props.infiniteScroll !== false) &&
            ((props.infiniteScroll === true) ||
                (props.infiniteScroll >= 0)) &&
            this.state.hasNewPage;
        var infiniteScrollMargin = hasInfiniteScrollNextPage
            ? (props.infiniteScroll === true
                ? 0
                : props.infiniteScroll)
            : undefined;
        if (props.fadeInSelector !== "") {
            this.addMouseDownListeners(wrapperRef, props.fadeInSelector);
        }
        if (!currentVisibleResults || !this.state.focus) {
            return ((0, preact_1.h)("div", { className: "as-result ".concat(containerClassName) }));
        }
        /**
         * Data accessible to the template
         */
        var items = this.state.items;
        var reducedTemplateData = {
            query: currentQuery.getQueryText(),
            suggestions: currentResult.getSuggestions()
        };
        /**
         * We should add positions to items
         * When the number of items to render is higher than the page size, we are in front of infinite scroll
         */
        var page = this.state.page;
        var isInfiniteActive = page > 1;
        var firstItem = ((this.state.page - 1) * currentQuery.getSize());
        var itemsForEvent = items;
        if (isInfiniteActive) {
            itemsForEvent = Array.prototype.slice.call(items, firstItem);
        }
        Array.prototype.forEach.call(itemsForEvent, function (item) {
            item.position = ++firstItem;
            item.id = item.getId();
        });
        window.postMessage({
            name: "apisearch_result_items",
            query: currentQuery.toArray(),
            query_text: currentQuery.getQueryText(),
            with_results: items.length > 0,
            page: this.state.page,
            site: props.store.getSite(),
            device: props.store.getDevice(),
            items: itemsForEvent.map(function (item) {
                return {
                    fields: item.fields,
                    uuid: item.uuid
                };
            })
        }, "*");
        /**
         * Uses defined a custom items list. Old version
         */
        if (props.template.itemsList !== defaultTemplates_1.defaultItemsListTemplate) {
            return ((0, preact_1.h)("div", { className: "as-result ".concat(containerClassName), ref: wrapperRef, style: "position: relative" },
                (dirty)
                    ? (0, preact_1.h)(Template_1["default"], { template: placeholderTemplate, className: "as-result__placeholder ".concat(placeholderClassName), dictionary: this.props.dictionary })
                    : (0, preact_1.h)(Template_1["default"], { template: itemsListTemplate, data: __assign(__assign({}, reducedTemplateData), { items: (items)
                                ? items.map(function (item) { return _this.hydrateItem(item); })
                                : [] }), className: "as-result__itemsList ".concat(itemsListClassName), dictionary: this.props.dictionary }),
                hasInfiniteScrollNextPage
                    ? (props.infiniteScrollButton
                        ? (0, preact_1.h)("div", { onClick: function (e) {
                                that.loadNextPage();
                            } },
                            (0, preact_1.h)(Template_1["default"], { template: props.template.next_page_button, data: {
                                    page: this.state.page + 1
                                } }))
                        : (0, preact_1.h)("div", { ref: this.endResultsBoxRef, style: "bottom: ".concat(infiniteScrollMargin, "px; position: relative;") }))
                    : ""));
        }
        if (dirty) {
            return ((0, preact_1.h)("div", { className: "as-result ".concat(containerClassName), ref: wrapperRef },
                (0, preact_1.h)(Template_1["default"], { template: placeholderTemplate, className: "as-result__placeholder ".concat(placeholderClassName), dictionary: props.dictionary })));
        }
        /**
         * New version
         */
        return ((0, preact_1.h)("div", { className: "as-result ".concat(containerClassName), ref: wrapperRef },
            customResponseBody,
            (dirty)
                ? (0, preact_1.h)(Template_1["default"], { template: placeholderTemplate, className: "as-result__placeholder ".concat(placeholderClassName), dictionary: this.props.dictionary })
                : ((items.length > 0)
                    ? ((0, preact_1.h)("div", { className: "as-result__itemsList ".concat(props.classNames.itemsList) },
                        items.map(function (item) {
                            return (0, preact_1.h)(Item_1["default"], { data: __assign(__assign({}, reducedTemplateData), _this.hydrateItem(item)), template: props.template.item, className: "as-result__item ".concat(props.classNames.item), dictionary: props.dictionary });
                        }),
                        hasInfiniteScrollNextPage
                            ? (props.infiniteScrollButton
                                ? ""
                                : ((0, preact_1.h)("div", { id: "as-result__infinite_scroll_inspector", ref: this.endResultsBoxRef, style: "bottom: ".concat(infiniteScrollMargin, "px; position: relative; width: 100%;") })))
                            : ""))
                    : ""),
            hasInfiniteScrollNextPage
                ? (props.infiniteScrollButton
                    ? ((0, preact_1.h)("div", { onClick: function (e) {
                            that.loadNextPage();
                        } },
                        (0, preact_1.h)(Template_1["default"], { template: props.template.next_page_button, data: {
                                page: this.state.page + 1
                            } })))
                    : "")
                : "",
            (subResults.length > 0)
                ? (0, preact_1.h)("div", { className: "as-result__alternativeList" }, subResults.map(function (subResult) {
                    return (0, preact_1.h)("div", { className: "as-result__alternative" },
                        (0, preact_1.h)("div", { className: "as-result__alternative_query" },
                            (0, preact_1.h)("span", { onClick: function (e) {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    that.handleAlternativeClick(subResult.metadata.query_text);
                                } },
                                (0, preact_1.h)(Template_1["default"], { template: props.template.alternative_title, data: {
                                        word: subResult.metadata.query_text_html
                                    } })),
                            (0, preact_1.h)("a", { onClick: function (e) {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    that.handleAlternativeClick(subResult.metadata.query_text);
                                } },
                                (0, preact_1.h)(Template_1["default"], { template: props.template.alternative_all_results, data: {
                                        num: subResult.getTotalHits()
                                    }, dictionary: props.dictionary }))),
                        (0, preact_1.h)("div", { className: "as-result__alternative_items" }, subResult.items.map(function (item) {
                            return (0, preact_1.h)(Item_1["default"], { data: __assign(__assign({}, reducedTemplateData), _this.hydrateItem(item)), template: props.template.item, className: "as-result__alternative_item ".concat(props.classNames.item), dictionary: _this.props.dictionary });
                        })));
                }))
                : ((items.length === 0)
                    ? (0, preact_1.h)(Template_1["default"], { template: props.template.noResults, data: {
                            query: currentQuery.getQueryText()
                        }, className: "as-result__noresults ".concat(props.classNames.noResults), dictionary: props.dictionary })
                    : "")));
    };
    /**
     * @param item
     */
    ResultComponent.prototype.hydrateItem = function (item) {
        var props = this.props;
        var environmentId = props.environmentId;
        var config = Container_1["default"].get("".concat(Constants_1.APISEARCH_CONFIG, "__").concat(environmentId));
        var apisearchUI = Container_1["default"].get("".concat(Constants_1.APISEARCH_UI, "__").concat(environmentId));
        var apisearchReference = apisearchUI.reference;
        var appId = config.app_id;
        var appUUID = item.getAppUUID();
        if (typeof appUUID === "object") {
            appId = appUUID.composedUUID();
        }
        var indexId = config.index_id;
        var indexUUID = item.getIndexUUID();
        if (typeof indexUUID === "object") {
            indexId = indexUUID.composedUUID();
        }
        var itemId = item.getUUID().composedUUID();
        var mainFields = {};
        Object.assign(mainFields, item.getMetadata(), item.getIndexedMetadata());
        var fieldsConciliation = {};
        Object.keys(props.fieldsConciliation).map(function (field, index) {
            var _a;
            fieldsConciliation[field] = (_a = mainFields[props.fieldsConciliation[field]]) !== null && _a !== void 0 ? _a : undefined;
        });
        Object.assign(mainFields, fieldsConciliation);
        item.fields = mainFields;
        var queryText = "";
        if (this.props.store.getCurrentQuery()) {
            queryText = this.props.store.getCurrentQuery().getQueryText();
        }
        return __assign(__assign({}, props.formatData(item)), {
            key: "item_" + itemId,
            uuid_composed: itemId,
            click: apisearchReference + '.click("' + appId + '", "' + indexId + '", "' + itemId + '");',
            add_to_cart: apisearchReference + '.interact("add_cart", "' + appId + '", "' + indexId + '", "' + itemId + '");',
            query_text: queryText,
            highlights_enabled: this.props.highlightsEnabled,
            striptags: function () {
                return function (val, render) { return render(val).replace(/(<([^>]+)>)/ig, ""); };
            }
        });
    };
    return ResultComponent;
}(preact_1.Component));
ResultComponent.defaultProps = {
    fields: [],
    itemsPerPage: 10,
    highlightsEnabled: false,
    promote: [],
    exclude: [],
    filter: function (query) { return null; },
    classNames: {
        container: "",
        itemsList: "",
        item: "",
        noResults: "",
        placeholder: ""
    },
    template: {
        itemsList: defaultTemplates_1.defaultItemsListTemplate,
        item: defaultTemplates_1.defaultItemTemplate,
        noResults: defaultTemplates_1.defaultNoResultsItemTemplate,
        placeholder: null,
        alternative_title: defaultTemplates_1.defaultAlternativeTitleTemplate,
        alternative_all_results: defaultTemplates_1.defaultAlternativeAllResultsTemplate,
        next_page_button: defaultTemplates_1.defaultNextPageButtonTemplate
    },
    formatData: function (data) { return data; },
    fadeInSelector: "",
    fieldsConciliation: {}
};
exports["default"] = ResultComponent;


/***/ }),

/***/ "./src/components/Result/defaultTemplates.tsx":
/*!****************************************************!*\
  !*** ./src/components/Result/defaultTemplates.tsx ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.__esModule = true;
exports.defaultNextPageButtonTemplate = exports.defaultAlternativeAllResultsTemplate = exports.defaultAlternativeTitleTemplate = exports.defaultNoResultsItemTemplate = exports.defaultItemTemplate = exports.defaultItemsListTemplate = void 0;
exports.defaultItemsListTemplate = "\n    <div>\n    {{#items}}\n        <div class=\"as-result__item\" data-id=\"{{uuid_composed}}\">\n            <strong>Score:</strong> {{score}}<br />\n            <strong>Uuid:</strong> {{uuid.type}} - {{uuid.id}}<br />\n            <strong>Title:</strong> {{{fields.title}}}<br />\n            <strong>Description:</strong> {{fields.description}}<br />\n            <strong>Link:</strong> <a href=\"{{metadata.link}}\" onclick=\"{{click}}\" target=\"_blank\">{{metadata.link}}</a>\n        </div>\n    {{/items}}\n    </div>\n    {{^items}}No results{{/items}}\n";
exports.defaultItemTemplate = "\n    <strong>Score:</strong> {{score}}<br />\n    <strong>Uuid:</strong> {{uuid.type}} - {{uuid.id}}<br />\n    <strong>Title:</strong> {{{fields.title}}}<br />\n    <strong>Description:</strong> {{fields.description}}<br />\n    <strong>Link:</strong> <a href=\"{{metadata.link}}\" onclick=\"{{click}}\" target=\"_blank\">{{metadata.link}}</a>\n";
exports.defaultNoResultsItemTemplate = "\n    No results\n";
exports.defaultAlternativeTitleTemplate = "{{{word}}}";
exports.defaultAlternativeAllResultsTemplate = "All results ({{num}})";
exports.defaultNextPageButtonTemplate = "Load page {{page}}";


/***/ }),

/***/ "./src/components/SearchInput/AutocompleteComponent.tsx":
/*!**************************************************************!*\
  !*** ./src/components/SearchInput/AutocompleteComponent.tsx ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var preact_1 = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/**
 * Autocomplete Component
 */
var AutocompleteComponent = /** @class */ (function (_super) {
    __extends(AutocompleteComponent, _super);
    /**
     * Constructor
     */
    function AutocompleteComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            autocomplete: ""
        };
        return _this;
    }
    /**
     * Component will receive props
     *
     * @param props
     */
    AutocompleteComponent.prototype.componentWillReceiveProps = function (props) {
        if (props.autocomplete !== null) {
            this.setState(function (prevState) {
                return {
                    autocomplete: props.autocomplete
                };
            });
        }
        else {
            this.setState(function (prevState) {
                return {
                    autocomplete: ""
                };
            });
        }
    };
    /**
     * Render
     *
     * @return {any}
     */
    AutocompleteComponent.prototype.render = function () {
        var autocomplete = this.state.autocomplete;
        var queryText = this.props.queryText;
        var inputClassName = this.props.inputClassName;
        var queryTextLength = queryText.length;
        var autocompleteText = autocomplete.substring(queryTextLength);
        var formattedAutocompleteText = autocompleteText === ""
            ? ""
            : queryText + autocompleteText + " ⤷";
        return ((0, preact_1.h)("input", { type: "text", className: "as-searchInput__input as-searchInput__autocomplete ".concat(inputClassName), placeholder: formattedAutocompleteText, style: "position: absolute; top: 0px; left: 0px; background-color: white;" }));
    };
    return AutocompleteComponent;
}(preact_1.Component));
exports["default"] = AutocompleteComponent;


/***/ }),

/***/ "./src/components/SearchInput/SearchInputActions.ts":
/*!**********************************************************!*\
  !*** ./src/components/SearchInput/SearchInputActions.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
exports.simpleSearchAction = exports.initialSearchSetup = void 0;
var Constants_1 = __webpack_require__(/*! ../../Constants */ "./src/Constants.ts");
var Container_1 = __webpack_require__(/*! ../../Container */ "./src/Container.ts");
var Clone_1 = __webpack_require__(/*! ../Clone */ "./src/components/Clone.ts");
/**
 * Initial Search
 *
 * @param environmentId
 * @param currentQuery
 * @param autocomplete
 * @param searchableFields
 * @param queryOperator
 */
function initialSearchSetup(environmentId, currentQuery, autocomplete, searchableFields, queryOperator) {
    var dispatcher = Container_1["default"].get("".concat(Constants_1.APISEARCH_DISPATCHER, "__").concat(environmentId));
    var clonedQuery = Clone_1["default"].object(currentQuery);
    clonedQuery.page = 1;
    clonedQuery.queryOperator = queryOperator;
    if (searchableFields.length > 0) {
        clonedQuery.searchableFields = searchableFields;
    }
    if (autocomplete) {
        clonedQuery.enableAutocomplete();
    }
    dispatcher.dispatch("UPDATE_APISEARCH_SETUP", {
        query: clonedQuery
    });
}
exports.initialSearchSetup = initialSearchSetup;
/**
 * Search action
 *
 * @param environmentId
 * @param currentQuery
 * @param repository
 * @param queryText
 * @param visibleResults
 */
function simpleSearchAction(environmentId, currentQuery, repository, queryText, visibleResults) {
    window.postMessage({
        name: "apisearch_scroll_top"
    }, "*");
    var dispatcher = Container_1["default"].get("".concat(Constants_1.APISEARCH_DISPATCHER, "__").concat(environmentId));
    var clonedQuery = Clone_1["default"].object(currentQuery);
    clonedQuery.filters._query.values = [queryText];
    clonedQuery.page = 1;
    if (!visibleResults) {
        dispatcher.dispatch("RENDER_FETCHED_DATA", {
            query: clonedQuery,
            result: null,
            visibleResults: visibleResults
        });
        return;
    }
    repository
        .query(clonedQuery)
        .then(function (result) {
        dispatcher.dispatch("RENDER_FETCHED_DATA", {
            query: clonedQuery,
            result: result,
            visibleResults: visibleResults
        });
    })["catch"](function (error) {
        // Do nothing
    });
}
exports.simpleSearchAction = simpleSearchAction;


/***/ }),

/***/ "./src/components/SearchInput/SearchInputComponent.tsx":
/*!*************************************************************!*\
  !*** ./src/components/SearchInput/SearchInputComponent.tsx ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var preact_1 = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
var SearchInputActions_1 = __webpack_require__(/*! ./SearchInputActions */ "./src/components/SearchInput/SearchInputActions.ts");
var Template_1 = __webpack_require__(/*! ../Template */ "./src/components/Template.tsx");
var AutocompleteComponent_1 = __webpack_require__(/*! ./AutocompleteComponent */ "./src/components/SearchInput/AutocompleteComponent.tsx");
var compat_1 = __webpack_require__(/*! preact/compat */ "./node_modules/preact/compat/dist/compat.module.js");
/**
 * SearchInput Component
 */
var SearchInputComponent = /** @class */ (function (_super) {
    __extends(SearchInputComponent, _super);
    /**
     * Constructor
     */
    function SearchInputComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.inputRef = (0, compat_1.useRef)(null);
        /**
         * @param search
         */
        _this.handleSearch = function (search) {
            var props = _this.props;
            var startSearchOn = props.startSearchOn;
            var finalSpace = search.charAt(search.length - 1) === " " ? " " : "";
            var targetValueNoSpaces = search.trim() + finalSpace;
            (0, SearchInputActions_1.simpleSearchAction)(props.environmentId, props.store.getCurrentQuery(), props.repository, targetValueNoSpaces === " " ? "" : targetValueNoSpaces, search.length >= startSearchOn);
        };
        /**
         * Clear search
         */
        _this.clearSearch = function () {
            var props = _this.props;
            var startSearchOn = props.startSearchOn;
            var environmentId = props.environmentId;
            var currentQuery = props.store.getCurrentQuery();
            var repository = props.repository;
            var visibleResults = 0 === startSearchOn;
            (0, SearchInputActions_1.simpleSearchAction)(environmentId, currentQuery, repository, "", visibleResults);
        };
        if (props.autocomplete) {
            _this.state = { queryText: "" };
        }
        var that = _this;
        window.addEventListener("beforeunload", function () {
            that.dispatchQueryStringEvent(props, 0);
        });
        return _this;
    }
    /**
     * Component will receive props
     *
     * @param props
     */
    SearchInputComponent.prototype.componentWillReceiveProps = function (props) {
        this.setState({
            queryText: props.store.getCurrentQuery().getQueryText()
        });
    };
    /**
     * Key down
     */
    SearchInputComponent.prototype.handleKeyDown = function (e) {
        switch (e.key) {
            case "ArrowRight":
            case "Tab":
            case "Enter":
                this.replaceWithAutocomplete(e);
                return;
        }
        switch (e.keyCode) {
            case 39:
            case 9:
            case 13:
                this.replaceWithAutocomplete(e);
                return;
        }
    };
    SearchInputComponent.prototype.replaceWithAutocomplete = function (e) {
        var props = this.props;
        var autocomplete = this.props.store.getCurrentResult().getAutocomplete();
        if (autocomplete !== null && autocomplete !== "") {
            (0, SearchInputActions_1.simpleSearchAction)(props.environmentId, props.store.getCurrentQuery(), props.repository, this.props.store.getCurrentResult().getAutocomplete(), true);
            e.preventDefault();
            return;
        }
    };
    /**
     * @param e
     */
    SearchInputComponent.prototype.doNothing = function (e) { };
    /**
     * @param config
     */
    SearchInputComponent.prototype.withConfig = function (config) {
    };
    /**
     * @param props
     * @param timeout
     */
    SearchInputComponent.prototype.dispatchQueryStringEvent = function (props, timeout) {
        var currentQuery = props.store.getCurrentQuery();
        var currentQueryText = currentQuery.getQueryText();
        if (this.queryTextEvent) {
            this.lastQueryTextStringDispatched = null;
            clearTimeout(this.queryTextEvent);
        }
        if (this.lastQueryTextStringDispatched === currentQueryText) {
            return;
        }
        this.lastQueryTextStringDispatched = currentQueryText;
        if (currentQueryText !== "") {
            var that_1 = this;
            this.lastQueryTextStringDispatched = currentQueryText;
            this.queryTextEvent = setTimeout(function () {
                that_1.queryTextEvent = null;
                window.postMessage({
                    name: "apisearch_search",
                    query_text: currentQueryText,
                    query: currentQuery.toArray(),
                    site: props.store.getSite(),
                    device: props.store.getDevice()
                }, "*");
            }, timeout);
        }
    };
    /**
     * Search
     *
     * @return {any}
     */
    SearchInputComponent.prototype.render = function () {
        var _this = this;
        var props = this.props;
        var placeholder = props.placeholder;
        var autofocus = props.autofocus;
        var clearSearch = props.clearSearch;
        var withContainer = props.withContainer;
        var containerClassName = props.classNames.container;
        var inputClassName = props.classNames.input;
        var clearSearchClassName = props.classNames.clearSearch;
        var clearSearchTemplate = props.template.clearSearch;
        var currentQuery = props.store.getCurrentQuery();
        var currentQueryText = currentQuery.getQueryText();
        var htmlNodeInheritProps = props.htmlNodeInheritProps;
        var showAutocomplete = currentQuery.areAutocompleteEnabled();
        var autocomplete = props.store.getCurrentResult()
            ? props.store.getCurrentResult().getAutocomplete()
            : null;
        var keyDownCallback = showAutocomplete
            ? function (e) { return _this.handleKeyDown(e); }
            : function (e) { return _this.doNothing(e); };
        var keyDownAction = showAutocomplete
            ? function (e) { return _this.replaceWithAutocomplete(e); }
            : function (e) { return _this.doNothing(e); };
        var style = showAutocomplete
            ? "position: relative; top: 0px; left: 0px; background-color: transparent; border-color: transparent;"
            : "";
        var autocompletableClass = showAutocomplete
            ? "autocompletable"
            : "";
        this.dispatchQueryStringEvent(props, 2000);
        var searchInput = ((0, preact_1.h)("input", __assign({ type: "text", className: "as-searchInput__input ".concat(inputClassName, " ").concat(autocompletableClass), placeholder: placeholder, autofocus: autofocus }, htmlNodeInheritProps, { onInput: function (event) { return _this.handleSearch(event.target.value); }, value: currentQueryText, style: style, onKeyDown: keyDownCallback, onTouchStart: keyDownAction, ref: this.inputRef })));
        if (showAutocomplete) {
            searchInput = ((0, preact_1.h)("div", { style: "position: relative" },
                (0, preact_1.h)(AutocompleteComponent_1["default"], { autocomplete: autocomplete, queryText: currentQueryText, inputClassName: inputClassName }),
                searchInput));
        }
        if (withContainer) {
            searchInput = ((0, preact_1.h)("div", { className: "as-searchInput ".concat(containerClassName) },
                searchInput,
                (clearSearch && currentQueryText && currentQueryText.length !== 0)
                    ? ((0, preact_1.h)("div", { className: "as-searchInput__clearSearch ".concat(clearSearchClassName), onClick: this.clearSearch },
                        (0, preact_1.h)(Template_1["default"], { template: clearSearchTemplate, dictionary: props.dictionary }))) : null));
        }
        return searchInput;
    };
    return SearchInputComponent;
}(preact_1.Component));
SearchInputComponent.defaultProps = {
    placeholder: "",
    autofocus: false,
    autocomplete: false,
    startSearchOn: 0,
    clearSearch: true,
    withContainer: true,
    searchableFields: [],
    speechRecognition: false,
    classNames: {
        container: "",
        input: "",
        clearSearch: ""
    },
    template: {
        clearSearch: "x",
        speechRecognition: "{S}"
    }
};
exports["default"] = SearchInputComponent;


/***/ }),

/***/ "./src/components/Snapshot/SnapshotComponent.tsx":
/*!*******************************************************!*\
  !*** ./src/components/Snapshot/SnapshotComponent.tsx ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var preact_1 = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
/**
 * SnapshotComponent
 */
var SnapshotComponent = /** @class */ (function (_super) {
    __extends(SnapshotComponent, _super);
    function SnapshotComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Component receive props
     *
     * @param props
     */
    SnapshotComponent.prototype.componentWillReceiveProps = function (props) {
        var query = props.store.getCurrentQuery();
        this.setState(function (prevState) {
            return { query: query };
        });
    };
    /**
     * Render
     *
     * @return {}
     */
    SnapshotComponent.prototype.render = function () {
        var queryAsJson = this.state.query == undefined
            ? ''
            : JSON.stringify(this.state.query.toArray());
        return ((0, preact_1.h)("div", null, queryAsJson));
    };
    return SnapshotComponent;
}(preact_1.Component));
exports["default"] = SnapshotComponent;


/***/ }),

/***/ "./src/components/SortBy/SortByActions.ts":
/*!************************************************!*\
  !*** ./src/components/SortBy/SortByActions.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
exports.onChangeSearchAction = exports.initialSortBySetup = void 0;
var Constants_1 = __webpack_require__(/*! ../../Constants */ "./src/Constants.ts");
var Container_1 = __webpack_require__(/*! ../../Container */ "./src/Container.ts");
var Clone_1 = __webpack_require__(/*! ../Clone */ "./src/components/Clone.ts");
var SortByHelper_1 = __webpack_require__(/*! ./SortByHelper */ "./src/components/SortBy/SortByHelper.ts");
/**
 * Initial sortBy
 *
 * @param environmentId
 * @param currentQuery
 * @param initialOption
 */
function initialSortBySetup(environmentId, currentQuery, initialOption) {
    var dispatcher = Container_1["default"].get("".concat(Constants_1.APISEARCH_DISPATCHER, "__").concat(environmentId));
    var clonedQuery = Clone_1["default"].object(currentQuery);
    (0, SortByHelper_1.applySortByToQuery)(clonedQuery, initialOption);
    clonedQuery.page = 1;
    dispatcher.dispatch("UPDATE_APISEARCH_SETUP", {
        query: clonedQuery
    });
}
exports.initialSortBySetup = initialSortBySetup;
/**
 * ON change search action
 *
 * @param environmentId
 * @param currentQuery
 * @param repository
 * @param selectedOption
 */
function onChangeSearchAction(environmentId, currentQuery, repository, selectedOption) {
    window.postMessage({
        name: "apisearch_scroll_top"
    }, "*");
    var clonedQuery = Clone_1["default"].object(currentQuery);
    (0, SortByHelper_1.applySortByToQuery)(clonedQuery, selectedOption);
    clonedQuery.page = 1;
    var dispatcher = Container_1["default"].get("".concat(Constants_1.APISEARCH_DISPATCHER, "__").concat(environmentId));
    repository
        .query(clonedQuery)
        .then(function (result) {
        dispatcher.dispatch("RENDER_FETCHED_DATA", {
            query: clonedQuery,
            result: result
        });
    })["catch"](function (error) {
        // Do nothing
    });
}
exports.onChangeSearchAction = onChangeSearchAction;


/***/ }),

/***/ "./src/components/SortBy/SortByComponent.tsx":
/*!***************************************************!*\
  !*** ./src/components/SortBy/SortByComponent.tsx ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var preact_1 = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
var SortByActions_1 = __webpack_require__(/*! ./SortByActions */ "./src/components/SortBy/SortByActions.ts");
/**
 * SortBy Filter Component
 */
var SortByComponent = /** @class */ (function (_super) {
    __extends(SortByComponent, _super);
    function SortByComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Handle change
         *
         * @param e
         */
        _this.handleChange = function (e) {
            var props = _this.props;
            var environmentId = props.environmentId;
            var currentQuery = props.store.getCurrentQuery();
            var repository = props.repository;
            var currentOption = e.target.value;
            _this.setState({
                value: currentOption
            });
            /**
             * Dispatch action
             */
            (0, SortByActions_1.onChangeSearchAction)(environmentId, currentQuery, repository, currentOption);
        };
        return _this;
    }
    /**
     * Components will mount
     */
    SortByComponent.prototype.componentWillMount = function () {
        var props = this.props;
        var environmentId = props.environmentId;
        var options = props.options;
        var currentQuery = props.store.getCurrentQuery();
        var currentOption = options[0].value;
        this.setState({
            value: currentOption,
            visible: false
        });
        /**
         * Dispatch action
         */
        (0, SortByActions_1.initialSortBySetup)(environmentId, currentQuery, currentOption);
    };
    /**
     * Component will receive props
     *
     * @param props
     */
    SortByComponent.prototype.componentWillReceiveProps = function (props) {
        var nextFirstSortAsString = props.store.getCurrentQuery().getSortBy().getFirstSortAsString();
        var nextVisible = (props.store.getCurrentResult() != null)
            ? (props.store.getCurrentResult().getTotalHits() > 0)
            : false;
        if (this.state.value !== nextFirstSortAsString ||
            this.state.visible !== nextVisible) {
            this.setState(function (prevState) {
                return {
                    value: nextFirstSortAsString,
                    visible: nextVisible
                };
            });
        }
    };
    /**
     * Render
     *
     * @return {any}
     */
    SortByComponent.prototype.render = function (props, state) {
        var containerClassName = props.classNames.container;
        var selectClassName = props.classNames.select;
        if (!state.visible) {
            return;
        }
        var options = props.options;
        var coordinate = props.store.getCurrentQuery().toArray().coordinate;
        if (!coordinate) {
            options = options.filter(function (o) {
                return o.value !== "distance";
            });
        }
        return ((0, preact_1.h)("div", { className: "as-sortBy ".concat(containerClassName) },
            (0, preact_1.h)("select", { className: "as-sortBy__selector ".concat(selectClassName), onChange: this.handleChange, value: state.value }, options.map(function (option) { return ((0, preact_1.h)("option", { value: option.value }, option.name)); }))));
    };
    return SortByComponent;
}(preact_1.Component));
SortByComponent.defaultProps = {
    classNames: {
        container: "",
        select: ""
    }
};
exports["default"] = SortByComponent;


/***/ }),

/***/ "./src/components/SortBy/SortByHelper.ts":
/*!***********************************************!*\
  !*** ./src/components/SortBy/SortByHelper.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
exports.applySortByToQuery = void 0;
/**
 * SortBy actions
 */
var apisearch_1 = __webpack_require__(/*! apisearch */ "./node_modules/apisearch/lib/index.js");
/**
 * Apply sort by to query
 *
 * @param query Query
 * @param selectedOption string
 */
function applySortByToQuery(query, selectedOption) {
    var sortByData = splitQueryValue(selectedOption);
    var sortBy = apisearch_1["default"].createEmptySortBy();
    if (sortByData.field == 'distance') {
        sortBy.byValue({
            type: apisearch_1.SORT_BY_TYPE_DISTANCE,
            unit: sortByData.sort
                ? sortByData.sort
                : 'km'
        });
    }
    else if (sortByData.field == 'score') {
        sortBy.byValue(apisearch_1.SORT_BY_SCORE);
    }
    else {
        sortBy.byFieldValue(sortByData.field, sortByData.sort);
    }
    query.sortBy(sortBy);
    return query;
}
exports.applySortByToQuery = applySortByToQuery;
/**
 * Split sort by string representation
 *
 * @param string
 *
 * @return {{field: string, sort: string}}
 */
function splitQueryValue(string) {
    var queryValue = string.split(":");
    return {
        field: queryValue[0],
        sort: queryValue[1]
    };
}


/***/ }),

/***/ "./src/components/Suggestions/SuggestionsFilterActions.ts":
/*!****************************************************************!*\
  !*** ./src/components/Suggestions/SuggestionsFilterActions.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
exports.enableSuggestions = void 0;
var Constants_1 = __webpack_require__(/*! ../../Constants */ "./src/Constants.ts");
var Container_1 = __webpack_require__(/*! ../../Container */ "./src/Container.ts");
var Clone_1 = __webpack_require__(/*! ../Clone */ "./src/components/Clone.ts");
/**
 * @param environmentId
 * @param currentQuery
 * @param numberOfSuggestions
 */
function enableSuggestions(environmentId, currentQuery, numberOfSuggestions) {
    var clonedQuery = Clone_1["default"].object(currentQuery);
    if (numberOfSuggestions > 0) {
        clonedQuery.setNumberOfSuggestions(numberOfSuggestions);
    }
    var dispatcher = Container_1["default"].get("".concat(Constants_1.APISEARCH_DISPATCHER, "__").concat(environmentId));
    dispatcher.dispatch("UPDATE_APISEARCH_SETUP", {
        query: clonedQuery
    });
}
exports.enableSuggestions = enableSuggestions;


/***/ }),

/***/ "./src/components/Suggestions/SuggestionsFilterComponent.tsx":
/*!*******************************************************************!*\
  !*** ./src/components/Suggestions/SuggestionsFilterComponent.tsx ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var preact_1 = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
var Highlight_1 = __webpack_require__(/*! ../../Highlight */ "./src/Highlight.ts");
var Common_1 = __webpack_require__(/*! ../Common */ "./src/components/Common.ts");
var defaultTemplates_1 = __webpack_require__(/*! ./defaultTemplates */ "./src/components/Suggestions/defaultTemplates.tsx");
var SuggestionsFilterActions_1 = __webpack_require__(/*! ./SuggestionsFilterActions */ "./src/components/Suggestions/SuggestionsFilterActions.ts");
var Template_1 = __webpack_require__(/*! ../Template */ "./src/components/Template.tsx");
/**
 * Suggestion Filter Component
 */
var SuggestionsFilterComponent = /** @class */ (function (_super) {
    __extends(SuggestionsFilterComponent, _super);
    function SuggestionsFilterComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * @param word
         */
        _this.handleClick = function (word) {
            var props = _this.props;
            if (typeof word === "string") {
                word = word
                    .replace(/<em>/g, "")
                    .replace(/<\/em>/g, "");
            }
            /**
             * Dispatch action
             */
            (0, Common_1.onWordClickAction)(props.environmentId, props.store.getCurrentQuery(), props.repository, word);
        };
        return _this;
    }
    SuggestionsFilterComponent.prototype.componentDidMount = function () {
        this.highlight();
    };
    SuggestionsFilterComponent.prototype.componentDidUpdate = function () {
        this.highlight();
    };
    SuggestionsFilterComponent.prototype.highlight = function () {
        var queryText = this.props.store.getCurrentQuery().getQueryText();
        if (queryText !== "") {
            var list = document.getElementsByClassName("as-suggestions");
            for (var i = 0; i < list.length; i++) {
                (0, Highlight_1.highlightElement)(list[i], queryText);
            }
        }
    };
    /**
     * Component will mount
     */
    SuggestionsFilterComponent.prototype.componentWillMount = function () {
        this.setState(function (prevState) {
            return {
                words: []
            };
        });
        var props = this.props;
        var environmentId = props.environmentId;
        var currentQuery = props.store.getCurrentQuery();
        /**
         * Dispatch action
         */
        (0, SuggestionsFilterActions_1.enableSuggestions)(environmentId, currentQuery, props.numberOfSuggestions);
    };
    /**
     * Component will receive props
     *
     * @param props
     */
    SuggestionsFilterComponent.prototype.componentWillReceiveProps = function (props) {
        this.setState(function (prevState) {
            return {
                words: props
                    .store
                    .getCurrentResult()
                    .getSuggestions()
            };
        });
    };
    /**
     * Render
     *
     * @return {any}
     */
    SuggestionsFilterComponent.prototype.render = function (props, state) {
        var _this = this;
        var containerClassName = props.classNames.container;
        var topClassName = props.classNames.top;
        var itemsListClassName = props.classNames.itemsList;
        var itemClassName = props.classNames.item;
        var noSuggestionsClassName = state.words.length > 0
            ? ""
            : "suggestions-empty";
        var topTemplate = props.template.top;
        var itemTemplate = props.template.item;
        var that = this;
        return ((0, preact_1.h)("div", { className: "as-suggestions ".concat(containerClassName, " ").concat(noSuggestionsClassName) },
            (0, preact_1.h)(Template_1["default"], { template: topTemplate, className: "as-suggestions__top ".concat(topClassName), dictionary: this.props.dictionary }),
            (0, preact_1.h)("div", { className: "as-suggestions__itemsList ".concat(itemsListClassName) }, state.words.map(function (word) {
                var templateData = {
                    word: word
                };
                return ((0, preact_1.h)("div", { className: "as-suggestions__item ".concat(itemClassName), onClick: function (e) {
                        e.stopPropagation();
                        e.preventDefault();
                        that.handleClick(word);
                    } },
                    (0, preact_1.h)(Template_1["default"], { template: itemTemplate, data: templateData, dictionary: _this.props.dictionary })));
            }))));
    };
    return SuggestionsFilterComponent;
}(preact_1.Component));
SuggestionsFilterComponent.defaultProps = {
    classNames: {
        container: "",
        top: "",
        itemsList: "",
        item: ""
    },
    template: {
        top: null,
        item: defaultTemplates_1.defaultItemTemplate
    }
};
exports["default"] = SuggestionsFilterComponent;


/***/ }),

/***/ "./src/components/Suggestions/defaultTemplates.tsx":
/*!*********************************************************!*\
  !*** ./src/components/Suggestions/defaultTemplates.tsx ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.__esModule = true;
exports.defaultItemTemplate = void 0;
exports.defaultItemTemplate = "\n    <span class=\"highlight\">{{word}}</span>\n";


/***/ }),

/***/ "./src/components/Template.tsx":
/*!*************************************!*\
  !*** ./src/components/Template.tsx ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var preact_1 = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
var Mustache = __webpack_require__(/*! mustache */ "./node_modules/mustache/mustache.js");
var Translate_1 = __webpack_require__(/*! ./Translate */ "./src/components/Translate.tsx");
/**
 * Template
 */
var Template = /** @class */ (function (_super) {
    __extends(Template, _super);
    function Template() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Render template
         *
         * @param template
         * @param result
         * @param dictionary
         *
         * @return {any}
         */
        _this.renderTemplate = function (template, result, dictionary) {
            var trans = function () {
                return function (text, render) {
                    return render(Translate_1["default"].trans(text, dictionary));
                };
            };
            var output = Mustache.render(template, __assign(__assign({}, result), {
                "trans": trans
            }));
            return {
                __html: output
            };
        };
        return _this;
    }
    /**
     * Render
     *
     * @return {any}
     */
    Template.prototype.render = function () {
        var _a, _b;
        var props = this.props;
        var template = props.template;
        var data = props.data;
        var className = props.className;
        var id = (_a = props.id) !== null && _a !== void 0 ? _a : "";
        var dictionary = (_b = props.dictionary) !== null && _b !== void 0 ? _b : {};
        return (template)
            ? (0, preact_1.h)("div", { id: id, className: className, dangerouslySetInnerHTML: this.renderTemplate(template, data, dictionary) })
            : null;
    };
    return Template;
}(preact_1.Component));
exports["default"] = Template;


/***/ }),

/***/ "./src/components/Translate.tsx":
/*!**************************************!*\
  !*** ./src/components/Translate.tsx ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.__esModule = true;
var Translate = /** @class */ (function () {
    function Translate() {
    }
    Translate.trans = function (text, dictionary) {
        var _a, _b, _c;
        var parsed = [];
        try {
            parsed = JSON.parse(text);
        }
        catch (_d) {
            return (_a = dictionary[text]) !== null && _a !== void 0 ? _a : text;
        }
        var parsedText = (_b = parsed[0]) !== null && _b !== void 0 ? _b : text;
        parsedText = (_c = dictionary[parsedText]) !== null && _c !== void 0 ? _c : parsedText;
        for (var i = 1; i <= parsed.length; i++) {
            parsedText = parsedText.replace("$" + i, parsed[i]);
        }
        return parsedText;
    };
    return Translate;
}());
exports["default"] = Translate;


/***/ }),

/***/ "./src/widgets/CheckboxFilter.tsx":
/*!****************************************!*\
  !*** ./src/widgets/CheckboxFilter.tsx ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var preact_1 = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
var CheckboxFilterComponent_1 = __webpack_require__(/*! ../components/CheckboxFilter/CheckboxFilterComponent */ "./src/components/CheckboxFilter/CheckboxFilterComponent.tsx");
var Widget_1 = __webpack_require__(/*! ./Widget */ "./src/widgets/Widget.ts");
/**
 * CheckboxFilter
 */
var CheckboxFilter = /** @class */ (function (_super) {
    __extends(CheckboxFilter, _super);
    function CheckboxFilter(_a) {
        var target = _a.target, filterName = _a.filterName, filterField = _a.filterField, label = _a.label, filterValue = _a.filterValue, classNames = _a.classNames, template = _a.template;
        var _this = _super.call(this) || this;
        _this.target = target;
        _this.component = (0, preact_1.h)(CheckboxFilterComponent_1["default"], { target: target, filterName: filterName, filterField: filterField, label: label, filterValue: filterValue, classNames: __assign(__assign({}, CheckboxFilterComponent_1["default"].defaultProps.classNames), classNames), template: __assign(__assign({}, CheckboxFilterComponent_1["default"].defaultProps.template), template) });
        return _this;
    }
    /**
     * @param environmentId
     * @param store
     * @param repository
     * @param dictionary
     */
    CheckboxFilter.prototype.render = function (environmentId, store, repository, dictionary) {
        this.component.props = __assign(__assign({}, this.component.props), { environmentId: environmentId, repository: repository, store: store, dictionary: dictionary });
        (0, preact_1.render)(this.component, document.querySelector(this.target));
    };
    /**
     * @param query
     * @param object
     */
    CheckboxFilter.prototype.toUrlObject = function (query, object) {
        var filterName = this.component.props.filterName;
        var aggregation = query.aggregations[filterName];
        var filterField = this.component.props.filterField;
        if (aggregation !== undefined &&
            query.filters !== undefined &&
            query.filters[filterName] !== undefined) {
            var filterValues = query.filters[filterName].values;
            if (filterValues.length > 0) {
                object[filterField] = filterValues;
            }
        }
    };
    /**
     * @param object
     * @param query
     */
    CheckboxFilter.prototype.fromUrlObject = function (object, query) {
        var _a;
        var filterName = this.component.props.filterName;
        var aggregation = query.aggregations[filterName];
        var filterField = this.component.props.filterField;
        var fieldValues = (_a = object[filterField]) !== null && _a !== void 0 ? _a : object[filterName];
        if (aggregation !== undefined &&
            fieldValues !== undefined &&
            Array.isArray(fieldValues) &&
            fieldValues.length > 0) {
            if (query.filters === undefined) {
                query.filters = {};
            }
            query.filters[filterName] = {
                field: "indexed_metadata." + this.component.props.filterField,
                values: fieldValues
            };
        }
    };
    /**
     * @param query
     */
    CheckboxFilter.prototype.reset = function (query) {
        var filterName = this.component.props.filterName;
        if (query.filters !== undefined &&
            typeof query.filters === "object" &&
            query.filters[filterName] !== undefined) {
            delete query.filters[filterName];
        }
    };
    return CheckboxFilter;
}(Widget_1["default"]));
/**
 * CheckboxFilter widget
 *
 * @param settings
 */
exports["default"] = (function (settings) { return new CheckboxFilter(settings); });


/***/ }),

/***/ "./src/widgets/ClearFilters.tsx":
/*!**************************************!*\
  !*** ./src/widgets/ClearFilters.tsx ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var preact_1 = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
var ClearFiltersComponent_1 = __webpack_require__(/*! ../components/ClearFilters/ClearFiltersComponent */ "./src/components/ClearFilters/ClearFiltersComponent.tsx");
var Widget_1 = __webpack_require__(/*! ./Widget */ "./src/widgets/Widget.ts");
/**
 * Clear Filters
 */
var ClearFilters = /** @class */ (function (_super) {
    __extends(ClearFilters, _super);
    /**
     * @param target
     * @param classNames
     * @param template
     * @param showIndividualFilterClear
     * @param showGlobalFilterClear
     * @param showIndividualFilterValueClear
     */
    function ClearFilters(_a) {
        var target = _a.target, classNames = _a.classNames, template = _a.template, showIndividualFilterClear = _a.showIndividualFilterClear, showGlobalFilterClear = _a.showGlobalFilterClear, showIndividualFilterValueClear = _a.showIndividualFilterValueClear;
        var _this = _super.call(this) || this;
        _this.target = target;
        _this.component = (0, preact_1.h)(ClearFiltersComponent_1["default"], { target: target, classNames: __assign(__assign({}, ClearFiltersComponent_1["default"].defaultProps.classNames), classNames), showIndividualFilterClear: showIndividualFilterClear, showGlobalFilterClear: showGlobalFilterClear, showIndividualFilterValueClear: showIndividualFilterValueClear, template: __assign(__assign({}, ClearFiltersComponent_1["default"].defaultProps.template), template) });
        return _this;
    }
    /**
     * @param environmentId
     * @param store
     * @param repository
     * @param dictionary
     */
    ClearFilters.prototype.render = function (environmentId, store, repository, dictionary) {
        this.component.props = __assign(__assign({}, this.component.props), { dictionary: dictionary, environmentId: environmentId, repository: repository, store: store });
        (0, preact_1.render)(this.component, document.querySelector(this.target));
    };
    return ClearFilters;
}(Widget_1["default"]));
/**
 * Clear filters widget
 *
 * @param settings
 */
exports["default"] = (function (settings) { return new ClearFilters(settings); });


/***/ }),

/***/ "./src/widgets/Information.tsx":
/*!*************************************!*\
  !*** ./src/widgets/Information.tsx ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var preact_1 = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
var InformationComponent_1 = __webpack_require__(/*! ../components/Information/InformationComponent */ "./src/components/Information/InformationComponent.tsx");
var Widget_1 = __webpack_require__(/*! ./Widget */ "./src/widgets/Widget.ts");
/**
 * Information
 */
var Information = /** @class */ (function (_super) {
    __extends(Information, _super);
    /**
     * Constructor
     *
     * @param target
     * @param classNames
     * @param template
     * @param formatData
     */
    function Information(_a) {
        var target = _a.target, classNames = _a.classNames, template = _a.template, formatData = _a.formatData;
        var _this = _super.call(this) || this;
        _this.target = target;
        _this.component = (0, preact_1.h)(InformationComponent_1["default"], { target: target, classNames: __assign(__assign({}, InformationComponent_1["default"].defaultProps.classNames), classNames), template: __assign(__assign({}, InformationComponent_1["default"].defaultProps.template), template), formatData: formatData });
        return _this;
    }
    /**
     * @param environmentId
     * @param store
     * @param repository
     * @param dictionary
     */
    Information.prototype.render = function (environmentId, store, repository, dictionary) {
        this.component.props = __assign(__assign({}, this.component.props), { environmentId: environmentId, repository: repository, store: store, dictionary: dictionary });
        var targetNode = document.querySelector(this.target);
        (0, preact_1.render)(this.component, targetNode);
    };
    return Information;
}(Widget_1["default"]));
/**
 * Information widget
 *
 * @param settings
 */
exports["default"] = (function (settings) { return new Information(settings); });


/***/ }),

/***/ "./src/widgets/MultipleFilter.tsx":
/*!****************************************!*\
  !*** ./src/widgets/MultipleFilter.tsx ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var apisearch_1 = __webpack_require__(/*! apisearch */ "./node_modules/apisearch/lib/index.js");
var preact_1 = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
var Helpers_1 = __webpack_require__(/*! ../components/MultipleFilter/Helpers */ "./src/components/MultipleFilter/Helpers.ts");
var MultipleFilterActions_1 = __webpack_require__(/*! ../components/MultipleFilter/MultipleFilterActions */ "./src/components/MultipleFilter/MultipleFilterActions.ts");
var MultipleFilterComponent_1 = __webpack_require__(/*! ../components/MultipleFilter/MultipleFilterComponent */ "./src/components/MultipleFilter/MultipleFilterComponent.tsx");
var Widget_1 = __webpack_require__(/*! ./Widget */ "./src/widgets/Widget.ts");
/**
 * Multiple Filter
 */
var MultipleFilter = /** @class */ (function (_super) {
    __extends(MultipleFilter, _super);
    /**
     * @param target
     * @param filterName
     * @param filterField
     * @param aggregationField
     * @param applicationType
     * @param fetchLimit
     * @param viewLimit
     * @param sortBy
     * @param ranges
     * @param labels
     * @param classNames
     * @param template
     * @param formatData
     * @param activeFirst
     * @param promoted
     */
    function MultipleFilter(_a) {
        var target = _a.target, filterName = _a.filterName, filterField = _a.filterField, aggregationField = _a.aggregationField, applicationType = _a.applicationType, fetchLimit = _a.fetchLimit, viewLimit = _a.viewLimit, sortBy = _a.sortBy, ranges = _a.ranges, labels = _a.labels, classNames = _a.classNames, template = _a.template, formatData = _a.formatData, activeFirst = _a.activeFirst, promoted = _a.promoted;
        var _this = _super.call(this) || this;
        _this.target = target;
        _this.filterField = filterField;
        _this.aggregationField = aggregationField !== null && aggregationField !== void 0 ? aggregationField : filterField;
        _this.component = (0, preact_1.h)(MultipleFilterComponent_1["default"], { target: target, filterName: filterName, filterField: _this.filterField, aggregationField: _this.aggregationField, applicationType: applicationType, fetchLimit: fetchLimit, viewLimit: viewLimit, sortBy: sortBy, ranges: ranges, labels: labels, classNames: __assign(__assign({}, MultipleFilterComponent_1["default"].defaultProps.classNames), classNames), template: __assign(__assign({}, MultipleFilterComponent_1["default"].defaultProps.template), template), formatData: formatData, activeFirst: activeFirst, promoted: promoted });
        return _this;
    }
    /**
     * @param environmentId
     * @param store
     * @param repository
     * @param dictionary
     */
    MultipleFilter.prototype.render = function (environmentId, store, repository, dictionary) {
        this.component.props = __assign(__assign({}, this.component.props), { dictionary: dictionary, environmentId: environmentId, repository: repository, store: store });
        (0, preact_1.render)(this.component, document.querySelector(this.target));
    };
    /**
     * @param query
     * @param object
     */
    MultipleFilter.prototype.toUrlObject = function (query, object) {
        var filterName = this.component.props.filterName;
        var aggregation = query.aggregations[filterName];
        var filterField = this.component.props.filterField;
        if (aggregation !== undefined &&
            query.filters !== undefined &&
            query.filters[filterName] !== undefined) {
            var filter = query.filters[filterName];
            var filterValues = filter.values;
            if (filterValues.length > 0) {
                if (filter.application_type === 6) {
                    var levelsValues = (0, Helpers_1.getShadowFilterValuesFromQuery)(query, filterName, false);
                    object[filterField] = {
                        l: levelsValues,
                        v: filter.values
                    };
                }
                else {
                    object[filterField] = filterValues;
                }
            }
        }
    };
    /**
     * @param object
     * @param query
     */
    MultipleFilter.prototype.fromUrlObject = function (object, query) {
        var _a;
        var filterName = this.component.props.filterName;
        var aggregation = query.aggregations[filterName];
        var filterField = this.component.props.filterField;
        var fieldValues = (_a = object[filterField]) !== null && _a !== void 0 ? _a : object[filterName];
        var rangesValues = Object.keys(this.component.props.ranges);
        var filterType = (rangesValues.length > 0) ? "range" : "field";
        if (aggregation !== undefined &&
            fieldValues !== undefined &&
            (Array.isArray(fieldValues) && (fieldValues.length > 0) ||
                (typeof fieldValues === "object") && (Object.keys(fieldValues).length > 0))) {
            if (query.filters === undefined) {
                query.filters = {};
            }
            var applicationType = this.component.props.applicationType;
            var fieldName = "indexed_metadata." + this.component.props.filterField;
            if (applicationType === 6) {
                var originalFieldValues = fieldValues;
                fieldValues = originalFieldValues.v;
                var leveledValues = originalFieldValues.l;
                for (var it_1 = 0; it_1 < leveledValues.length; it_1++) {
                    var level = it_1 + 1;
                    var fieldNameWithoutPrefix = fieldName.substr(17);
                    var leveledFilterName = fieldNameWithoutPrefix + "_level_" + level;
                    var leveledFieldName = "indexed_metadata." + leveledFilterName;
                    query.filters[leveledFilterName] = {
                        application_type: applicationType,
                        field: leveledFieldName,
                        filter_type: apisearch_1.FILTER_TYPE_FIELD,
                        values: [leveledValues[it_1]]
                    };
                }
                fieldName = fieldName + "_level_" + (leveledValues.length + 1);
            }
            query.filters[filterName] = {
                application_type: applicationType,
                field: fieldName,
                filter_type: filterType,
                values: fieldValues
            };
        }
    };
    /**
     * @param query
     */
    MultipleFilter.prototype.reset = function (query) {
        var filterName = this.component.props.filterName;
        if (query.filters !== undefined &&
            typeof query.filters === "object" &&
            query.filters[filterName] !== undefined) {
            delete query.filters[filterName];
        }
    };
    /**
     * @param environmentId
     * @param query
     */
    MultipleFilter.prototype.normalizeQuery = function (environmentId, query) {
        var filterName = this.component.props.filterName;
        if ((0, Helpers_1.isFilterAvailable)(query, filterName, 6)) {
            (0, MultipleFilterActions_1.modifyQueryAggregationWithProperLevelValue)(environmentId, query, filterName, this.filterField, this.aggregationField);
        }
    };
    return MultipleFilter;
}(Widget_1["default"]));
/**
 * Multiple filter widget
 *
 * @param settings
 */
exports["default"] = (function (settings) { return new MultipleFilter(settings); });


/***/ }),

/***/ "./src/widgets/Pagination.tsx":
/*!************************************!*\
  !*** ./src/widgets/Pagination.tsx ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var preact_1 = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
var PaginationComponent_1 = __webpack_require__(/*! ../components/Pagination/PaginationComponent */ "./src/components/Pagination/PaginationComponent.tsx");
var Widget_1 = __webpack_require__(/*! ./Widget */ "./src/widgets/Widget.ts");
/**
 * Pagination
 */
var Pagination = /** @class */ (function (_super) {
    __extends(Pagination, _super);
    /**
     * Constructor
     *
     * @param target
     * @param padding
     * @param goFirstLast
     * @param classNames
     * @param template
     */
    function Pagination(_a) {
        var target = _a.target, padding = _a.padding, goFirstLast = _a.goFirstLast, classNames = _a.classNames, template = _a.template;
        var _this = _super.call(this) || this;
        _this.target = target;
        _this.component = (0, preact_1.h)(PaginationComponent_1["default"], { target: target, padding: padding, goFirstLast: goFirstLast, classNames: __assign(__assign({}, PaginationComponent_1["default"].defaultProps.classNames), classNames), template: __assign(__assign({}, PaginationComponent_1["default"].defaultProps.template), template) });
        return _this;
    }
    /**
     * @param environmentId
     * @param store
     * @param repository
     * @param dictionary
     */
    Pagination.prototype.render = function (environmentId, store, repository, dictionary) {
        this.component.props = __assign(__assign({}, this.component.props), { environmentId: environmentId, repository: repository, store: store, dictionary: dictionary });
        var targetNode = document.querySelector(this.target);
        (0, preact_1.render)(this.component, targetNode);
    };
    /**
     * @param query
     */
    Pagination.prototype.reset = function (query) {
        delete query.page;
    };
    return Pagination;
}(Widget_1["default"]));
/**
 * Pagination widget
 *
 * @param settings
 */
exports["default"] = (function (settings) { return new Pagination(settings); });


/***/ }),

/***/ "./src/widgets/RangeFilter.tsx":
/*!*************************************!*\
  !*** ./src/widgets/RangeFilter.tsx ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var preact_1 = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
var RangeFilterComponent_1 = __webpack_require__(/*! ../components/RangeFilter/RangeFilterComponent */ "./src/components/RangeFilter/RangeFilterComponent.tsx");
var Widget_1 = __webpack_require__(/*! ./Widget */ "./src/widgets/Widget.ts");
/**
 * RangeFilter
 */
var RangeFilter = /** @class */ (function (_super) {
    __extends(RangeFilter, _super);
    function RangeFilter(_a) {
        var target = _a.target, filterName = _a.filterName, filterField = _a.filterField, minValue = _a.minValue, maxValue = _a.maxValue, minMaxCallback = _a.minMaxCallback, step = _a.step, callback = _a.callback, onSliderMove = _a.onSliderMove, template = _a.template, classNames = _a.classNames, attributes = _a.attributes, native = _a.native;
        var _this = _super.call(this) || this;
        _this.target = target;
        _this.component = (0, preact_1.h)(RangeFilterComponent_1["default"], { target: target, filterName: filterName, filterField: filterField, minValue: minValue, maxValue: maxValue, minMaxCallback: minMaxCallback, step: step, callback: callback, onSliderMove: onSliderMove, native: native, template: __assign(__assign({}, RangeFilterComponent_1["default"].defaultProps.template), template), classNames: __assign(__assign({}, RangeFilterComponent_1["default"].defaultProps.classNames), classNames), attributes: __assign(__assign({}, RangeFilterComponent_1["default"].defaultProps.attributes), attributes) });
        return _this;
    }
    /**
     * @param environmentId
     * @param store
     * @param repository
     * @param dictionary
     */
    RangeFilter.prototype.render = function (environmentId, store, repository, dictionary) {
        this.component.props = __assign(__assign({}, this.component.props), { environmentId: environmentId, repository: repository, store: store });
        (0, preact_1.render)(this.component, document.querySelector(this.target));
    };
    /**
     * @param query
     * @param object
     */
    RangeFilter.prototype.toUrlObject = function (query, object) {
        var filterName = this.component.props.filterName;
        var filterField = this.component.props.filterField;
        if (query.filters !== undefined && query.filters[filterName] !== undefined) {
            var filterValues = query.filters[filterName].values;
            if (filterValues.length > 0) {
                object[filterField] = filterValues;
            }
        }
    };
    /**
     * @param object
     * @param query
     */
    RangeFilter.prototype.fromUrlObject = function (object, query) {
        var _a;
        var filterName = this.component.props.filterName;
        var filterField = this.component.props.filterField;
        var fieldValues = (_a = object[filterField]) !== null && _a !== void 0 ? _a : object[filterName];
        if (fieldValues !== undefined &&
            Array.isArray(fieldValues) &&
            fieldValues.length > 0) {
            if (query.filters === undefined) {
                query.filters = {};
            }
            query.filters[filterName] = {
                field: "indexed_metadata." + this.component.props.filterField,
                values: fieldValues,
                filter_type: "range"
            };
        }
    };
    /**
     * @param query
     */
    RangeFilter.prototype.reset = function (query) {
        var filterName = this.component.props.filterName;
        if (query.filters !== undefined &&
            typeof query.filters === "object" &&
            query.filters[filterName] !== undefined) {
            delete query.filters[filterName];
        }
    };
    return RangeFilter;
}(Widget_1["default"]));
/**
 * CheckboxFilter widget
 *
 * @param settings
 */
exports["default"] = (function (settings) { return new RangeFilter(settings); });


/***/ }),

/***/ "./src/widgets/Reload.tsx":
/*!********************************!*\
  !*** ./src/widgets/Reload.tsx ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var preact_1 = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
var ReloadComponent_1 = __webpack_require__(/*! ../components/Reload/ReloadComponent */ "./src/components/Reload/ReloadComponent.tsx");
var Widget_1 = __webpack_require__(/*! ./Widget */ "./src/widgets/Widget.ts");
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


/***/ }),

/***/ "./src/widgets/Result.tsx":
/*!********************************!*\
  !*** ./src/widgets/Result.tsx ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var preact_1 = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
var ResultComponent_1 = __webpack_require__(/*! ../components/Result/ResultComponent */ "./src/components/Result/ResultComponent.tsx");
var Widget_1 = __webpack_require__(/*! ./Widget */ "./src/widgets/Widget.ts");
/**
 * Result
 */
var Result = /** @class */ (function (_super) {
    __extends(Result, _super);
    /**
     * Constructor
     *
     * @param target
     * @param fields
     * @param itemsPerPage
     * @param promote
     * @param exclude
     * @param filter
     * @param highlightsEnabled
     * @param classNames
     * @param template
     * @param formatData
     * @param fadeInSelector
     * @param infiniteScroll
     * @param infiniteScrollButton
     * @param fieldsConciliation
     * @param minScore
     */
    function Result(_a) {
        var target = _a.target, fields = _a.fields, itemsPerPage = _a.itemsPerPage, promote = _a.promote, exclude = _a.exclude, filter = _a.filter, highlightsEnabled = _a.highlightsEnabled, classNames = _a.classNames, template = _a.template, formatData = _a.formatData, fadeInSelector = _a.fadeInSelector, infiniteScroll = _a.infiniteScroll, infiniteScrollButton = _a.infiniteScrollButton, fieldsConciliation = _a.fieldsConciliation, minScore = _a.minScore;
        var _this = _super.call(this) || this;
        _this.target = target;
        _this.targetNode = document.querySelector(_this.target);
        _this.component = (0, preact_1.h)(ResultComponent_1["default"], { target: target, fields: fields, itemsPerPage: itemsPerPage, promote: promote, exclude: exclude, filter: filter, highlightsEnabled: highlightsEnabled, classNames: __assign(__assign({}, ResultComponent_1["default"].defaultProps.classNames), classNames), template: __assign(__assign({}, ResultComponent_1["default"].defaultProps.template), template), formatData: formatData, fadeInSelector: fadeInSelector, infiniteScroll: infiniteScroll, infiniteScrollButton: infiniteScrollButton, fieldsConciliation: fieldsConciliation, minScore: minScore });
        return _this;
    }
    /**
     * @param environmentId
     * @param store
     * @param repository
     * @param dictionary
     */
    Result.prototype.render = function (environmentId, store, repository, dictionary) {
        this.component.props = __assign(__assign({}, this.component.props), { environmentId: environmentId, repository: repository, store: store, currentVisibleResults: store.resultsAreVisible(), dictionary: dictionary });
        (0, preact_1.render)(this.component, this.targetNode);
    };
    /**
     * @param query
     */
    Result.prototype.reset = function (query) {
        delete query.page;
        this.component.state = {
            page: 1
        };
    };
    return Result;
}(Widget_1["default"]));
/**
 * Result widget
 *
 * @param settings
 */
exports["default"] = (function (settings) { return new Result(settings); });


/***/ }),

/***/ "./src/widgets/SearchInput.tsx":
/*!*************************************!*\
  !*** ./src/widgets/SearchInput.tsx ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var preact_1 = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
var SearchInputActions_1 = __webpack_require__(/*! ../components/SearchInput/SearchInputActions */ "./src/components/SearchInput/SearchInputActions.ts");
var SearchInputComponent_1 = __webpack_require__(/*! ../components/SearchInput/SearchInputComponent */ "./src/components/SearchInput/SearchInputComponent.tsx");
var Widget_1 = __webpack_require__(/*! ./Widget */ "./src/widgets/Widget.ts");
/**
 * SearchInput
 */
var SearchInput = /** @class */ (function (_super) {
    __extends(SearchInput, _super);
    /**
     * Constructor
     *
     * @param target
     * @param placeholder
     * @param startSearchOn
     * @param clearSearch
     * @param withContainer
     * @param autofocus
     * @param autocomplete
     * @param classNames
     * @param template
     * @param searchableFields
     * @param speechRecognition
     * @param queryOperator
     */
    function SearchInput(_a) {
        var target = _a.target, placeholder = _a.placeholder, startSearchOn = _a.startSearchOn, clearSearch = _a.clearSearch, withContainer = _a.withContainer, autofocus = _a.autofocus, autocomplete = _a.autocomplete, classNames = _a.classNames, template = _a.template, searchableFields = _a.searchableFields, speechRecognition = _a.speechRecognition, queryOperator = _a.queryOperator;
        var _this = _super.call(this) || this;
        _this.target = target;
        _this.component = (0, preact_1.h)(SearchInputComponent_1["default"], { target: target, placeholder: placeholder, autofocus: autofocus, autocomplete: autocomplete, startSearchOn: startSearchOn, clearSearch: clearSearch, withContainer: withContainer, searchableFields: searchableFields, speechRecognition: speechRecognition, classNames: __assign(__assign({}, SearchInputComponent_1["default"].defaultProps.classNames), classNames), template: __assign(__assign({}, SearchInputComponent_1["default"].defaultProps.template), template), queryOperator: queryOperator, config: _this.config });
        _this.queryOperator = queryOperator;
        _this.autocomplete = autocomplete;
        _this.searchableFields = searchableFields;
        return _this;
    }
    /**
     * @param environmentId
     * @param store
     * @param repository
     * @param dictionary
     */
    SearchInput.prototype.render = function (environmentId, store, repository, dictionary) {
        this.component.props = __assign(__assign({}, this.component.props), { environmentId: environmentId, repository: repository, store: store, htmlNodeInheritProps: {
                autocomplete: "off",
                spellcheck: false
            }, dictionary: dictionary });
        if (this.target === null) {
            return;
        }
        if (!this.targetNode) {
            var targetNode = document.querySelector(this.target);
            var isInput = isInputElement(targetNode);
            if (isInput) {
                this.component.props = __assign(__assign({}, this.component.props), { withContainer: false, htmlNodeInheritProps: __assign(__assign({}, this.component.props.htmlNodeInheritedProps), getNodeAttributes(targetNode)) });
                var parentNode = targetNode.parentNode;
                targetNode.remove();
                this.targetNode = parentNode;
            }
            else {
                this.targetNode = targetNode;
            }
        }
        if (this.isSecondRender === undefined) {
            this.isSecondRender = true;
        }
        else if (this.isSecondRender === true) {
            this.isSecondRender = false;
        }
        if (!this.targetNode) {
            return;
        }
        (0, preact_1.render)(this.component, this.targetNode);
    };
    /**
     * @param query
     * @param object
     */
    SearchInput.prototype.toUrlObject = function (query, object) {
        var q = query.q;
        if (q !== undefined &&
            q !== "") {
            object.q = q;
        }
    };
    /**
     * @param object
     * @param query
     */
    SearchInput.prototype.fromUrlObject = function (object, query) {
        var q = object.q;
        if (q !== undefined &&
            q !== "") {
            query.q = q;
        }
    };
    /**
     * @param query
     */
    SearchInput.prototype.reset = function (query) {
        delete query.q;
    };
    /**
     * @param environmentId
     * @param store
     * @param repository
     */
    SearchInput.prototype.initialSetup = function (environmentId, store, repository) {
        /**
         * Dispatch action
         */
        (0, SearchInputActions_1.initialSearchSetup)(environmentId, store.getCurrentQuery(), this.autocomplete, this.searchableFields, this.queryOperator);
    };
    return SearchInput;
}(Widget_1["default"]));
/**
 * Returns an object of an
 * html node attributes.
 *
 * @param htmlNode
 * @returns {{}}
 */
var getNodeAttributes = function (htmlNode) {
    var _a;
    var nodeAttributes = {};
    for (var i = 0; i < htmlNode.attributes.length; i++) {
        var attr = htmlNode.attributes[i];
        if (attr.specified) {
            nodeAttributes = __assign(__assign({}, nodeAttributes), (_a = {}, _a[attr.name] = attr.value, _a));
        }
    }
    return nodeAttributes;
};
/**
 * Checks if an html node
 * is an input.
 *
 * @param targetNode
 * @returns {boolean}
 */
var isInputElement = function (targetNode) {
    return targetNode instanceof HTMLInputElement;
};
/**
 * Search Input widget
 *
 * @param settings
 */
exports["default"] = (function (settings) { return new SearchInput(settings); });


/***/ }),

/***/ "./src/widgets/Snapshot.tsx":
/*!**********************************!*\
  !*** ./src/widgets/Snapshot.tsx ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var preact_1 = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
var SnapshotComponent_1 = __webpack_require__(/*! ../components/Snapshot/SnapshotComponent */ "./src/components/Snapshot/SnapshotComponent.tsx");
var Widget_1 = __webpack_require__(/*! ./Widget */ "./src/widgets/Widget.ts");
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
        _this.component = (0, preact_1.h)(SnapshotComponent_1["default"], { target: target });
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
        (0, preact_1.render)(this.component, targetNode);
    };
    return Snapshot;
}(Widget_1["default"]));
/**
 * @param settings
 */
exports["default"] = (function (settings) { return new Snapshot(settings); });


/***/ }),

/***/ "./src/widgets/SortBy.tsx":
/*!********************************!*\
  !*** ./src/widgets/SortBy.tsx ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var apisearch_1 = __webpack_require__(/*! apisearch */ "./node_modules/apisearch/lib/index.js");
var preact_1 = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
var SortByComponent_1 = __webpack_require__(/*! ../components/SortBy/SortByComponent */ "./src/components/SortBy/SortByComponent.tsx");
var Widget_1 = __webpack_require__(/*! ./Widget */ "./src/widgets/Widget.ts");
/**
 * SortBy
 */
var SortBy = /** @class */ (function (_super) {
    __extends(SortBy, _super);
    function SortBy(_a) {
        var target = _a.target, classNames = _a.classNames, options = _a.options;
        var _this = _super.call(this) || this;
        _this.target = target;
        _this.targetNode = document.querySelector(_this.target);
        _this.component = (0, preact_1.h)(SortByComponent_1["default"], { target: target, classNames: __assign(__assign({}, SortByComponent_1["default"].defaultProps.classNames), classNames), options: options });
        return _this;
    }
    /**
     * @param environmentId
     * @param store
     * @param repository
     * @param dictionary
     */
    SortBy.prototype.render = function (environmentId, store, repository, dictionary) {
        this.component.props = __assign(__assign({}, this.component.props), { environmentId: environmentId, repository: repository, store: store });
        (0, preact_1.render)(this.component, this.targetNode);
    };
    /**
     * @private
     */
    SortBy.prototype.firstOptionAsString = function () {
        return this.component.props.options[0].value;
    };
    /**
     * @param query
     * @param object
     */
    SortBy.prototype.toUrlObject = function (query, object) {
        if (query.sort !== undefined) {
            var sort = query.sort[0];
            var sortInstance = apisearch_1.SortBy.createFromArray(query.sort);
            var sortAsString = sortInstance.getFirstSortAsString();
            var firstSortAsString = this.firstOptionAsString();
            if (sortAsString !== firstSortAsString) {
                if (sort.type === "distance") {
                    object.sort = "distance:" + sort.unit + ":" + sort.coordinate.lat + ":" + sort.coordinate.lon;
                }
                else {
                    object.sort = sort.field.substr(17) + ":" + sort.order;
                }
            }
        }
    };
    /**
     * @param object
     * @param query
     */
    SortBy.prototype.fromUrlObject = function (object, query) {
        if (object.sort !== undefined) {
            SortBy.setSortToQuery(query, object.sort);
        }
    };
    /**
     * @param query
     */
    SortBy.prototype.reset = function (query) {
        delete query.sort;
        var firstSortAsString = this.firstOptionAsString();
        SortBy.setSortToQuery(query, firstSortAsString);
    };
    /**
     * @param query
     * @param option
     * @private
     */
    SortBy.setSortToQuery = function (query, option) {
        query.sort = [{}];
        if (option === "score") {
            query.sort[0].type = "score";
            return;
        }
        if (option.indexOf("distance:") === 0) {
            var distanceSortParts = option.split(":");
            query.sort[0].type = distanceSortParts[0];
            query.sort[0].unit = distanceSortParts[1];
            query.sort[0].coordinate = {
                lat: distanceSortParts[2],
                lon: distanceSortParts[3]
            };
            return;
        }
        var sortParts = option.split(":");
        query.sort[0].type = "field";
        query.sort[0].field = "indexed_metadata." + sortParts[0];
        query.sort[0].order = sortParts[1];
    };
    return SortBy;
}(Widget_1["default"]));
/**
 * SortBy widget
 *
 * @param settings
 */
exports["default"] = (function (settings) { return new SortBy(settings); });


/***/ }),

/***/ "./src/widgets/Suggestions.tsx":
/*!*************************************!*\
  !*** ./src/widgets/Suggestions.tsx ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var preact_1 = __webpack_require__(/*! preact */ "./node_modules/preact/dist/preact.module.js");
var SuggestionsFilterComponent_1 = __webpack_require__(/*! ../components/Suggestions/SuggestionsFilterComponent */ "./src/components/Suggestions/SuggestionsFilterComponent.tsx");
var Widget_1 = __webpack_require__(/*! ./Widget */ "./src/widgets/Widget.ts");
/**
 * SuggestionsFilter
 */
var SuggestionsFilter = /** @class */ (function (_super) {
    __extends(SuggestionsFilter, _super);
    function SuggestionsFilter(_a) {
        var target = _a.target, numberOfSuggestions = _a.numberOfSuggestions, classNames = _a.classNames, template = _a.template;
        var _this = _super.call(this) || this;
        _this.target = target;
        _this.component = (0, preact_1.h)(SuggestionsFilterComponent_1["default"], { target: target, numberOfSuggestions: numberOfSuggestions, classNames: __assign(__assign({}, SuggestionsFilterComponent_1["default"].defaultProps.classNames), classNames), template: __assign(__assign({}, SuggestionsFilterComponent_1["default"].defaultProps.template), template) });
        return _this;
    }
    /**
     * @param environmentId
     * @param store
     * @param repository
     * @param dictionary
     */
    SuggestionsFilter.prototype.render = function (environmentId, store, repository, dictionary) {
        this.component.props = __assign(__assign({}, this.component.props), { environmentId: environmentId, repository: repository, store: store, dictionary: dictionary });
        (0, preact_1.render)(this.component, document.querySelector(this.target));
    };
    return SuggestionsFilter;
}(Widget_1["default"]));
/**
 * CheckboxFilter widget
 *
 * @param settings
 */
exports["default"] = (function (settings) { return new SuggestionsFilter(settings); });


/***/ }),

/***/ "./src/widgets/Widget.ts":
/*!*******************************!*\
  !*** ./src/widgets/Widget.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.__esModule = true;
/**
 * Widget
 */
var Widget = /** @class */ (function () {
    function Widget() {
    }
    Widget.prototype.withConfig = function (config) {
        if ("withConfig" in this.component) {
            this.component.withConfig(config);
        }
    };
    /**
     * @param query
     * @param object
     */
    Widget.prototype.toUrlObject = function (query, object) {
    };
    /**
     * @param object
     * @param query
     */
    Widget.prototype.fromUrlObject = function (object, query) {
    };
    /**
     * @param query
     */
    Widget.prototype.reset = function (query) {
    };
    /**
     * @param environmentId
     * @param query
     */
    Widget.prototype.normalizeQuery = function (environmentId, query) {
    };
    /**
     * @param environmentId
     * @param store
     * @param repository
     */
    Widget.prototype.initialSetup = function (environmentId, store, repository) {
    };
    return Widget;
}());
exports["default"] = Widget;


/***/ }),

/***/ "./src/widgets/Widgets.ts":
/*!********************************!*\
  !*** ./src/widgets/Widgets.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
var CheckboxFilter_1 = __webpack_require__(/*! ./CheckboxFilter */ "./src/widgets/CheckboxFilter.tsx");
var ClearFilters_1 = __webpack_require__(/*! ./ClearFilters */ "./src/widgets/ClearFilters.tsx");
var Information_1 = __webpack_require__(/*! ./Information */ "./src/widgets/Information.tsx");
var MultipleFilter_1 = __webpack_require__(/*! ./MultipleFilter */ "./src/widgets/MultipleFilter.tsx");
var Pagination_1 = __webpack_require__(/*! ./Pagination */ "./src/widgets/Pagination.tsx");
var RangeFilter_1 = __webpack_require__(/*! ./RangeFilter */ "./src/widgets/RangeFilter.tsx");
var Reload_1 = __webpack_require__(/*! ./Reload */ "./src/widgets/Reload.tsx");
var Result_1 = __webpack_require__(/*! ./Result */ "./src/widgets/Result.tsx");
var SearchInput_1 = __webpack_require__(/*! ./SearchInput */ "./src/widgets/SearchInput.tsx");
var Snapshot_1 = __webpack_require__(/*! ./Snapshot */ "./src/widgets/Snapshot.tsx");
var SortBy_1 = __webpack_require__(/*! ./SortBy */ "./src/widgets/SortBy.tsx");
var Suggestions_1 = __webpack_require__(/*! ./Suggestions */ "./src/widgets/Suggestions.tsx");
/**
 * Widget factories
 */
exports["default"] = {
    searchInput: SearchInput_1["default"],
    clearFilters: ClearFilters_1["default"],
    multipleFilter: MultipleFilter_1["default"],
    sortBy: SortBy_1["default"],
    information: Information_1["default"],
    result: Result_1["default"],
    pagination: Pagination_1["default"],
    checkboxFilter: CheckboxFilter_1["default"],
    rangeFilter: RangeFilter_1["default"],
    reload: Reload_1["default"],
    snapshot: Snapshot_1["default"],
    suggestions: Suggestions_1["default"]
};


/***/ }),

/***/ "./node_modules/ts-md5/dist/esm/index.js":
/*!***********************************************!*\
  !*** ./node_modules/ts-md5/dist/esm/index.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Md5": () => (/* reexport safe */ _md5__WEBPACK_IMPORTED_MODULE_0__.Md5),
/* harmony export */   "Md5FileHasher": () => (/* reexport safe */ _md5_file_hasher__WEBPACK_IMPORTED_MODULE_1__.Md5FileHasher),
/* harmony export */   "ParallelHasher": () => (/* reexport safe */ _parallel_hasher__WEBPACK_IMPORTED_MODULE_2__.ParallelHasher)
/* harmony export */ });
/* harmony import */ var _md5__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./md5 */ "./node_modules/ts-md5/dist/esm/md5.js");
/* harmony import */ var _md5_file_hasher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./md5_file_hasher */ "./node_modules/ts-md5/dist/esm/md5_file_hasher.js");
/* harmony import */ var _parallel_hasher__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./parallel_hasher */ "./node_modules/ts-md5/dist/esm/parallel_hasher.js");



//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/ts-md5/dist/esm/md5.js":
/*!*********************************************!*\
  !*** ./node_modules/ts-md5/dist/esm/md5.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Md5": () => (/* binding */ Md5)
/* harmony export */ });
/*

TypeScript Md5
==============

Based on work by
* Joseph Myers: http://www.myersdaily.org/joseph/javascript/md5-text.html
* André Cruz: https://github.com/satazor/SparkMD5
* Raymond Hill: https://github.com/gorhill/yamd5.js

Effectively a TypeScrypt re-write of Raymond Hill JS Library

The MIT License (MIT)

Copyright (C) 2014 Raymond Hill

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.



            DO WHAT YOU WANT TO PUBLIC LICENSE
                    Version 2, December 2004

 Copyright (C) 2015 André Cruz <amdfcruz@gmail.com>

 Everyone is permitted to copy and distribute verbatim or modified
 copies of this license document, and changing it is allowed as long
 as the name is changed.

            DO WHAT YOU WANT TO PUBLIC LICENSE
   TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

  0. You just DO WHAT YOU WANT TO.


*/
;
class Md5 {
    constructor() {
        this._dataLength = 0;
        this._bufferLength = 0;
        this._state = new Int32Array(4);
        this._buffer = new ArrayBuffer(68);
        this._buffer8 = new Uint8Array(this._buffer, 0, 68);
        this._buffer32 = new Uint32Array(this._buffer, 0, 17);
        this.start();
    }
    static hashStr(str, raw = false) {
        return this.onePassHasher
            .start()
            .appendStr(str)
            .end(raw);
    }
    static hashAsciiStr(str, raw = false) {
        return this.onePassHasher
            .start()
            .appendAsciiStr(str)
            .end(raw);
    }
    static _hex(x) {
        const hc = Md5.hexChars;
        const ho = Md5.hexOut;
        let n;
        let offset;
        let j;
        let i;
        for (i = 0; i < 4; i += 1) {
            offset = i * 8;
            n = x[i];
            for (j = 0; j < 8; j += 2) {
                ho[offset + 1 + j] = hc.charAt(n & 0x0F);
                n >>>= 4;
                ho[offset + 0 + j] = hc.charAt(n & 0x0F);
                n >>>= 4;
            }
        }
        return ho.join('');
    }
    static _md5cycle(x, k) {
        let a = x[0];
        let b = x[1];
        let c = x[2];
        let d = x[3];
        // ff()
        a += (b & c | ~b & d) + k[0] - 680876936 | 0;
        a = (a << 7 | a >>> 25) + b | 0;
        d += (a & b | ~a & c) + k[1] - 389564586 | 0;
        d = (d << 12 | d >>> 20) + a | 0;
        c += (d & a | ~d & b) + k[2] + 606105819 | 0;
        c = (c << 17 | c >>> 15) + d | 0;
        b += (c & d | ~c & a) + k[3] - 1044525330 | 0;
        b = (b << 22 | b >>> 10) + c | 0;
        a += (b & c | ~b & d) + k[4] - 176418897 | 0;
        a = (a << 7 | a >>> 25) + b | 0;
        d += (a & b | ~a & c) + k[5] + 1200080426 | 0;
        d = (d << 12 | d >>> 20) + a | 0;
        c += (d & a | ~d & b) + k[6] - 1473231341 | 0;
        c = (c << 17 | c >>> 15) + d | 0;
        b += (c & d | ~c & a) + k[7] - 45705983 | 0;
        b = (b << 22 | b >>> 10) + c | 0;
        a += (b & c | ~b & d) + k[8] + 1770035416 | 0;
        a = (a << 7 | a >>> 25) + b | 0;
        d += (a & b | ~a & c) + k[9] - 1958414417 | 0;
        d = (d << 12 | d >>> 20) + a | 0;
        c += (d & a | ~d & b) + k[10] - 42063 | 0;
        c = (c << 17 | c >>> 15) + d | 0;
        b += (c & d | ~c & a) + k[11] - 1990404162 | 0;
        b = (b << 22 | b >>> 10) + c | 0;
        a += (b & c | ~b & d) + k[12] + 1804603682 | 0;
        a = (a << 7 | a >>> 25) + b | 0;
        d += (a & b | ~a & c) + k[13] - 40341101 | 0;
        d = (d << 12 | d >>> 20) + a | 0;
        c += (d & a | ~d & b) + k[14] - 1502002290 | 0;
        c = (c << 17 | c >>> 15) + d | 0;
        b += (c & d | ~c & a) + k[15] + 1236535329 | 0;
        b = (b << 22 | b >>> 10) + c | 0;
        // gg()
        a += (b & d | c & ~d) + k[1] - 165796510 | 0;
        a = (a << 5 | a >>> 27) + b | 0;
        d += (a & c | b & ~c) + k[6] - 1069501632 | 0;
        d = (d << 9 | d >>> 23) + a | 0;
        c += (d & b | a & ~b) + k[11] + 643717713 | 0;
        c = (c << 14 | c >>> 18) + d | 0;
        b += (c & a | d & ~a) + k[0] - 373897302 | 0;
        b = (b << 20 | b >>> 12) + c | 0;
        a += (b & d | c & ~d) + k[5] - 701558691 | 0;
        a = (a << 5 | a >>> 27) + b | 0;
        d += (a & c | b & ~c) + k[10] + 38016083 | 0;
        d = (d << 9 | d >>> 23) + a | 0;
        c += (d & b | a & ~b) + k[15] - 660478335 | 0;
        c = (c << 14 | c >>> 18) + d | 0;
        b += (c & a | d & ~a) + k[4] - 405537848 | 0;
        b = (b << 20 | b >>> 12) + c | 0;
        a += (b & d | c & ~d) + k[9] + 568446438 | 0;
        a = (a << 5 | a >>> 27) + b | 0;
        d += (a & c | b & ~c) + k[14] - 1019803690 | 0;
        d = (d << 9 | d >>> 23) + a | 0;
        c += (d & b | a & ~b) + k[3] - 187363961 | 0;
        c = (c << 14 | c >>> 18) + d | 0;
        b += (c & a | d & ~a) + k[8] + 1163531501 | 0;
        b = (b << 20 | b >>> 12) + c | 0;
        a += (b & d | c & ~d) + k[13] - 1444681467 | 0;
        a = (a << 5 | a >>> 27) + b | 0;
        d += (a & c | b & ~c) + k[2] - 51403784 | 0;
        d = (d << 9 | d >>> 23) + a | 0;
        c += (d & b | a & ~b) + k[7] + 1735328473 | 0;
        c = (c << 14 | c >>> 18) + d | 0;
        b += (c & a | d & ~a) + k[12] - 1926607734 | 0;
        b = (b << 20 | b >>> 12) + c | 0;
        // hh()
        a += (b ^ c ^ d) + k[5] - 378558 | 0;
        a = (a << 4 | a >>> 28) + b | 0;
        d += (a ^ b ^ c) + k[8] - 2022574463 | 0;
        d = (d << 11 | d >>> 21) + a | 0;
        c += (d ^ a ^ b) + k[11] + 1839030562 | 0;
        c = (c << 16 | c >>> 16) + d | 0;
        b += (c ^ d ^ a) + k[14] - 35309556 | 0;
        b = (b << 23 | b >>> 9) + c | 0;
        a += (b ^ c ^ d) + k[1] - 1530992060 | 0;
        a = (a << 4 | a >>> 28) + b | 0;
        d += (a ^ b ^ c) + k[4] + 1272893353 | 0;
        d = (d << 11 | d >>> 21) + a | 0;
        c += (d ^ a ^ b) + k[7] - 155497632 | 0;
        c = (c << 16 | c >>> 16) + d | 0;
        b += (c ^ d ^ a) + k[10] - 1094730640 | 0;
        b = (b << 23 | b >>> 9) + c | 0;
        a += (b ^ c ^ d) + k[13] + 681279174 | 0;
        a = (a << 4 | a >>> 28) + b | 0;
        d += (a ^ b ^ c) + k[0] - 358537222 | 0;
        d = (d << 11 | d >>> 21) + a | 0;
        c += (d ^ a ^ b) + k[3] - 722521979 | 0;
        c = (c << 16 | c >>> 16) + d | 0;
        b += (c ^ d ^ a) + k[6] + 76029189 | 0;
        b = (b << 23 | b >>> 9) + c | 0;
        a += (b ^ c ^ d) + k[9] - 640364487 | 0;
        a = (a << 4 | a >>> 28) + b | 0;
        d += (a ^ b ^ c) + k[12] - 421815835 | 0;
        d = (d << 11 | d >>> 21) + a | 0;
        c += (d ^ a ^ b) + k[15] + 530742520 | 0;
        c = (c << 16 | c >>> 16) + d | 0;
        b += (c ^ d ^ a) + k[2] - 995338651 | 0;
        b = (b << 23 | b >>> 9) + c | 0;
        // ii()
        a += (c ^ (b | ~d)) + k[0] - 198630844 | 0;
        a = (a << 6 | a >>> 26) + b | 0;
        d += (b ^ (a | ~c)) + k[7] + 1126891415 | 0;
        d = (d << 10 | d >>> 22) + a | 0;
        c += (a ^ (d | ~b)) + k[14] - 1416354905 | 0;
        c = (c << 15 | c >>> 17) + d | 0;
        b += (d ^ (c | ~a)) + k[5] - 57434055 | 0;
        b = (b << 21 | b >>> 11) + c | 0;
        a += (c ^ (b | ~d)) + k[12] + 1700485571 | 0;
        a = (a << 6 | a >>> 26) + b | 0;
        d += (b ^ (a | ~c)) + k[3] - 1894986606 | 0;
        d = (d << 10 | d >>> 22) + a | 0;
        c += (a ^ (d | ~b)) + k[10] - 1051523 | 0;
        c = (c << 15 | c >>> 17) + d | 0;
        b += (d ^ (c | ~a)) + k[1] - 2054922799 | 0;
        b = (b << 21 | b >>> 11) + c | 0;
        a += (c ^ (b | ~d)) + k[8] + 1873313359 | 0;
        a = (a << 6 | a >>> 26) + b | 0;
        d += (b ^ (a | ~c)) + k[15] - 30611744 | 0;
        d = (d << 10 | d >>> 22) + a | 0;
        c += (a ^ (d | ~b)) + k[6] - 1560198380 | 0;
        c = (c << 15 | c >>> 17) + d | 0;
        b += (d ^ (c | ~a)) + k[13] + 1309151649 | 0;
        b = (b << 21 | b >>> 11) + c | 0;
        a += (c ^ (b | ~d)) + k[4] - 145523070 | 0;
        a = (a << 6 | a >>> 26) + b | 0;
        d += (b ^ (a | ~c)) + k[11] - 1120210379 | 0;
        d = (d << 10 | d >>> 22) + a | 0;
        c += (a ^ (d | ~b)) + k[2] + 718787259 | 0;
        c = (c << 15 | c >>> 17) + d | 0;
        b += (d ^ (c | ~a)) + k[9] - 343485551 | 0;
        b = (b << 21 | b >>> 11) + c | 0;
        x[0] = a + x[0] | 0;
        x[1] = b + x[1] | 0;
        x[2] = c + x[2] | 0;
        x[3] = d + x[3] | 0;
    }
    /**
     * Initialise buffer to be hashed
     */
    start() {
        this._dataLength = 0;
        this._bufferLength = 0;
        this._state.set(Md5.stateIdentity);
        return this;
    }
    // Char to code point to to array conversion:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt
    // #Example.3A_Fixing_charCodeAt_to_handle_non-Basic-Multilingual-Plane_characters_if_their_presence_earlier_in_the_string_is_unknown
    /**
     * Append a UTF-8 string to the hash buffer
     * @param str String to append
     */
    appendStr(str) {
        const buf8 = this._buffer8;
        const buf32 = this._buffer32;
        let bufLen = this._bufferLength;
        let code;
        let i;
        for (i = 0; i < str.length; i += 1) {
            code = str.charCodeAt(i);
            if (code < 128) {
                buf8[bufLen++] = code;
            }
            else if (code < 0x800) {
                buf8[bufLen++] = (code >>> 6) + 0xC0;
                buf8[bufLen++] = code & 0x3F | 0x80;
            }
            else if (code < 0xD800 || code > 0xDBFF) {
                buf8[bufLen++] = (code >>> 12) + 0xE0;
                buf8[bufLen++] = (code >>> 6 & 0x3F) | 0x80;
                buf8[bufLen++] = (code & 0x3F) | 0x80;
            }
            else {
                code = ((code - 0xD800) * 0x400) + (str.charCodeAt(++i) - 0xDC00) + 0x10000;
                if (code > 0x10FFFF) {
                    throw new Error('Unicode standard supports code points up to U+10FFFF');
                }
                buf8[bufLen++] = (code >>> 18) + 0xF0;
                buf8[bufLen++] = (code >>> 12 & 0x3F) | 0x80;
                buf8[bufLen++] = (code >>> 6 & 0x3F) | 0x80;
                buf8[bufLen++] = (code & 0x3F) | 0x80;
            }
            if (bufLen >= 64) {
                this._dataLength += 64;
                Md5._md5cycle(this._state, buf32);
                bufLen -= 64;
                buf32[0] = buf32[16];
            }
        }
        this._bufferLength = bufLen;
        return this;
    }
    /**
     * Append an ASCII string to the hash buffer
     * @param str String to append
     */
    appendAsciiStr(str) {
        const buf8 = this._buffer8;
        const buf32 = this._buffer32;
        let bufLen = this._bufferLength;
        let i;
        let j = 0;
        for (;;) {
            i = Math.min(str.length - j, 64 - bufLen);
            while (i--) {
                buf8[bufLen++] = str.charCodeAt(j++);
            }
            if (bufLen < 64) {
                break;
            }
            this._dataLength += 64;
            Md5._md5cycle(this._state, buf32);
            bufLen = 0;
        }
        this._bufferLength = bufLen;
        return this;
    }
    /**
     * Append a byte array to the hash buffer
     * @param input array to append
     */
    appendByteArray(input) {
        const buf8 = this._buffer8;
        const buf32 = this._buffer32;
        let bufLen = this._bufferLength;
        let i;
        let j = 0;
        for (;;) {
            i = Math.min(input.length - j, 64 - bufLen);
            while (i--) {
                buf8[bufLen++] = input[j++];
            }
            if (bufLen < 64) {
                break;
            }
            this._dataLength += 64;
            Md5._md5cycle(this._state, buf32);
            bufLen = 0;
        }
        this._bufferLength = bufLen;
        return this;
    }
    /**
     * Get the state of the hash buffer
     */
    getState() {
        const s = this._state;
        return {
            buffer: String.fromCharCode.apply(null, Array.from(this._buffer8)),
            buflen: this._bufferLength,
            length: this._dataLength,
            state: [s[0], s[1], s[2], s[3]]
        };
    }
    /**
     * Override the current state of the hash buffer
     * @param state New hash buffer state
     */
    setState(state) {
        const buf = state.buffer;
        const x = state.state;
        const s = this._state;
        let i;
        this._dataLength = state.length;
        this._bufferLength = state.buflen;
        s[0] = x[0];
        s[1] = x[1];
        s[2] = x[2];
        s[3] = x[3];
        for (i = 0; i < buf.length; i += 1) {
            this._buffer8[i] = buf.charCodeAt(i);
        }
    }
    /**
     * Hash the current state of the hash buffer and return the result
     * @param raw Whether to return the value as an `Int32Array`
     */
    end(raw = false) {
        const bufLen = this._bufferLength;
        const buf8 = this._buffer8;
        const buf32 = this._buffer32;
        const i = (bufLen >> 2) + 1;
        this._dataLength += bufLen;
        const dataBitsLen = this._dataLength * 8;
        buf8[bufLen] = 0x80;
        buf8[bufLen + 1] = buf8[bufLen + 2] = buf8[bufLen + 3] = 0;
        buf32.set(Md5.buffer32Identity.subarray(i), i);
        if (bufLen > 55) {
            Md5._md5cycle(this._state, buf32);
            buf32.set(Md5.buffer32Identity);
        }
        // Do the final computation based on the tail and length
        // Beware that the final length may not fit in 32 bits so we take care of that
        if (dataBitsLen <= 0xFFFFFFFF) {
            buf32[14] = dataBitsLen;
        }
        else {
            const matches = dataBitsLen.toString(16).match(/(.*?)(.{0,8})$/);
            if (matches === null) {
                return;
            }
            const lo = parseInt(matches[2], 16);
            const hi = parseInt(matches[1], 16) || 0;
            buf32[14] = lo;
            buf32[15] = hi;
        }
        Md5._md5cycle(this._state, buf32);
        return raw ? this._state : Md5._hex(this._state);
    }
}
// Private Static Variables
Md5.stateIdentity = new Int32Array([1732584193, -271733879, -1732584194, 271733878]);
Md5.buffer32Identity = new Int32Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
Md5.hexChars = '0123456789abcdef';
Md5.hexOut = [];
// Permanent instance is to use for one-call hashing
Md5.onePassHasher = new Md5();
if (Md5.hashStr('hello') !== '5d41402abc4b2a76b9719d911017c592') {
    throw new Error('Md5 self test failed.');
}
//# sourceMappingURL=md5.js.map

/***/ }),

/***/ "./node_modules/ts-md5/dist/esm/md5_file_hasher.js":
/*!*********************************************************!*\
  !*** ./node_modules/ts-md5/dist/esm/md5_file_hasher.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Md5FileHasher": () => (/* binding */ Md5FileHasher)
/* harmony export */ });
/* harmony import */ var _md5__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./md5 */ "./node_modules/ts-md5/dist/esm/md5.js");

// Hashes any blob
class Md5FileHasher {
    constructor(_callback, // Callback to return the result
    _async = true, // Async version is not always available in a web worker
    _partSize = 1048576) {
        this._callback = _callback;
        this._async = _async;
        this._partSize = _partSize;
        this._configureReader();
    }
    /**
     * Hash a blob of data in the worker
     * @param blob Data to hash
     */
    hash(blob) {
        const self = this;
        self._blob = blob;
        // self._length = Math.ceil(blob.size / self._partSize);
        self._part = 0;
        self._md5 = new _md5__WEBPACK_IMPORTED_MODULE_0__.Md5();
        self._processPart();
    }
    _fail() {
        this._callback({
            success: false,
            result: 'data read failed'
        });
    }
    _hashData(e) {
        let self = this;
        self._md5.appendByteArray(new Uint8Array(e.target.result));
        if (self._part * self._partSize >= self._blob.size) {
            self._callback({
                success: true,
                result: self._md5.end()
            });
        }
        else {
            self._processPart();
        }
    }
    _processPart() {
        const self = this;
        let endbyte = 0;
        let current_part;
        self._part += 1;
        if (self._blob.size > self._partSize) { // If blob bigger then part_size we will slice it up
            endbyte = self._part * self._partSize;
            if (endbyte > self._blob.size) {
                endbyte = self._blob.size;
            }
            current_part = self._blob.slice((self._part - 1) * self._partSize, endbyte);
        }
        else {
            current_part = self._blob;
        }
        if (self._async) {
            self._reader.readAsArrayBuffer(current_part);
        }
        else {
            setTimeout(() => {
                try {
                    self._hashData({
                        target: {
                            result: self._reader.readAsArrayBuffer(current_part)
                        },
                    });
                }
                catch (e) {
                    self._fail();
                }
            }, 0);
        }
    }
    _configureReader() {
        const self = this;
        if (self._async) {
            self._reader = new FileReader();
            self._reader.onload = self._hashData.bind(self);
            self._reader.onerror = self._fail.bind(self);
            self._reader.onabort = self._fail.bind(self);
        }
        else {
            self._reader = new FileReaderSync();
        }
    }
}
//# sourceMappingURL=md5_file_hasher.js.map

/***/ }),

/***/ "./node_modules/ts-md5/dist/esm/parallel_hasher.js":
/*!*********************************************************!*\
  !*** ./node_modules/ts-md5/dist/esm/parallel_hasher.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ParallelHasher": () => (/* binding */ ParallelHasher)
/* harmony export */ });
;
class ParallelHasher {
    constructor(workerUri, workerOptions) {
        this._queue = [];
        this._ready = true;
        const self = this;
        if (Worker) {
            self._hashWorker = new Worker(workerUri, workerOptions);
            self._hashWorker.onmessage = self._recievedMessage.bind(self);
            self._hashWorker.onerror = (err) => {
                self._ready = false;
                console.error('Hash worker failure', err);
            };
        }
        else {
            self._ready = false;
            console.error('Web Workers are not supported in this browser');
        }
    }
    /**
     * Hash a blob of data in the worker
     * @param blob Data to hash
     * @returns Promise of the Hashed result
     */
    hash(blob) {
        const self = this;
        let promise;
        promise = new Promise((resolve, reject) => {
            self._queue.push({
                blob,
                resolve,
                reject,
            });
            self._processNext();
        });
        return promise;
    }
    /** Terminate any existing hash requests */
    terminate() {
        this._ready = false;
        this._hashWorker.terminate();
    }
    // Processes the next item in the queue
    _processNext() {
        if (this._ready && !this._processing && this._queue.length > 0) {
            this._processing = this._queue.pop();
            this._hashWorker.postMessage(this._processing.blob);
        }
    }
    // Hash result is returned from the worker
    _recievedMessage(evt) {
        var _a, _b;
        const data = evt.data;
        if (data.success) {
            (_a = this._processing) === null || _a === void 0 ? void 0 : _a.resolve(data.result);
        }
        else {
            (_b = this._processing) === null || _b === void 0 ? void 0 : _b.reject(data.result);
        }
        this._processing = undefined;
        this._processNext();
    }
}
//# sourceMappingURL=parallel_hasher.js.map

/***/ }),

/***/ "./node_modules/tslib/tslib.es6.js":
/*!*****************************************!*\
  !*** ./node_modules/tslib/tslib.es6.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "__assign": () => (/* binding */ __assign),
/* harmony export */   "__asyncDelegator": () => (/* binding */ __asyncDelegator),
/* harmony export */   "__asyncGenerator": () => (/* binding */ __asyncGenerator),
/* harmony export */   "__asyncValues": () => (/* binding */ __asyncValues),
/* harmony export */   "__await": () => (/* binding */ __await),
/* harmony export */   "__awaiter": () => (/* binding */ __awaiter),
/* harmony export */   "__classPrivateFieldGet": () => (/* binding */ __classPrivateFieldGet),
/* harmony export */   "__classPrivateFieldSet": () => (/* binding */ __classPrivateFieldSet),
/* harmony export */   "__createBinding": () => (/* binding */ __createBinding),
/* harmony export */   "__decorate": () => (/* binding */ __decorate),
/* harmony export */   "__exportStar": () => (/* binding */ __exportStar),
/* harmony export */   "__extends": () => (/* binding */ __extends),
/* harmony export */   "__generator": () => (/* binding */ __generator),
/* harmony export */   "__importDefault": () => (/* binding */ __importDefault),
/* harmony export */   "__importStar": () => (/* binding */ __importStar),
/* harmony export */   "__makeTemplateObject": () => (/* binding */ __makeTemplateObject),
/* harmony export */   "__metadata": () => (/* binding */ __metadata),
/* harmony export */   "__param": () => (/* binding */ __param),
/* harmony export */   "__read": () => (/* binding */ __read),
/* harmony export */   "__rest": () => (/* binding */ __rest),
/* harmony export */   "__spread": () => (/* binding */ __spread),
/* harmony export */   "__spreadArrays": () => (/* binding */ __spreadArrays),
/* harmony export */   "__values": () => (/* binding */ __values)
/* harmony export */ });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __createBinding(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}

function __exportStar(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
}

function __classPrivateFieldSet(receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
}


/***/ }),

/***/ "./node_modules/axios/dist/browser/axios.cjs":
/*!***************************************************!*\
  !*** ./node_modules/axios/dist/browser/axios.cjs ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// Axios v1.2.3 Copyright (c) 2023 Matt Zabriskie and contributors


function bind(fn, thisArg) {
  return function wrap() {
    return fn.apply(thisArg, arguments);
  };
}

// utils is a library of generic helper functions non-specific to axios

const {toString} = Object.prototype;
const {getPrototypeOf} = Object;

const kindOf = (cache => thing => {
    const str = toString.call(thing);
    return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
})(Object.create(null));

const kindOfTest = (type) => {
  type = type.toLowerCase();
  return (thing) => kindOf(thing) === type
};

const typeOfTest = type => thing => typeof thing === type;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 *
 * @returns {boolean} True if value is an Array, otherwise false
 */
const {isArray} = Array;

/**
 * Determine if a value is undefined
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if the value is undefined, otherwise false
 */
const isUndefined = typeOfTest('undefined');

/**
 * Determine if a value is a Buffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && isFunction(val.constructor.isBuffer) && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
const isArrayBuffer = kindOfTest('ArrayBuffer');


/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  let result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (isArrayBuffer(val.buffer));
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a String, otherwise false
 */
const isString = typeOfTest('string');

/**
 * Determine if a value is a Function
 *
 * @param {*} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
const isFunction = typeOfTest('function');

/**
 * Determine if a value is a Number
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Number, otherwise false
 */
const isNumber = typeOfTest('number');

/**
 * Determine if a value is an Object
 *
 * @param {*} thing The value to test
 *
 * @returns {boolean} True if value is an Object, otherwise false
 */
const isObject = (thing) => thing !== null && typeof thing === 'object';

/**
 * Determine if a value is a Boolean
 *
 * @param {*} thing The value to test
 * @returns {boolean} True if value is a Boolean, otherwise false
 */
const isBoolean = thing => thing === true || thing === false;

/**
 * Determine if a value is a plain Object
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a plain Object, otherwise false
 */
const isPlainObject = (val) => {
  if (kindOf(val) !== 'object') {
    return false;
  }

  const prototype = getPrototypeOf(val);
  return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in val) && !(Symbol.iterator in val);
};

/**
 * Determine if a value is a Date
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Date, otherwise false
 */
const isDate = kindOfTest('Date');

/**
 * Determine if a value is a File
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a File, otherwise false
 */
const isFile = kindOfTest('File');

/**
 * Determine if a value is a Blob
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Blob, otherwise false
 */
const isBlob = kindOfTest('Blob');

/**
 * Determine if a value is a FileList
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a File, otherwise false
 */
const isFileList = kindOfTest('FileList');

/**
 * Determine if a value is a Stream
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Stream, otherwise false
 */
const isStream = (val) => isObject(val) && isFunction(val.pipe);

/**
 * Determine if a value is a FormData
 *
 * @param {*} thing The value to test
 *
 * @returns {boolean} True if value is an FormData, otherwise false
 */
const isFormData = (thing) => {
  const pattern = '[object FormData]';
  return thing && (
    (typeof FormData === 'function' && thing instanceof FormData) ||
    toString.call(thing) === pattern ||
    (isFunction(thing.toString) && thing.toString() === pattern)
  );
};

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
const isURLSearchParams = kindOfTest('URLSearchParams');

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 *
 * @returns {String} The String freed of excess whitespace
 */
const trim = (str) => str.trim ?
  str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 *
 * @param {Boolean} [allOwnKeys = false]
 * @returns {any}
 */
function forEach(obj, fn, {allOwnKeys = false} = {}) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  let i;
  let l;

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
    const len = keys.length;
    let key;

    for (i = 0; i < len; i++) {
      key = keys[i];
      fn.call(null, obj[key], key, obj);
    }
  }
}

function findKey(obj, key) {
  key = key.toLowerCase();
  const keys = Object.keys(obj);
  let i = keys.length;
  let _key;
  while (i-- > 0) {
    _key = keys[i];
    if (key === _key.toLowerCase()) {
      return _key;
    }
  }
  return null;
}

const _global = (() => {
  /*eslint no-undef:0*/
  if (typeof globalThis !== "undefined") return globalThis;
  return typeof self !== "undefined" ? self : (typeof window !== 'undefined' ? window : __webpack_require__.g)
})();

const isContextDefined = (context) => !isUndefined(context) && context !== _global;

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 *
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  const {caseless} = isContextDefined(this) && this || {};
  const result = {};
  const assignValue = (val, key) => {
    const targetKey = caseless && findKey(result, key) || key;
    if (isPlainObject(result[targetKey]) && isPlainObject(val)) {
      result[targetKey] = merge(result[targetKey], val);
    } else if (isPlainObject(val)) {
      result[targetKey] = merge({}, val);
    } else if (isArray(val)) {
      result[targetKey] = val.slice();
    } else {
      result[targetKey] = val;
    }
  };

  for (let i = 0, l = arguments.length; i < l; i++) {
    arguments[i] && forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 *
 * @param {Boolean} [allOwnKeys]
 * @returns {Object} The resulting value of object a
 */
const extend = (a, b, thisArg, {allOwnKeys}= {}) => {
  forEach(b, (val, key) => {
    if (thisArg && isFunction(val)) {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  }, {allOwnKeys});
  return a;
};

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 *
 * @returns {string} content value without BOM
 */
const stripBOM = (content) => {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
};

/**
 * Inherit the prototype methods from one constructor into another
 * @param {function} constructor
 * @param {function} superConstructor
 * @param {object} [props]
 * @param {object} [descriptors]
 *
 * @returns {void}
 */
const inherits = (constructor, superConstructor, props, descriptors) => {
  constructor.prototype = Object.create(superConstructor.prototype, descriptors);
  constructor.prototype.constructor = constructor;
  Object.defineProperty(constructor, 'super', {
    value: superConstructor.prototype
  });
  props && Object.assign(constructor.prototype, props);
};

/**
 * Resolve object with deep prototype chain to a flat object
 * @param {Object} sourceObj source object
 * @param {Object} [destObj]
 * @param {Function|Boolean} [filter]
 * @param {Function} [propFilter]
 *
 * @returns {Object}
 */
const toFlatObject = (sourceObj, destObj, filter, propFilter) => {
  let props;
  let i;
  let prop;
  const merged = {};

  destObj = destObj || {};
  // eslint-disable-next-line no-eq-null,eqeqeq
  if (sourceObj == null) return destObj;

  do {
    props = Object.getOwnPropertyNames(sourceObj);
    i = props.length;
    while (i-- > 0) {
      prop = props[i];
      if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
        destObj[prop] = sourceObj[prop];
        merged[prop] = true;
      }
    }
    sourceObj = filter !== false && getPrototypeOf(sourceObj);
  } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);

  return destObj;
};

/**
 * Determines whether a string ends with the characters of a specified string
 *
 * @param {String} str
 * @param {String} searchString
 * @param {Number} [position= 0]
 *
 * @returns {boolean}
 */
const endsWith = (str, searchString, position) => {
  str = String(str);
  if (position === undefined || position > str.length) {
    position = str.length;
  }
  position -= searchString.length;
  const lastIndex = str.indexOf(searchString, position);
  return lastIndex !== -1 && lastIndex === position;
};


/**
 * Returns new array from array like object or null if failed
 *
 * @param {*} [thing]
 *
 * @returns {?Array}
 */
const toArray = (thing) => {
  if (!thing) return null;
  if (isArray(thing)) return thing;
  let i = thing.length;
  if (!isNumber(i)) return null;
  const arr = new Array(i);
  while (i-- > 0) {
    arr[i] = thing[i];
  }
  return arr;
};

/**
 * Checking if the Uint8Array exists and if it does, it returns a function that checks if the
 * thing passed in is an instance of Uint8Array
 *
 * @param {TypedArray}
 *
 * @returns {Array}
 */
// eslint-disable-next-line func-names
const isTypedArray = (TypedArray => {
  // eslint-disable-next-line func-names
  return thing => {
    return TypedArray && thing instanceof TypedArray;
  };
})(typeof Uint8Array !== 'undefined' && getPrototypeOf(Uint8Array));

/**
 * For each entry in the object, call the function with the key and value.
 *
 * @param {Object<any, any>} obj - The object to iterate over.
 * @param {Function} fn - The function to call for each entry.
 *
 * @returns {void}
 */
const forEachEntry = (obj, fn) => {
  const generator = obj && obj[Symbol.iterator];

  const iterator = generator.call(obj);

  let result;

  while ((result = iterator.next()) && !result.done) {
    const pair = result.value;
    fn.call(obj, pair[0], pair[1]);
  }
};

/**
 * It takes a regular expression and a string, and returns an array of all the matches
 *
 * @param {string} regExp - The regular expression to match against.
 * @param {string} str - The string to search.
 *
 * @returns {Array<boolean>}
 */
const matchAll = (regExp, str) => {
  let matches;
  const arr = [];

  while ((matches = regExp.exec(str)) !== null) {
    arr.push(matches);
  }

  return arr;
};

/* Checking if the kindOfTest function returns true when passed an HTMLFormElement. */
const isHTMLForm = kindOfTest('HTMLFormElement');

const toCamelCase = str => {
  return str.toLowerCase().replace(/[_-\s]([a-z\d])(\w*)/g,
    function replacer(m, p1, p2) {
      return p1.toUpperCase() + p2;
    }
  );
};

/* Creating a function that will check if an object has a property. */
const hasOwnProperty = (({hasOwnProperty}) => (obj, prop) => hasOwnProperty.call(obj, prop))(Object.prototype);

/**
 * Determine if a value is a RegExp object
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a RegExp object, otherwise false
 */
const isRegExp = kindOfTest('RegExp');

const reduceDescriptors = (obj, reducer) => {
  const descriptors = Object.getOwnPropertyDescriptors(obj);
  const reducedDescriptors = {};

  forEach(descriptors, (descriptor, name) => {
    if (reducer(descriptor, name, obj) !== false) {
      reducedDescriptors[name] = descriptor;
    }
  });

  Object.defineProperties(obj, reducedDescriptors);
};

/**
 * Makes all methods read-only
 * @param {Object} obj
 */

const freezeMethods = (obj) => {
  reduceDescriptors(obj, (descriptor, name) => {
    // skip restricted props in strict mode
    if (isFunction(obj) && ['arguments', 'caller', 'callee'].indexOf(name) !== -1) {
      return false;
    }

    const value = obj[name];

    if (!isFunction(value)) return;

    descriptor.enumerable = false;

    if ('writable' in descriptor) {
      descriptor.writable = false;
      return;
    }

    if (!descriptor.set) {
      descriptor.set = () => {
        throw Error('Can not rewrite read-only method \'' + name + '\'');
      };
    }
  });
};

const toObjectSet = (arrayOrString, delimiter) => {
  const obj = {};

  const define = (arr) => {
    arr.forEach(value => {
      obj[value] = true;
    });
  };

  isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));

  return obj;
};

const noop = () => {};

const toFiniteNumber = (value, defaultValue) => {
  value = +value;
  return Number.isFinite(value) ? value : defaultValue;
};

const toJSONObject = (obj) => {
  const stack = new Array(10);

  const visit = (source, i) => {

    if (isObject(source)) {
      if (stack.indexOf(source) >= 0) {
        return;
      }

      if(!('toJSON' in source)) {
        stack[i] = source;
        const target = isArray(source) ? [] : {};

        forEach(source, (value, key) => {
          const reducedValue = visit(value, i + 1);
          !isUndefined(reducedValue) && (target[key] = reducedValue);
        });

        stack[i] = undefined;

        return target;
      }
    }

    return source;
  };

  return visit(obj, 0);
};

var utils = {
  isArray,
  isArrayBuffer,
  isBuffer,
  isFormData,
  isArrayBufferView,
  isString,
  isNumber,
  isBoolean,
  isObject,
  isPlainObject,
  isUndefined,
  isDate,
  isFile,
  isBlob,
  isRegExp,
  isFunction,
  isStream,
  isURLSearchParams,
  isTypedArray,
  isFileList,
  forEach,
  merge,
  extend,
  trim,
  stripBOM,
  inherits,
  toFlatObject,
  kindOf,
  kindOfTest,
  endsWith,
  toArray,
  forEachEntry,
  matchAll,
  isHTMLForm,
  hasOwnProperty,
  hasOwnProp: hasOwnProperty, // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors,
  freezeMethods,
  toObjectSet,
  toCamelCase,
  noop,
  toFiniteNumber,
  findKey,
  global: _global,
  isContextDefined,
  toJSONObject
};

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [config] The config.
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 *
 * @returns {Error} The created error.
 */
function AxiosError(message, code, config, request, response) {
  Error.call(this);

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  } else {
    this.stack = (new Error()).stack;
  }

  this.message = message;
  this.name = 'AxiosError';
  code && (this.code = code);
  config && (this.config = config);
  request && (this.request = request);
  response && (this.response = response);
}

utils.inherits(AxiosError, Error, {
  toJSON: function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: utils.toJSONObject(this.config),
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  }
});

const prototype$1 = AxiosError.prototype;
const descriptors = {};

[
  'ERR_BAD_OPTION_VALUE',
  'ERR_BAD_OPTION',
  'ECONNABORTED',
  'ETIMEDOUT',
  'ERR_NETWORK',
  'ERR_FR_TOO_MANY_REDIRECTS',
  'ERR_DEPRECATED',
  'ERR_BAD_RESPONSE',
  'ERR_BAD_REQUEST',
  'ERR_CANCELED',
  'ERR_NOT_SUPPORT',
  'ERR_INVALID_URL'
// eslint-disable-next-line func-names
].forEach(code => {
  descriptors[code] = {value: code};
});

Object.defineProperties(AxiosError, descriptors);
Object.defineProperty(prototype$1, 'isAxiosError', {value: true});

// eslint-disable-next-line func-names
AxiosError.from = (error, code, config, request, response, customProps) => {
  const axiosError = Object.create(prototype$1);

  utils.toFlatObject(error, axiosError, function filter(obj) {
    return obj !== Error.prototype;
  }, prop => {
    return prop !== 'isAxiosError';
  });

  AxiosError.call(axiosError, error.message, code, config, request, response);

  axiosError.cause = error;

  axiosError.name = error.name;

  customProps && Object.assign(axiosError, customProps);

  return axiosError;
};

/* eslint-env browser */
var browser = typeof self == 'object' ? self.FormData : window.FormData;

var FormData$2 = browser;

/**
 * Determines if the given thing is a array or js object.
 *
 * @param {string} thing - The object or array to be visited.
 *
 * @returns {boolean}
 */
function isVisitable(thing) {
  return utils.isPlainObject(thing) || utils.isArray(thing);
}

/**
 * It removes the brackets from the end of a string
 *
 * @param {string} key - The key of the parameter.
 *
 * @returns {string} the key without the brackets.
 */
function removeBrackets(key) {
  return utils.endsWith(key, '[]') ? key.slice(0, -2) : key;
}

/**
 * It takes a path, a key, and a boolean, and returns a string
 *
 * @param {string} path - The path to the current key.
 * @param {string} key - The key of the current object being iterated over.
 * @param {string} dots - If true, the key will be rendered with dots instead of brackets.
 *
 * @returns {string} The path to the current key.
 */
function renderKey(path, key, dots) {
  if (!path) return key;
  return path.concat(key).map(function each(token, i) {
    // eslint-disable-next-line no-param-reassign
    token = removeBrackets(token);
    return !dots && i ? '[' + token + ']' : token;
  }).join(dots ? '.' : '');
}

/**
 * If the array is an array and none of its elements are visitable, then it's a flat array.
 *
 * @param {Array<any>} arr - The array to check
 *
 * @returns {boolean}
 */
function isFlatArray(arr) {
  return utils.isArray(arr) && !arr.some(isVisitable);
}

const predicates = utils.toFlatObject(utils, {}, null, function filter(prop) {
  return /^is[A-Z]/.test(prop);
});

/**
 * If the thing is a FormData object, return true, otherwise return false.
 *
 * @param {unknown} thing - The thing to check.
 *
 * @returns {boolean}
 */
function isSpecCompliant(thing) {
  return thing && utils.isFunction(thing.append) && thing[Symbol.toStringTag] === 'FormData' && thing[Symbol.iterator];
}

/**
 * Convert a data object to FormData
 *
 * @param {Object} obj
 * @param {?Object} [formData]
 * @param {?Object} [options]
 * @param {Function} [options.visitor]
 * @param {Boolean} [options.metaTokens = true]
 * @param {Boolean} [options.dots = false]
 * @param {?Boolean} [options.indexes = false]
 *
 * @returns {Object}
 **/

/**
 * It converts an object into a FormData object
 *
 * @param {Object<any, any>} obj - The object to convert to form data.
 * @param {string} formData - The FormData object to append to.
 * @param {Object<string, any>} options
 *
 * @returns
 */
function toFormData(obj, formData, options) {
  if (!utils.isObject(obj)) {
    throw new TypeError('target must be an object');
  }

  // eslint-disable-next-line no-param-reassign
  formData = formData || new (FormData$2 || FormData)();

  // eslint-disable-next-line no-param-reassign
  options = utils.toFlatObject(options, {
    metaTokens: true,
    dots: false,
    indexes: false
  }, false, function defined(option, source) {
    // eslint-disable-next-line no-eq-null,eqeqeq
    return !utils.isUndefined(source[option]);
  });

  const metaTokens = options.metaTokens;
  // eslint-disable-next-line no-use-before-define
  const visitor = options.visitor || defaultVisitor;
  const dots = options.dots;
  const indexes = options.indexes;
  const _Blob = options.Blob || typeof Blob !== 'undefined' && Blob;
  const useBlob = _Blob && isSpecCompliant(formData);

  if (!utils.isFunction(visitor)) {
    throw new TypeError('visitor must be a function');
  }

  function convertValue(value) {
    if (value === null) return '';

    if (utils.isDate(value)) {
      return value.toISOString();
    }

    if (!useBlob && utils.isBlob(value)) {
      throw new AxiosError('Blob is not supported. Use a Buffer instead.');
    }

    if (utils.isArrayBuffer(value) || utils.isTypedArray(value)) {
      return useBlob && typeof Blob === 'function' ? new Blob([value]) : Buffer.from(value);
    }

    return value;
  }

  /**
   * Default visitor.
   *
   * @param {*} value
   * @param {String|Number} key
   * @param {Array<String|Number>} path
   * @this {FormData}
   *
   * @returns {boolean} return true to visit the each prop of the value recursively
   */
  function defaultVisitor(value, key, path) {
    let arr = value;

    if (value && !path && typeof value === 'object') {
      if (utils.endsWith(key, '{}')) {
        // eslint-disable-next-line no-param-reassign
        key = metaTokens ? key : key.slice(0, -2);
        // eslint-disable-next-line no-param-reassign
        value = JSON.stringify(value);
      } else if (
        (utils.isArray(value) && isFlatArray(value)) ||
        (utils.isFileList(value) || utils.endsWith(key, '[]') && (arr = utils.toArray(value))
        )) {
        // eslint-disable-next-line no-param-reassign
        key = removeBrackets(key);

        arr.forEach(function each(el, index) {
          !(utils.isUndefined(el) || el === null) && formData.append(
            // eslint-disable-next-line no-nested-ternary
            indexes === true ? renderKey([key], index, dots) : (indexes === null ? key : key + '[]'),
            convertValue(el)
          );
        });
        return false;
      }
    }

    if (isVisitable(value)) {
      return true;
    }

    formData.append(renderKey(path, key, dots), convertValue(value));

    return false;
  }

  const stack = [];

  const exposedHelpers = Object.assign(predicates, {
    defaultVisitor,
    convertValue,
    isVisitable
  });

  function build(value, path) {
    if (utils.isUndefined(value)) return;

    if (stack.indexOf(value) !== -1) {
      throw Error('Circular reference detected in ' + path.join('.'));
    }

    stack.push(value);

    utils.forEach(value, function each(el, key) {
      const result = !(utils.isUndefined(el) || el === null) && visitor.call(
        formData, el, utils.isString(key) ? key.trim() : key, path, exposedHelpers
      );

      if (result === true) {
        build(el, path ? path.concat(key) : [key]);
      }
    });

    stack.pop();
  }

  if (!utils.isObject(obj)) {
    throw new TypeError('data must be an object');
  }

  build(obj);

  return formData;
}

/**
 * It encodes a string by replacing all characters that are not in the unreserved set with
 * their percent-encoded equivalents
 *
 * @param {string} str - The string to encode.
 *
 * @returns {string} The encoded string.
 */
function encode$1(str) {
  const charMap = {
    '!': '%21',
    "'": '%27',
    '(': '%28',
    ')': '%29',
    '~': '%7E',
    '%20': '+',
    '%00': '\x00'
  };
  return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match) {
    return charMap[match];
  });
}

/**
 * It takes a params object and converts it to a FormData object
 *
 * @param {Object<string, any>} params - The parameters to be converted to a FormData object.
 * @param {Object<string, any>} options - The options object passed to the Axios constructor.
 *
 * @returns {void}
 */
function AxiosURLSearchParams(params, options) {
  this._pairs = [];

  params && toFormData(params, this, options);
}

const prototype = AxiosURLSearchParams.prototype;

prototype.append = function append(name, value) {
  this._pairs.push([name, value]);
};

prototype.toString = function toString(encoder) {
  const _encode = encoder ? function(value) {
    return encoder.call(this, value, encode$1);
  } : encode$1;

  return this._pairs.map(function each(pair) {
    return _encode(pair[0]) + '=' + _encode(pair[1]);
  }, '').join('&');
};

/**
 * It replaces all instances of the characters `:`, `$`, `,`, `+`, `[`, and `]` with their
 * URI encoded counterparts
 *
 * @param {string} val The value to be encoded.
 *
 * @returns {string} The encoded value.
 */
function encode(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @param {?object} options
 *
 * @returns {string} The formatted url
 */
function buildURL(url, params, options) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }
  
  const _encode = options && options.encode || encode;

  const serializeFn = options && options.serialize;

  let serializedParams;

  if (serializeFn) {
    serializedParams = serializeFn(params, options);
  } else {
    serializedParams = utils.isURLSearchParams(params) ?
      params.toString() :
      new AxiosURLSearchParams(params, options).toString(_encode);
  }

  if (serializedParams) {
    const hashmarkIndex = url.indexOf("#");

    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
}

class InterceptorManager {
  constructor() {
    this.handlers = [];
  }

  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(fulfilled, rejected, options) {
    this.handlers.push({
      fulfilled,
      rejected,
      synchronous: options ? options.synchronous : false,
      runWhen: options ? options.runWhen : null
    });
    return this.handlers.length - 1;
  }

  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(id) {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  }

  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    if (this.handlers) {
      this.handlers = [];
    }
  }

  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(fn) {
    utils.forEach(this.handlers, function forEachHandler(h) {
      if (h !== null) {
        fn(h);
      }
    });
  }
}

var InterceptorManager$1 = InterceptorManager;

var transitionalDefaults = {
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false
};

var URLSearchParams$1 = typeof URLSearchParams !== 'undefined' ? URLSearchParams : AxiosURLSearchParams;

var FormData$1 = FormData;

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 *
 * @returns {boolean}
 */
const isStandardBrowserEnv = (() => {
  let product;
  if (typeof navigator !== 'undefined' && (
    (product = navigator.product) === 'ReactNative' ||
    product === 'NativeScript' ||
    product === 'NS')
  ) {
    return false;
  }

  return typeof window !== 'undefined' && typeof document !== 'undefined';
})();

/**
 * Determine if we're running in a standard browser webWorker environment
 *
 * Although the `isStandardBrowserEnv` method indicates that
 * `allows axios to run in a web worker`, the WebWorker will still be
 * filtered out due to its judgment standard
 * `typeof window !== 'undefined' && typeof document !== 'undefined'`.
 * This leads to a problem when axios post `FormData` in webWorker
 */
 const isStandardBrowserWebWorkerEnv = (() => {
  return (
    typeof WorkerGlobalScope !== 'undefined' &&
    // eslint-disable-next-line no-undef
    self instanceof WorkerGlobalScope &&
    typeof self.importScripts === 'function'
  );
})();


var platform = {
  isBrowser: true,
  classes: {
    URLSearchParams: URLSearchParams$1,
    FormData: FormData$1,
    Blob
  },
  isStandardBrowserEnv,
  isStandardBrowserWebWorkerEnv,
  protocols: ['http', 'https', 'file', 'blob', 'url', 'data']
};

function toURLEncodedForm(data, options) {
  return toFormData(data, new platform.classes.URLSearchParams(), Object.assign({
    visitor: function(value, key, path, helpers) {
      if (platform.isNode && utils.isBuffer(value)) {
        this.append(key, value.toString('base64'));
        return false;
      }

      return helpers.defaultVisitor.apply(this, arguments);
    }
  }, options));
}

/**
 * It takes a string like `foo[x][y][z]` and returns an array like `['foo', 'x', 'y', 'z']
 *
 * @param {string} name - The name of the property to get.
 *
 * @returns An array of strings.
 */
function parsePropPath(name) {
  // foo[x][y][z]
  // foo.x.y.z
  // foo-x-y-z
  // foo x y z
  return utils.matchAll(/\w+|\[(\w*)]/g, name).map(match => {
    return match[0] === '[]' ? '' : match[1] || match[0];
  });
}

/**
 * Convert an array to an object.
 *
 * @param {Array<any>} arr - The array to convert to an object.
 *
 * @returns An object with the same keys and values as the array.
 */
function arrayToObject(arr) {
  const obj = {};
  const keys = Object.keys(arr);
  let i;
  const len = keys.length;
  let key;
  for (i = 0; i < len; i++) {
    key = keys[i];
    obj[key] = arr[key];
  }
  return obj;
}

/**
 * It takes a FormData object and returns a JavaScript object
 *
 * @param {string} formData The FormData object to convert to JSON.
 *
 * @returns {Object<string, any> | null} The converted object.
 */
function formDataToJSON(formData) {
  function buildPath(path, value, target, index) {
    let name = path[index++];
    const isNumericKey = Number.isFinite(+name);
    const isLast = index >= path.length;
    name = !name && utils.isArray(target) ? target.length : name;

    if (isLast) {
      if (utils.hasOwnProp(target, name)) {
        target[name] = [target[name], value];
      } else {
        target[name] = value;
      }

      return !isNumericKey;
    }

    if (!target[name] || !utils.isObject(target[name])) {
      target[name] = [];
    }

    const result = buildPath(path, value, target[name], index);

    if (result && utils.isArray(target[name])) {
      target[name] = arrayToObject(target[name]);
    }

    return !isNumericKey;
  }

  if (utils.isFormData(formData) && utils.isFunction(formData.entries)) {
    const obj = {};

    utils.forEachEntry(formData, (name, value) => {
      buildPath(parsePropPath(name), value, obj, 0);
    });

    return obj;
  }

  return null;
}

const DEFAULT_CONTENT_TYPE = {
  'Content-Type': undefined
};

/**
 * It takes a string, tries to parse it, and if it fails, it returns the stringified version
 * of the input
 *
 * @param {any} rawValue - The value to be stringified.
 * @param {Function} parser - A function that parses a string into a JavaScript object.
 * @param {Function} encoder - A function that takes a value and returns a string.
 *
 * @returns {string} A stringified version of the rawValue.
 */
function stringifySafely(rawValue, parser, encoder) {
  if (utils.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils.trim(rawValue);
    } catch (e) {
      if (e.name !== 'SyntaxError') {
        throw e;
      }
    }
  }

  return (encoder || JSON.stringify)(rawValue);
}

const defaults = {

  transitional: transitionalDefaults,

  adapter: ['xhr', 'http'],

  transformRequest: [function transformRequest(data, headers) {
    const contentType = headers.getContentType() || '';
    const hasJSONContentType = contentType.indexOf('application/json') > -1;
    const isObjectPayload = utils.isObject(data);

    if (isObjectPayload && utils.isHTMLForm(data)) {
      data = new FormData(data);
    }

    const isFormData = utils.isFormData(data);

    if (isFormData) {
      if (!hasJSONContentType) {
        return data;
      }
      return hasJSONContentType ? JSON.stringify(formDataToJSON(data)) : data;
    }

    if (utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      headers.setContentType('application/x-www-form-urlencoded;charset=utf-8', false);
      return data.toString();
    }

    let isFileList;

    if (isObjectPayload) {
      if (contentType.indexOf('application/x-www-form-urlencoded') > -1) {
        return toURLEncodedForm(data, this.formSerializer).toString();
      }

      if ((isFileList = utils.isFileList(data)) || contentType.indexOf('multipart/form-data') > -1) {
        const _FormData = this.env && this.env.FormData;

        return toFormData(
          isFileList ? {'files[]': data} : data,
          _FormData && new _FormData(),
          this.formSerializer
        );
      }
    }

    if (isObjectPayload || hasJSONContentType ) {
      headers.setContentType('application/json', false);
      return stringifySafely(data);
    }

    return data;
  }],

  transformResponse: [function transformResponse(data) {
    const transitional = this.transitional || defaults.transitional;
    const forcedJSONParsing = transitional && transitional.forcedJSONParsing;
    const JSONRequested = this.responseType === 'json';

    if (data && utils.isString(data) && ((forcedJSONParsing && !this.responseType) || JSONRequested)) {
      const silentJSONParsing = transitional && transitional.silentJSONParsing;
      const strictJSONParsing = !silentJSONParsing && JSONRequested;

      try {
        return JSON.parse(data);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === 'SyntaxError') {
            throw AxiosError.from(e, AxiosError.ERR_BAD_RESPONSE, this, null, this.response);
          }
          throw e;
        }
      }
    }

    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  env: {
    FormData: platform.classes.FormData,
    Blob: platform.classes.Blob
  },

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },

  headers: {
    common: {
      'Accept': 'application/json, text/plain, */*'
    }
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

var defaults$1 = defaults;

// RawAxiosHeaders whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
const ignoreDuplicateOf = utils.toObjectSet([
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
]);

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} rawHeaders Headers needing to be parsed
 *
 * @returns {Object} Headers parsed into an object
 */
var parseHeaders = rawHeaders => {
  const parsed = {};
  let key;
  let val;
  let i;

  rawHeaders && rawHeaders.split('\n').forEach(function parser(line) {
    i = line.indexOf(':');
    key = line.substring(0, i).trim().toLowerCase();
    val = line.substring(i + 1).trim();

    if (!key || (parsed[key] && ignoreDuplicateOf[key])) {
      return;
    }

    if (key === 'set-cookie') {
      if (parsed[key]) {
        parsed[key].push(val);
      } else {
        parsed[key] = [val];
      }
    } else {
      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
    }
  });

  return parsed;
};

const $internals = Symbol('internals');

function normalizeHeader(header) {
  return header && String(header).trim().toLowerCase();
}

function normalizeValue(value) {
  if (value === false || value == null) {
    return value;
  }

  return utils.isArray(value) ? value.map(normalizeValue) : String(value);
}

function parseTokens(str) {
  const tokens = Object.create(null);
  const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let match;

  while ((match = tokensRE.exec(str))) {
    tokens[match[1]] = match[2];
  }

  return tokens;
}

function isValidHeaderName(str) {
  return /^[-_a-zA-Z]+$/.test(str.trim());
}

function matchHeaderValue(context, value, header, filter) {
  if (utils.isFunction(filter)) {
    return filter.call(this, value, header);
  }

  if (!utils.isString(value)) return;

  if (utils.isString(filter)) {
    return value.indexOf(filter) !== -1;
  }

  if (utils.isRegExp(filter)) {
    return filter.test(value);
  }
}

function formatHeader(header) {
  return header.trim()
    .toLowerCase().replace(/([a-z\d])(\w*)/g, (w, char, str) => {
      return char.toUpperCase() + str;
    });
}

function buildAccessors(obj, header) {
  const accessorName = utils.toCamelCase(' ' + header);

  ['get', 'set', 'has'].forEach(methodName => {
    Object.defineProperty(obj, methodName + accessorName, {
      value: function(arg1, arg2, arg3) {
        return this[methodName].call(this, header, arg1, arg2, arg3);
      },
      configurable: true
    });
  });
}

class AxiosHeaders {
  constructor(headers) {
    headers && this.set(headers);
  }

  set(header, valueOrRewrite, rewrite) {
    const self = this;

    function setHeader(_value, _header, _rewrite) {
      const lHeader = normalizeHeader(_header);

      if (!lHeader) {
        throw new Error('header name must be a non-empty string');
      }

      const key = utils.findKey(self, lHeader);

      if(!key || self[key] === undefined || _rewrite === true || (_rewrite === undefined && self[key] !== false)) {
        self[key || _header] = normalizeValue(_value);
      }
    }

    const setHeaders = (headers, _rewrite) =>
      utils.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));

    if (utils.isPlainObject(header) || header instanceof this.constructor) {
      setHeaders(header, valueOrRewrite);
    } else if(utils.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
      setHeaders(parseHeaders(header), valueOrRewrite);
    } else {
      header != null && setHeader(valueOrRewrite, header, rewrite);
    }

    return this;
  }

  get(header, parser) {
    header = normalizeHeader(header);

    if (header) {
      const key = utils.findKey(this, header);

      if (key) {
        const value = this[key];

        if (!parser) {
          return value;
        }

        if (parser === true) {
          return parseTokens(value);
        }

        if (utils.isFunction(parser)) {
          return parser.call(this, value, key);
        }

        if (utils.isRegExp(parser)) {
          return parser.exec(value);
        }

        throw new TypeError('parser must be boolean|regexp|function');
      }
    }
  }

  has(header, matcher) {
    header = normalizeHeader(header);

    if (header) {
      const key = utils.findKey(this, header);

      return !!(key && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
    }

    return false;
  }

  delete(header, matcher) {
    const self = this;
    let deleted = false;

    function deleteHeader(_header) {
      _header = normalizeHeader(_header);

      if (_header) {
        const key = utils.findKey(self, _header);

        if (key && (!matcher || matchHeaderValue(self, self[key], key, matcher))) {
          delete self[key];

          deleted = true;
        }
      }
    }

    if (utils.isArray(header)) {
      header.forEach(deleteHeader);
    } else {
      deleteHeader(header);
    }

    return deleted;
  }

  clear() {
    return Object.keys(this).forEach(this.delete.bind(this));
  }

  normalize(format) {
    const self = this;
    const headers = {};

    utils.forEach(this, (value, header) => {
      const key = utils.findKey(headers, header);

      if (key) {
        self[key] = normalizeValue(value);
        delete self[header];
        return;
      }

      const normalized = format ? formatHeader(header) : String(header).trim();

      if (normalized !== header) {
        delete self[header];
      }

      self[normalized] = normalizeValue(value);

      headers[normalized] = true;
    });

    return this;
  }

  concat(...targets) {
    return this.constructor.concat(this, ...targets);
  }

  toJSON(asStrings) {
    const obj = Object.create(null);

    utils.forEach(this, (value, header) => {
      value != null && value !== false && (obj[header] = asStrings && utils.isArray(value) ? value.join(', ') : value);
    });

    return obj;
  }

  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }

  toString() {
    return Object.entries(this.toJSON()).map(([header, value]) => header + ': ' + value).join('\n');
  }

  get [Symbol.toStringTag]() {
    return 'AxiosHeaders';
  }

  static from(thing) {
    return thing instanceof this ? thing : new this(thing);
  }

  static concat(first, ...targets) {
    const computed = new this(first);

    targets.forEach((target) => computed.set(target));

    return computed;
  }

  static accessor(header) {
    const internals = this[$internals] = (this[$internals] = {
      accessors: {}
    });

    const accessors = internals.accessors;
    const prototype = this.prototype;

    function defineAccessor(_header) {
      const lHeader = normalizeHeader(_header);

      if (!accessors[lHeader]) {
        buildAccessors(prototype, _header);
        accessors[lHeader] = true;
      }
    }

    utils.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);

    return this;
  }
}

AxiosHeaders.accessor(['Content-Type', 'Content-Length', 'Accept', 'Accept-Encoding', 'User-Agent']);

utils.freezeMethods(AxiosHeaders.prototype);
utils.freezeMethods(AxiosHeaders);

var AxiosHeaders$1 = AxiosHeaders;

/**
 * Transform the data for a request or a response
 *
 * @param {Array|Function} fns A single function or Array of functions
 * @param {?Object} response The response object
 *
 * @returns {*} The resulting transformed data
 */
function transformData(fns, response) {
  const config = this || defaults$1;
  const context = response || config;
  const headers = AxiosHeaders$1.from(context.headers);
  let data = context.data;

  utils.forEach(fns, function transform(fn) {
    data = fn.call(config, data, headers.normalize(), response ? response.status : undefined);
  });

  headers.normalize();

  return data;
}

function isCancel(value) {
  return !!(value && value.__CANCEL__);
}

/**
 * A `CanceledError` is an object that is thrown when an operation is canceled.
 *
 * @param {string=} message The message.
 * @param {Object=} config The config.
 * @param {Object=} request The request.
 *
 * @returns {CanceledError} The created error.
 */
function CanceledError(message, config, request) {
  // eslint-disable-next-line no-eq-null,eqeqeq
  AxiosError.call(this, message == null ? 'canceled' : message, AxiosError.ERR_CANCELED, config, request);
  this.name = 'CanceledError';
}

utils.inherits(CanceledError, AxiosError, {
  __CANCEL__: true
});

// eslint-disable-next-line strict
var httpAdapter = null;

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 *
 * @returns {object} The response.
 */
function settle(resolve, reject, response) {
  const validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(new AxiosError(
      'Request failed with status code ' + response.status,
      [AxiosError.ERR_BAD_REQUEST, AxiosError.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
      response.config,
      response.request,
      response
    ));
  }
}

var cookies = platform.isStandardBrowserEnv ?

// Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        const cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

// Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })();

/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 *
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}

/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 *
 * @returns {string} The combined URL
 */
function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
}

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 *
 * @returns {string} The combined full path
 */
function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
}

var isURLSameOrigin = platform.isStandardBrowserEnv ?

// Standard browser envs have full support of the APIs needed to test
// whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    const msie = /(msie|trident)/i.test(navigator.userAgent);
    const urlParsingNode = document.createElement('a');
    let originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      let href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
          urlParsingNode.pathname :
          '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      const parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
          parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })();

function parseProtocol(url) {
  const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
  return match && match[1] || '';
}

/**
 * Calculate data maxRate
 * @param {Number} [samplesCount= 10]
 * @param {Number} [min= 1000]
 * @returns {Function}
 */
function speedometer(samplesCount, min) {
  samplesCount = samplesCount || 10;
  const bytes = new Array(samplesCount);
  const timestamps = new Array(samplesCount);
  let head = 0;
  let tail = 0;
  let firstSampleTS;

  min = min !== undefined ? min : 1000;

  return function push(chunkLength) {
    const now = Date.now();

    const startedAt = timestamps[tail];

    if (!firstSampleTS) {
      firstSampleTS = now;
    }

    bytes[head] = chunkLength;
    timestamps[head] = now;

    let i = tail;
    let bytesCount = 0;

    while (i !== head) {
      bytesCount += bytes[i++];
      i = i % samplesCount;
    }

    head = (head + 1) % samplesCount;

    if (head === tail) {
      tail = (tail + 1) % samplesCount;
    }

    if (now - firstSampleTS < min) {
      return;
    }

    const passed = startedAt && now - startedAt;

    return passed ? Math.round(bytesCount * 1000 / passed) : undefined;
  };
}

function progressEventReducer(listener, isDownloadStream) {
  let bytesNotified = 0;
  const _speedometer = speedometer(50, 250);

  return e => {
    const loaded = e.loaded;
    const total = e.lengthComputable ? e.total : undefined;
    const progressBytes = loaded - bytesNotified;
    const rate = _speedometer(progressBytes);
    const inRange = loaded <= total;

    bytesNotified = loaded;

    const data = {
      loaded,
      total,
      progress: total ? (loaded / total) : undefined,
      bytes: progressBytes,
      rate: rate ? rate : undefined,
      estimated: rate && total && inRange ? (total - loaded) / rate : undefined,
      event: e
    };

    data[isDownloadStream ? 'download' : 'upload'] = true;

    listener(data);
  };
}

const isXHRAdapterSupported = typeof XMLHttpRequest !== 'undefined';

var xhrAdapter = isXHRAdapterSupported && function (config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    let requestData = config.data;
    const requestHeaders = AxiosHeaders$1.from(config.headers).normalize();
    const responseType = config.responseType;
    let onCanceled;
    function done() {
      if (config.cancelToken) {
        config.cancelToken.unsubscribe(onCanceled);
      }

      if (config.signal) {
        config.signal.removeEventListener('abort', onCanceled);
      }
    }

    if (utils.isFormData(requestData) && (platform.isStandardBrowserEnv || platform.isStandardBrowserWebWorkerEnv)) {
      requestHeaders.setContentType(false); // Let the browser set it
    }

    let request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      const username = config.auth.username || '';
      const password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.set('Authorization', 'Basic ' + btoa(username + ':' + password));
    }

    const fullPath = buildFullPath(config.baseURL, config.url);

    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    function onloadend() {
      if (!request) {
        return;
      }
      // Prepare the response
      const responseHeaders = AxiosHeaders$1.from(
        'getAllResponseHeaders' in request && request.getAllResponseHeaders()
      );
      const responseData = !responseType || responseType === 'text' || responseType === 'json' ?
        request.responseText : request.response;
      const response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      };

      settle(function _resolve(value) {
        resolve(value);
        done();
      }, function _reject(err) {
        reject(err);
        done();
      }, response);

      // Clean up request
      request = null;
    }

    if ('onloadend' in request) {
      // Use onloadend if available
      request.onloadend = onloadend;
    } else {
      // Listen for ready state to emulate onloadend
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }

        // The request errored out and we didn't get a response, this will be
        // handled by onerror instead
        // With one exception: request that using file: protocol, most browsers
        // will return status as 0 even though it's a successful request
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
          return;
        }
        // readystate handler is calling before onerror or ontimeout handlers,
        // so we should call onloadend on the next 'tick'
        setTimeout(onloadend);
      };
    }

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(new AxiosError('Request aborted', AxiosError.ECONNABORTED, config, request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(new AxiosError('Network Error', AxiosError.ERR_NETWORK, config, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      let timeoutErrorMessage = config.timeout ? 'timeout of ' + config.timeout + 'ms exceeded' : 'timeout exceeded';
      const transitional = config.transitional || transitionalDefaults;
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(new AxiosError(
        timeoutErrorMessage,
        transitional.clarifyTimeoutError ? AxiosError.ETIMEDOUT : AxiosError.ECONNABORTED,
        config,
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (platform.isStandardBrowserEnv) {
      // Add xsrf header
      const xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath))
        && config.xsrfCookieName && cookies.read(config.xsrfCookieName);

      if (xsrfValue) {
        requestHeaders.set(config.xsrfHeaderName, xsrfValue);
      }
    }

    // Remove Content-Type if data is undefined
    requestData === undefined && requestHeaders.setContentType(null);

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
        request.setRequestHeader(key, val);
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (responseType && responseType !== 'json') {
      request.responseType = config.responseType;
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', progressEventReducer(config.onDownloadProgress, true));
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', progressEventReducer(config.onUploadProgress));
    }

    if (config.cancelToken || config.signal) {
      // Handle cancellation
      // eslint-disable-next-line func-names
      onCanceled = cancel => {
        if (!request) {
          return;
        }
        reject(!cancel || cancel.type ? new CanceledError(null, config, request) : cancel);
        request.abort();
        request = null;
      };

      config.cancelToken && config.cancelToken.subscribe(onCanceled);
      if (config.signal) {
        config.signal.aborted ? onCanceled() : config.signal.addEventListener('abort', onCanceled);
      }
    }

    const protocol = parseProtocol(fullPath);

    if (protocol && platform.protocols.indexOf(protocol) === -1) {
      reject(new AxiosError('Unsupported protocol ' + protocol + ':', AxiosError.ERR_BAD_REQUEST, config));
      return;
    }


    // Send the request
    request.send(requestData || null);
  });
};

const knownAdapters = {
  http: httpAdapter,
  xhr: xhrAdapter
};

utils.forEach(knownAdapters, (fn, value) => {
  if(fn) {
    try {
      Object.defineProperty(fn, 'name', {value});
    } catch (e) {
      // eslint-disable-next-line no-empty
    }
    Object.defineProperty(fn, 'adapterName', {value});
  }
});

var adapters = {
  getAdapter: (adapters) => {
    adapters = utils.isArray(adapters) ? adapters : [adapters];

    const {length} = adapters;
    let nameOrAdapter;
    let adapter;

    for (let i = 0; i < length; i++) {
      nameOrAdapter = adapters[i];
      if((adapter = utils.isString(nameOrAdapter) ? knownAdapters[nameOrAdapter.toLowerCase()] : nameOrAdapter)) {
        break;
      }
    }

    if (!adapter) {
      if (adapter === false) {
        throw new AxiosError(
          `Adapter ${nameOrAdapter} is not supported by the environment`,
          'ERR_NOT_SUPPORT'
        );
      }

      throw new Error(
        utils.hasOwnProp(knownAdapters, nameOrAdapter) ?
          `Adapter '${nameOrAdapter}' is not available in the build` :
          `Unknown adapter '${nameOrAdapter}'`
      );
    }

    if (!utils.isFunction(adapter)) {
      throw new TypeError('adapter is not a function');
    }

    return adapter;
  },
  adapters: knownAdapters
};

/**
 * Throws a `CanceledError` if cancellation has been requested.
 *
 * @param {Object} config The config that is to be used for the request
 *
 * @returns {void}
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }

  if (config.signal && config.signal.aborted) {
    throw new CanceledError(null, config);
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 *
 * @returns {Promise} The Promise to be fulfilled
 */
function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  config.headers = AxiosHeaders$1.from(config.headers);

  // Transform request data
  config.data = transformData.call(
    config,
    config.transformRequest
  );

  if (['post', 'put', 'patch'].indexOf(config.method) !== -1) {
    config.headers.setContentType('application/x-www-form-urlencoded', false);
  }

  const adapter = adapters.getAdapter(config.adapter || defaults$1.adapter);

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData.call(
      config,
      config.transformResponse,
      response
    );

    response.headers = AxiosHeaders$1.from(response.headers);

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData.call(
          config,
          config.transformResponse,
          reason.response
        );
        reason.response.headers = AxiosHeaders$1.from(reason.response.headers);
      }
    }

    return Promise.reject(reason);
  });
}

const headersToObject = (thing) => thing instanceof AxiosHeaders$1 ? thing.toJSON() : thing;

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 *
 * @returns {Object} New object resulting from merging config2 to config1
 */
function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  const config = {};

  function getMergedValue(target, source, caseless) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge.call({caseless}, target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  // eslint-disable-next-line consistent-return
  function mergeDeepProperties(a, b, caseless) {
    if (!utils.isUndefined(b)) {
      return getMergedValue(a, b, caseless);
    } else if (!utils.isUndefined(a)) {
      return getMergedValue(undefined, a, caseless);
    }
  }

  // eslint-disable-next-line consistent-return
  function valueFromConfig2(a, b) {
    if (!utils.isUndefined(b)) {
      return getMergedValue(undefined, b);
    }
  }

  // eslint-disable-next-line consistent-return
  function defaultToConfig2(a, b) {
    if (!utils.isUndefined(b)) {
      return getMergedValue(undefined, b);
    } else if (!utils.isUndefined(a)) {
      return getMergedValue(undefined, a);
    }
  }

  // eslint-disable-next-line consistent-return
  function mergeDirectKeys(a, b, prop) {
    if (prop in config2) {
      return getMergedValue(a, b);
    } else if (prop in config1) {
      return getMergedValue(undefined, a);
    }
  }

  const mergeMap = {
    url: valueFromConfig2,
    method: valueFromConfig2,
    data: valueFromConfig2,
    baseURL: defaultToConfig2,
    transformRequest: defaultToConfig2,
    transformResponse: defaultToConfig2,
    paramsSerializer: defaultToConfig2,
    timeout: defaultToConfig2,
    timeoutMessage: defaultToConfig2,
    withCredentials: defaultToConfig2,
    adapter: defaultToConfig2,
    responseType: defaultToConfig2,
    xsrfCookieName: defaultToConfig2,
    xsrfHeaderName: defaultToConfig2,
    onUploadProgress: defaultToConfig2,
    onDownloadProgress: defaultToConfig2,
    decompress: defaultToConfig2,
    maxContentLength: defaultToConfig2,
    maxBodyLength: defaultToConfig2,
    beforeRedirect: defaultToConfig2,
    transport: defaultToConfig2,
    httpAgent: defaultToConfig2,
    httpsAgent: defaultToConfig2,
    cancelToken: defaultToConfig2,
    socketPath: defaultToConfig2,
    responseEncoding: defaultToConfig2,
    validateStatus: mergeDirectKeys,
    headers: (a, b) => mergeDeepProperties(headersToObject(a), headersToObject(b), true)
  };

  utils.forEach(Object.keys(config1).concat(Object.keys(config2)), function computeConfigValue(prop) {
    const merge = mergeMap[prop] || mergeDeepProperties;
    const configValue = merge(config1[prop], config2[prop], prop);
    (utils.isUndefined(configValue) && merge !== mergeDirectKeys) || (config[prop] = configValue);
  });

  return config;
}

const VERSION = "1.2.3";

const validators$1 = {};

// eslint-disable-next-line func-names
['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach((type, i) => {
  validators$1[type] = function validator(thing) {
    return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
  };
});

const deprecatedWarnings = {};

/**
 * Transitional option validator
 *
 * @param {function|boolean?} validator - set to false if the transitional option has been removed
 * @param {string?} version - deprecated version / removed since version
 * @param {string?} message - some message with additional info
 *
 * @returns {function}
 */
validators$1.transitional = function transitional(validator, version, message) {
  function formatMessage(opt, desc) {
    return '[Axios v' + VERSION + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
  }

  // eslint-disable-next-line func-names
  return (value, opt, opts) => {
    if (validator === false) {
      throw new AxiosError(
        formatMessage(opt, ' has been removed' + (version ? ' in ' + version : '')),
        AxiosError.ERR_DEPRECATED
      );
    }

    if (version && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      // eslint-disable-next-line no-console
      console.warn(
        formatMessage(
          opt,
          ' has been deprecated since v' + version + ' and will be removed in the near future'
        )
      );
    }

    return validator ? validator(value, opt, opts) : true;
  };
};

/**
 * Assert object's properties type
 *
 * @param {object} options
 * @param {object} schema
 * @param {boolean?} allowUnknown
 *
 * @returns {object}
 */

function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== 'object') {
    throw new AxiosError('options must be an object', AxiosError.ERR_BAD_OPTION_VALUE);
  }
  const keys = Object.keys(options);
  let i = keys.length;
  while (i-- > 0) {
    const opt = keys[i];
    const validator = schema[opt];
    if (validator) {
      const value = options[opt];
      const result = value === undefined || validator(value, opt, options);
      if (result !== true) {
        throw new AxiosError('option ' + opt + ' must be ' + result, AxiosError.ERR_BAD_OPTION_VALUE);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw new AxiosError('Unknown option ' + opt, AxiosError.ERR_BAD_OPTION);
    }
  }
}

var validator = {
  assertOptions,
  validators: validators$1
};

const validators = validator.validators;

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 *
 * @return {Axios} A new instance of Axios
 */
class Axios {
  constructor(instanceConfig) {
    this.defaults = instanceConfig;
    this.interceptors = {
      request: new InterceptorManager$1(),
      response: new InterceptorManager$1()
    };
  }

  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  request(configOrUrl, config) {
    /*eslint no-param-reassign:0*/
    // Allow for axios('example/url'[, config]) a la fetch API
    if (typeof configOrUrl === 'string') {
      config = config || {};
      config.url = configOrUrl;
    } else {
      config = configOrUrl || {};
    }

    config = mergeConfig(this.defaults, config);

    const {transitional, paramsSerializer, headers} = config;

    if (transitional !== undefined) {
      validator.assertOptions(transitional, {
        silentJSONParsing: validators.transitional(validators.boolean),
        forcedJSONParsing: validators.transitional(validators.boolean),
        clarifyTimeoutError: validators.transitional(validators.boolean)
      }, false);
    }

    if (paramsSerializer !== undefined) {
      validator.assertOptions(paramsSerializer, {
        encode: validators.function,
        serialize: validators.function
      }, true);
    }

    // Set config.method
    config.method = (config.method || this.defaults.method || 'get').toLowerCase();

    let contextHeaders;

    // Flatten headers
    contextHeaders = headers && utils.merge(
      headers.common,
      headers[config.method]
    );

    contextHeaders && utils.forEach(
      ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
      (method) => {
        delete headers[method];
      }
    );

    config.headers = AxiosHeaders$1.concat(contextHeaders, headers);

    // filter out skipped interceptors
    const requestInterceptorChain = [];
    let synchronousRequestInterceptors = true;
    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
      if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
        return;
      }

      synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

      requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
    });

    const responseInterceptorChain = [];
    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
      responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
    });

    let promise;
    let i = 0;
    let len;

    if (!synchronousRequestInterceptors) {
      const chain = [dispatchRequest.bind(this), undefined];
      chain.unshift.apply(chain, requestInterceptorChain);
      chain.push.apply(chain, responseInterceptorChain);
      len = chain.length;

      promise = Promise.resolve(config);

      while (i < len) {
        promise = promise.then(chain[i++], chain[i++]);
      }

      return promise;
    }

    len = requestInterceptorChain.length;

    let newConfig = config;

    i = 0;

    while (i < len) {
      const onFulfilled = requestInterceptorChain[i++];
      const onRejected = requestInterceptorChain[i++];
      try {
        newConfig = onFulfilled(newConfig);
      } catch (error) {
        onRejected.call(this, error);
        break;
      }
    }

    try {
      promise = dispatchRequest.call(this, newConfig);
    } catch (error) {
      return Promise.reject(error);
    }

    i = 0;
    len = responseInterceptorChain.length;

    while (i < len) {
      promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
    }

    return promise;
  }

  getUri(config) {
    config = mergeConfig(this.defaults, config);
    const fullPath = buildFullPath(config.baseURL, config.url);
    return buildURL(fullPath, config.params, config.paramsSerializer);
  }
}

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method,
      url,
      data: (config || {}).data
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/

  function generateHTTPMethod(isForm) {
    return function httpMethod(url, data, config) {
      return this.request(mergeConfig(config || {}, {
        method,
        headers: isForm ? {
          'Content-Type': 'multipart/form-data'
        } : {},
        url,
        data
      }));
    };
  }

  Axios.prototype[method] = generateHTTPMethod();

  Axios.prototype[method + 'Form'] = generateHTTPMethod(true);
});

var Axios$1 = Axios;

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @param {Function} executor The executor function.
 *
 * @returns {CancelToken}
 */
class CancelToken {
  constructor(executor) {
    if (typeof executor !== 'function') {
      throw new TypeError('executor must be a function.');
    }

    let resolvePromise;

    this.promise = new Promise(function promiseExecutor(resolve) {
      resolvePromise = resolve;
    });

    const token = this;

    // eslint-disable-next-line func-names
    this.promise.then(cancel => {
      if (!token._listeners) return;

      let i = token._listeners.length;

      while (i-- > 0) {
        token._listeners[i](cancel);
      }
      token._listeners = null;
    });

    // eslint-disable-next-line func-names
    this.promise.then = onfulfilled => {
      let _resolve;
      // eslint-disable-next-line func-names
      const promise = new Promise(resolve => {
        token.subscribe(resolve);
        _resolve = resolve;
      }).then(onfulfilled);

      promise.cancel = function reject() {
        token.unsubscribe(_resolve);
      };

      return promise;
    };

    executor(function cancel(message, config, request) {
      if (token.reason) {
        // Cancellation has already been requested
        return;
      }

      token.reason = new CanceledError(message, config, request);
      resolvePromise(token.reason);
    });
  }

  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason) {
      throw this.reason;
    }
  }

  /**
   * Subscribe to the cancel signal
   */

  subscribe(listener) {
    if (this.reason) {
      listener(this.reason);
      return;
    }

    if (this._listeners) {
      this._listeners.push(listener);
    } else {
      this._listeners = [listener];
    }
  }

  /**
   * Unsubscribe from the cancel signal
   */

  unsubscribe(listener) {
    if (!this._listeners) {
      return;
    }
    const index = this._listeners.indexOf(listener);
    if (index !== -1) {
      this._listeners.splice(index, 1);
    }
  }

  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let cancel;
    const token = new CancelToken(function executor(c) {
      cancel = c;
    });
    return {
      token,
      cancel
    };
  }
}

var CancelToken$1 = CancelToken;

/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 *
 * @returns {Function}
 */
function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
}

/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 *
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
function isAxiosError(payload) {
  return utils.isObject(payload) && (payload.isAxiosError === true);
}

const HttpStatusCode = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
};

Object.entries(HttpStatusCode).forEach(([key, value]) => {
  HttpStatusCode[value] = key;
});

var HttpStatusCode$1 = HttpStatusCode;

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 *
 * @returns {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  const context = new Axios$1(defaultConfig);
  const instance = bind(Axios$1.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios$1.prototype, context, {allOwnKeys: true});

  // Copy context to instance
  utils.extend(instance, context, null, {allOwnKeys: true});

  // Factory for creating new instances
  instance.create = function create(instanceConfig) {
    return createInstance(mergeConfig(defaultConfig, instanceConfig));
  };

  return instance;
}

// Create the default instance to be exported
const axios = createInstance(defaults$1);

// Expose Axios class to allow class inheritance
axios.Axios = Axios$1;

// Expose Cancel & CancelToken
axios.CanceledError = CanceledError;
axios.CancelToken = CancelToken$1;
axios.isCancel = isCancel;
axios.VERSION = VERSION;
axios.toFormData = toFormData;

// Expose AxiosError class
axios.AxiosError = AxiosError;

// alias for CanceledError for backward compatibility
axios.Cancel = axios.CanceledError;

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};

axios.spread = spread;

// Expose isAxiosError
axios.isAxiosError = isAxiosError;

// Expose mergeConfig
axios.mergeConfig = mergeConfig;

axios.AxiosHeaders = AxiosHeaders$1;

axios.formToJSON = thing => formDataToJSON(utils.isHTMLForm(thing) ? new FormData(thing) : thing);

axios.HttpStatusCode = HttpStatusCode$1;

axios.default = axios;

module.exports = axios;
//# sourceMappingURL=axios.cjs.map


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var exports = __webpack_exports__;
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/

exports.__esModule = true;
var ApisearchUI_1 = __webpack_require__(/*! ./ApisearchUI */ "./src/ApisearchUI.ts");
exports["default"] = ApisearchUI_1["default"];

})();

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=apisearch-ui.js.map