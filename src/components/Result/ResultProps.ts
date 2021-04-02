import {Repository} from "apisearch";
import {ItemUUID} from "apisearch";
import Store from "../../Store";

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
    filter: (Query) => void,
    classNames: {
        container: string,
        itemsList: string,
        placeholder: string,
    };
    template: {
        itemsList: string,
        placeholder: null,
    };
    formatData: (Item) => {Item},
    fadeInSelector: string,
    environmentId?: string;
    repository?: Repository;
    store?: Store;
    dictionary?: { [key: string]: string; };
    currentVisibleResults?: boolean;
    infiniteScroll?: boolean|number;
    fieldsConciliation: string[];
    minScore: number;
}
