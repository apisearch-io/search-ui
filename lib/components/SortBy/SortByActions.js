"use strict";
exports.__esModule = true;
/**
 * SortBy actions
 */
var apisearch_1 = require("apisearch");
var cloneDeep = require("clone-deep");
var Constants_1 = require("../../Constants");
var Container_1 = require("../../Container");
/**
 * ON change search action
 *
 * @param environmentId
 * @param currentQuery
 * @param repository
 * @param selectedOption
 */
function onChangeSearchAction(environmentId, currentQuery, repository, selectedOption) {
    var clonedQuery = cloneDeep(currentQuery);
    var filterData = splitQueryValue(selectedOption);
    clonedQuery
        .sortBy(apisearch_1["default"]
        .createEmptySortBy()
        .byFieldValue(filterData.field, filterData.sort));
    clonedQuery.page = 1;
    var dispatcher = Container_1["default"].get(Constants_1.APISEARCH_DISPATCHER + "__" + environmentId);
    repository
        .query(clonedQuery)
        .then(function (result) {
        dispatcher.dispatch({
            type: "RENDER_FETCHED_DATA",
            payload: {
                query: clonedQuery,
                result: result
            }
        });
    });
}
exports.onChangeSearchAction = onChangeSearchAction;
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
