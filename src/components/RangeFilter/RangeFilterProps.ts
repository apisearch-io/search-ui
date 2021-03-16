import {Repository} from "apisearch";
import Store from "../../Store";

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
    callback: (from: number, to:number) => void;
    environmentId?: string;
    repository?: Repository;
    store?: Store;
}
