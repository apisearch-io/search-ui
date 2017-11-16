/**
 * @jsx h
 */

import {bootstrap} from "./app/bootstrap";
import container from "./app/Container";
import {APISEARCH_DISPATCHER, APISEARCH_UI} from "./app/constants";

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
     * Bootstrapping ApisearchUI application
     */
    bootstrap({
        environmentId,
        appId,
        apiKey,
        options
    });

    /**
     * Register handleActions method (store reducer)
     * into the event dispatcher
     */
    const apisearchUI = container.get(`${APISEARCH_UI}__${environmentId}`);
    const dispatcher = container.get(`${APISEARCH_DISPATCHER}__${environmentId}`);
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