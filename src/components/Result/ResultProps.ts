import {Repository} from "apisearch";
import {Query} from "apisearch";
import {Result} from "apisearch";
import {ItemUUID} from "apisearch";

/**
 * Created by mmoreram on 9/07/18.
 */
export interface ResultProps {
    target: any;
    fields: string[];
    itemsPerPage: number;
    highlightsEnabled: boolean;
    suggestionsEnabled: boolean|number;
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
    fadeInSelector: string,
    environmentId?: string;
    repository?: Repository;
    dirty?: boolean;
    currentResult?: Result;
    currentQuery?: Query;
    currentVisibleResults?: boolean;
    infiniteScroll?: boolean|number;
    fieldsConciliation: string[];
}
