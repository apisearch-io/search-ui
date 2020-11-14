"use strict";
exports.__esModule = true;
exports.onChangeSearchAction = exports.initialSortBySetup = void 0;
var cloneDeep = require("clone-deep");
var Constants_1 = require("../../Constants");
var Container_1 = require("../../Container");
var SortByHelper_1 = require("./SortByHelper");
/**
 * Initial sortBy
 *
 * @param environmentId
 * @param currentQuery
 * @param initialOption
 */
function initialSortBySetup(environmentId, currentQuery, initialOption) {
    var dispatcher = Container_1["default"].get(Constants_1.APISEARCH_DISPATCHER + "__" + environmentId);
    var clonedQuery = cloneDeep(currentQuery);
    SortByHelper_1.applySortByToQuery(clonedQuery, initialOption);
    clonedQuery.page = 1;
    dispatcher.dispatch({
        type: "UPDATE_APISEARCH_SETUP",
        payload: {
            query: clonedQuery
        }
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
    var clonedQuery = cloneDeep(currentQuery);
    SortByHelper_1.applySortByToQuery(clonedQuery, selectedOption);
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
    })["catch"](function (error) {
        // Do nothing
    });
}
exports.onChangeSearchAction = onChangeSearchAction;
