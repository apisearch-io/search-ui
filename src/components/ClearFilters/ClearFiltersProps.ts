import {Repository} from "apisearch";
import {Query} from "apisearch";
import {Result} from "apisearch";

/**
 * ClearFiltersProps
 */
export interface ClearFiltersProps {
    target:any,
    classNames: {
        container: string
    },
    template: {
        container: string
    },
    environmentId?: string,
    repository?: Repository,
    dirty?: boolean,
    currentResult?: Result,
    currentQuery?: Query
}
