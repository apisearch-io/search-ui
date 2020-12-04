/**
 * Location state
 */
import {Query, Result} from "apisearch";

/**
 * Location state
 */
export interface LocationState {
    query: Query;
    result: Result;
    visibleResults: boolean|undefined
}


export function isLocationState(object): object is LocationState {
    const myInterface = object as LocationState;

    if (myInterface === null) {
        return false;
    }

    return (
        (myInterface.query !== undefined) &&
        (myInterface.result !== undefined)
    );
}
