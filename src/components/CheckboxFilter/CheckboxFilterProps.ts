import {Repository} from "apisearch";
import {Query} from "apisearch";
import {Result} from "apisearch";

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
    dirty?: boolean;
    currentResult?: Result;
    currentQuery?: Query;
}
