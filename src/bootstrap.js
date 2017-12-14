import { Dispatcher } from 'flux';

import ApisearchUI from "./app/ApisearchUI";
import apisearch from 'apisearch';
import Store from "./app/Store";
import container from "./container";
import {
    APISEARCH_CLIENT,
    APISEARCH_STORE,
    APISEARCH_UI,
    APISEARCH_DISPATCHER
} from "./constants";

/**
 * Bootstrap application
 */
export function bootstrap({
   environmentId,
   appId,
   index,
   token,
   options
}) {
    const clientId = `${APISEARCH_CLIENT}__${appId}_${token}_${token}`;
    const storeId = `${APISEARCH_STORE}__${environmentId}`;
    const dispatcherId = `${APISEARCH_DISPATCHER}__${environmentId}`;
    const asuiId = `${APISEARCH_UI}__${environmentId}`;

    /**
     * Register Apisearch client
     */
    container.register(clientId, () => {
        return apisearch({
            appId,
            index,
            token,
            options
        })
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
}
