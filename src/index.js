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
import container from "./container";
import ApisearchUI from "./ApisearchUI";
import Store from "./Store";
import { Dispatcher } from 'flux';


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
module.exports = function ({
    appId,
    apiKey,
    options
}) {
    /**
     * Build environment Id
     */
    const environmentId = `env_${Math.ceil(Math.random() * (9999999 - 1) + 1)}`;

    /**
     * Bootstrapping ApisearchUI Services
     */
    bootstrap({environmentId, appId, apiKey, options});

    /**
     * Bind store reducer to the dispatcher
     */
    const apisearchUI = container.get(`apisearch_ui--${environmentId}`);
    const dispatcher = container.get(`apisearch_dispatcher--${environmentId}`);

    dispatcher.register(
        apisearchUI.store.handleActions.bind(
            apisearchUI.store
        )
    );

    /**
     * Return ApisearchUI instance
     */
    return apisearchUI;
};

/**
 * Bootstrap application
 */
function bootstrap({
    environmentId,
    appId,
    apiKey,
    options
}) {
    const clientId = `apisearch_client--${appId}_${apiKey}`;
    const storeId = `apisearch_store--${environmentId}`;
    const dispatcherId = `apisearch_dispatcher--${environmentId}`;
    const asuiId = `apisearch_ui--${environmentId}`;

    /**
     * Register Apisearch client
     */
    container.register(clientId, () => {
        return apisearch(
            appId,
            apiKey,
            options
        )
    });

    /**
     * Register apisearch store
     */
    container.register(storeId, () => {
        return new Store(
            container.get(clientId)
        )
    });

    /**
     * Register an event dispatcher
     */
    container.register(dispatcherId, () => {
        return new Dispatcher();
    });

    /**
     * Apisearch UI Instance
     */
    container.register(asuiId, () => {
        return new ApisearchUI(
            environmentId,
            container.get(clientId),
            container.get(storeId)
        );
    });

    console.log(container)
}