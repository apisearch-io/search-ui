import {Repository} from "apisearch";
import {Query} from "apisearch";
import {Result} from "apisearch";

/**
 * RangeFilterProps
 */
export interface RangeFilterProps {
    target: any;
    filterName: string;
    filterField: string;
    minValue: number;
    maxValue: number;
    from: {
        class: string,
        attributes: any,
        initialValue: number
    };
    to: {
        class: string,
        attributes: any,
        initialValue: number
    };
    environmentId?: string;
    repository?: Repository;
    dirty?: boolean;
    currentResult?: Result;
    currentQuery?: Query;
}
