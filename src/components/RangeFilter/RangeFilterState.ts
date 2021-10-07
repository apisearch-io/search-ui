/**
 * RangeFilterState
 */
import {Aggregation} from "apisearch";

export interface RangeFilterState {
    from: number|null;
    forcedFrom: number|null;
    to: number|null;
    forcedTo: number|null;
    min: number|null;
    max: number|null;
}
