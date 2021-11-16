"use strict";
exports.__esModule = true;
var SortByHelper_1 = require("./components/SortBy/SortByHelper");
var apisearch_1 = require("apisearch");
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
