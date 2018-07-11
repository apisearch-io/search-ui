import {Repository} from "apisearch";
import {Query} from "apisearch";
import {Result} from "apisearch";

/**
 * Created by mmoreram on 9/07/18.
 */
export interface SortByProps {
    target:any,
    classNames: {
        container: string,
        select: string
    },
    options: any,
    environmentId?: string,
    repository?: Repository,
    dirty?: boolean,
    currentResult?: Result,
    currentQuery?: Query
}