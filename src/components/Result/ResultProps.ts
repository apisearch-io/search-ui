import {Repository} from "apisearch";
import {Query} from "apisearch";
import {Result} from "apisearch";
import {ItemUUID} from "apisearch";

/**
 * Created by mmoreram on 9/07/18.
 */
export interface ResultProps {
    target: any;
    itemsPerPage: number;
    highlightsEnabled: boolean;
    promote: ItemUUID[];
    exclude: ItemUUID[];
    filter: Function,
    classNames: {
        container: string,
        itemsList: string,
        placeholder: string,
    };
    template: {
        itemsList: string,
        placeholder: null,
    };
    formatData: Function;
    environmentId?: string;
    repository?: Repository;
    dirty?: boolean;
    currentResult?: Result;
    currentQuery?: Query;
}
