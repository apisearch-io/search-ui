import {Dispatcher} from "flux";

import apisearch from "apisearch";
import ApisearchUI from "./ApisearchUI";
import container from "./Container";
import Store from "./Store";

import {
    APISEARCH_DISPATCHER,
    APISEARCH_REPOSITORY,
    APISEARCH_STORE,
    APISEARCH_UI,
} from "./Constants";

/**
 * Bootstrap application
 *
 * @param environmentId
 * @param config
 */
export function bootstrap(
    environmentId: string,
    config: any,
) {
    const configAsString = JSON.stringify(config);
    const repositoryId = `${APISEARCH_REPOSITORY}__${configAsString}`;
    const storeId = `${APISEARCH_STORE}__${environmentId}`;
    const dispatcherId = `${APISEARCH_DISPATCHER}__${environmentId}`;
    const asuiId = `${APISEARCH_UI}__${environmentId}`;

    /**
     * Register Apisearch repository
     */
    container.register(repositoryId, () => {
        return apisearch.createRepository(config);
    });

    /**
     * Register apisearch store
     */
    container.register(storeId, () => {
        return new Store();
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
            container.get(repositoryId),
            container.get(storeId),
        );
    });
}
