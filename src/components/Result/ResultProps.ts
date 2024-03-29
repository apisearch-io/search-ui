import {ItemUUID, Repository} from "apisearch";
import Store from "../../Store";

/**
 * Created by mmoreram on 9/07/18.
 */
export interface ResultProps {
    target: any;
    fields: string[];
    itemsPerPage: number;
    highlightsEnabled: boolean;
    promote: ItemUUID[];
    exclude: ItemUUID[];
    filter: (Query) => void;
    classNames: {
        container: string,
        itemsList: string,
        item: string,
        noResults: string,
        placeholder: string,
    };
    template: {
        itemsList: string,
        item: string,
        noResults: string,
        placeholder: null,
        alternative_title: string,
        alternative_all_results: string,
        next_page_button: string,
        redirection: string,
    };
    formatData: (Item) => {Item};
    fadeInSelector: string;
    environmentId?: string;
    repository?: Repository;
    store?: Store;
    dictionary?: { [key: string]: string; };
    currentVisibleResults?: boolean;
    infiniteScroll?: boolean|number;
    infiniteScrollButton?: boolean|number;
    fieldsConciliation: string[];
    minScore: number;
}
