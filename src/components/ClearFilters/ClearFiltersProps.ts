import {Repository} from "apisearch";
import Store from "../../Store";

/**
 * ClearFiltersProps
 */
export interface ClearFiltersProps {
    target: any;
    classNames: {
        container: string,
        filter: string,
        filtersList: string,
    };
    showIndividualFilterClear: boolean;
    template: {
        container: string,
        filter: string,
    };
    environmentId?: string;
    repository?: Repository;
    store?: Store;
    dictionary?: { [key: string]: string; };
}
