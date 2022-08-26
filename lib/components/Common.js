"use strict";
exports.__esModule = true;
exports.onWordClickAction = void 0;
<<<<<<< HEAD
=======
var apisearch_1 = require("apisearch");
>>>>>>> WIP
var Clone_1 = require("./Clone");
var Container_1 = require("../Container");
var Constants_1 = require("../Constants");
/**
<<<<<<< HEAD
=======
 *
>>>>>>> WIP
 * @param environmentId
 * @param currentQuery
 * @param repository
 * @param word
<<<<<<< HEAD
 */
function onWordClickAction(environmentId, currentQuery, repository, word) {
    var clonedQuery = Clone_1["default"].object(currentQuery);
    clonedQuery.filters._query.values = [word];
    clonedQuery.page = 1;
=======
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
>>>>>>> WIP
    var dispatcher = Container_1["default"].get(Constants_1.APISEARCH_DISPATCHER + "__" + environmentId);
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
