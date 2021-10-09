/**
 * RangeFilterState
 */
import {Aggregation} from "apisearch";

export interface RangeFilterState {
    from: number|null;
    to: number|null;
    min: number|null;
    max: number|null;
    visible: boolean;
}
