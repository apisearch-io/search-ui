/**
 * RangeFilterState
 */
import {Aggregation} from "apisearch";

export interface RangeFilterState {
    from: number|null;
    to: number|null;
    min: number|null;
    max: number|null;
    currency_placeholder: string|null;
    visible: boolean;
}
