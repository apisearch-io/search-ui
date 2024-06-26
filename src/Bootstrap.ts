import {Dispatcher} from "./Dispatcher";
import apisearch from "apisearch";
import ApisearchUI from "./ApisearchUI";
import container from "./Container";
import Store from "./Store";

import {
    APISEARCH_DISPATCHER,
    APISEARCH_REPOSITORY,
    APISEARCH_STORE,
    APISEARCH_UI,
    APISEARCH_CONFIG,
} from "./Constants";

/**
 * @param environmentId
 * @param config
 * @param hash
 */
export function bootstrap(
    environmentId: string,
    config: any,
    hash: string,
) {
    const configAsString = JSON.stringify(config);
    const repositoryId = `${APISEARCH_REPOSITORY}__${configAsString}`;
    const storeId = `${APISEARCH_STORE}__${environmentId}`;
    const dispatcherId = `${APISEARCH_DISPATCHER}__${environmentId}`;
    const configId = `${APISEARCH_CONFIG}__${environmentId}`;
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
        return new Store(
            config.coordinate,
            config.options.min_score,
            hash,
            config.user_id ?? "",
            config.options.site ?? "",
            config.options.language ?? "",
            config.options.device ?? "",
            config.options.user_type ?? "",
            config.options.generate_random_session_uuid ?? false,
            config.options.initial_state ?? {},
        );
    });

    /**
     * Register an event dispatcher
     */
    container.register(dispatcherId, () => {
        return new Dispatcher();
    });

    /**
     * Register Apisearch config
     */
    container.register(configId, () => {
        return config;
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
