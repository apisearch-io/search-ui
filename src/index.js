/**
 * @jsx h
 */

/**
 * Styles
 */
import 'styles/apisearch-ui.sass';

/**
 * Locals
 */
import container from "./container";
import {bootstrap} from "./bootstrap";
import {createEnvironmentId} from "./environment";
import {widgets} from "./widgets/widgets";
import {APISEARCH_DISPATCHER, APISEARCH_UI} from "./constants";

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
    indexId,
    token,
    options
}) {
    /**
     * Build environment Id
     */
    const environmentId = createEnvironmentId();

    /**
     * Bootstrapping ApisearchUI application
     */
    bootstrap({
        environmentId,
        appId,
        indexId,
        token,
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
     * Add widgets
     */
    apisearchUI.widgets = widgets;

    /**
     * Return ApisearchUI instance
     */
    return apisearchUI;
};