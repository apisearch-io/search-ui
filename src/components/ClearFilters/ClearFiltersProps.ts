import {Repository} from "apisearch";
import Store from "../../Store";

/**
 * ClearFiltersProps
 */
export interface ClearFiltersProps {
    target: any;
    classNames: {
        container: string,
    };
    template: {
        container: string,
    };
    environmentId?: string;
    repository?: Repository;
    store?: Store;
    dictionary?: { [key: string]: string; };
}
