import {Repository} from "apisearch";
import Store from "../../Store";

/**
 * PriorityFilterProps
 */
export interface PriorityFilterProps {
    target: any;
    filters: string[];
    template: {
        top: string,
        item: string,
    };
    environmentId?: string;
    repository?: Repository;
    store?: Store;
    dictionary?: { [key: string]: string; };
}
