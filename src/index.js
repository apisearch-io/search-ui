/**
 * @jsx h
 */

/**
 * Vendors
 */
import apisearch from 'apisearch';

/**
 * Locals
 */
import dispatcher from "./dispatcher";
import ApisearchUI from "./ApisearchUI";


/**
 * Apisearch Entry Point
 *
 * @param apiKey
 * @returns {ApisearchUI}
 */
module.exports = function(apiKey) {
    const apisearchClient = apisearch(apiKey);
    const apisearchUI = new ApisearchUI(
        apisearchClient
    );

    dispatcher.register(
        apisearchUI.handleActions.bind(apisearchUI)
    );

    return apisearchUI;
};