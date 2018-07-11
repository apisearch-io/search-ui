import {Dispatcher} from 'flux';

import ApisearchUI from "./ApisearchUI";
import Store from "./Store";
import container from "./Container";
import apisearch from "apisearch";

import {
    APISEARCH_REPOSITORY,
    APISEARCH_STORE,
    APISEARCH_UI,
    APISEARCH_DISPATCHER
} from "./Constants";

/**
 * Bootstrap application
 *
 * @param environmentId
 * @param appId
 * @param indexId
 * @param token
 * @param options
 */
export function bootstrap(
   environmentId:string,
   appId:string,
   indexId:string,
   token:string,
   options:any
) {
    const repositoryId = `${APISEARCH_REPOSITORY}__${appId}_${token}_${token}`;
    const storeId = `${APISEARCH_STORE}__${environmentId}`;
    const dispatcherId = `${APISEARCH_DISPATCHER}__${environmentId}`;
    const asuiId = `${APISEARCH_UI}__${environmentId}`;

    /**
     * Register Apisearch repository
     */
    container.register(repositoryId, () => {
        return apisearch.createRepository({
            app_id: appId,
            index_id: indexId,
            token: token,
            options: options
        })
    });

    /**
     * Register apisearch store
     */
    container.register(storeId, () => {
        return new Store()
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
            container.get(storeId)
        );
    });
}
