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
    showGlobalFilterClear: boolean;
    showIndividualFilterValueClear: boolean;
    template: {
        container: string,
        filter: string,
        filter_price: string,
        filter_price_only_from: string,
        filter_price_only_to: string,
    };
    environmentId?: string;
    repository?: Repository;
    store?: Store;
    dictionary?: { [key: string]: string; };
}
