import {Repository} from "apisearch";
import {Query} from "apisearch";
import {Result} from "apisearch";

/**
 * SortByProps
 */
export interface SortByProps {
    target: any;
    classNames: {
        container: string,
        select: string,
    };
    options: any;
    environmentId?: string;
    repository?: Repository;
    dirty?: boolean;
    currentResult?: Result;
    currentQuery?: Query;
}
