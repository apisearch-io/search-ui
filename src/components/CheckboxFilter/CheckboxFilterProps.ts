import {Repository} from "apisearch";
import Store from "../../Store";

/**
 * CheckboxFilterProps
 */
export interface CheckboxFilterProps {
    target: string;
    filterName: string;
    filterField: string;
    label?: string;
    filterValue?: string;
    classNames: {
        container: string,
        top: string,
        item: string,
        active: string,
    };
    template: {
        top: string,
        item: string,
    };
    environmentId?: string;
    repository?: Repository;
    store?: Store;
    dictionary?: { [key: string]: string; };
}
