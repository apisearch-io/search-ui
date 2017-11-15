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
import container from "./container";
import ApisearchUI from "./ApisearchUI";
import Store from "./Store";

/**
 * Apisearch Entry point
 */

/**
 * Bootstrapping
 *
 * @param appId
 * @param apiKey
 * @param options
 *
 * @returns {ApisearchUI}
 */
function bootstrap({
    appId,
    apiKey,
    options
}) {
    /**
     * Register apisearch dependencies
     */
    let apisearchClientServiceId = `apisearch_client_${appId}_${apiKey}`;
    container.register(apisearchClientServiceId, () => {
        return apisearch(appId, apiKey, options)
    });
    container.register('apisearch_store', () => {
        return new Store(
            container.get(apisearchClientServiceId)
        )
    });

    /**
     * Instance UI
     */
    const apisearchUI = new ApisearchUI(
        container.get(apisearchClientServiceId),
        container.get('apisearch_store')
    );

    /**
     * Register the store
     */
    dispatcher.register(
        apisearchUI.store.handleActions.bind(apisearchUI.store)
    );

    return apisearchUI;
}

module.exports = bootstrap;