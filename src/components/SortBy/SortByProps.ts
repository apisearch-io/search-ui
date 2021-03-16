import {Repository} from "apisearch";
import Store from "../../Store";

/**
 * SortByProps
 */
export interface SortByProps {
    target: any;
    classNames: {
        container: string,
        select: string,
    };
    options: any;
    environmentId?: string;
    repository?: Repository;
    store?: Store;
}
