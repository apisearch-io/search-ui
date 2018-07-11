import {Repository} from "apisearch";
import {Query} from "apisearch";
import {Result} from "apisearch";

/**
 * Created by mmoreram on 9/07/18.
 */
export interface PaginationProps {
    target:any,
    padding: number,
    goFirstLast: boolean,
    classNames: {
        container: string,
        item: string,
        active: string,
        disabled: string,
        next: string,
        first: string,
        previous: string,
        last: string
    },
    template: {
        item: string,
        next: string,
        previous: string,
        first: string,
        last: string
    }
    environmentId?: string,
    repository?: Repository,
    dirty?: boolean,
    currentResult?: Result,
    currentQuery?: Query
}
