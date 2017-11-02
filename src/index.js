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
 * @param appId
 * @param apiKey
 * @param options
 *
 * @returns {ApisearchUI}
 */
module.exports = function({
    appId,
    apiKey,
    options
}) {
    const apisearchClient = apisearch(appId, apiKey, options);
    const apisearchUI = new ApisearchUI(
        apisearchClient
    );

    dispatcher.register(
        apisearchUI.handleActions.bind(apisearchUI)
    );

    return apisearchUI;
};