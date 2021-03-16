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
    environmentId?: string;
    repository?: Repository;
    store?: Store;
}
