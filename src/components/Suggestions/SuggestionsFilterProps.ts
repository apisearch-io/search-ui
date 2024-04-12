import {Repository} from "apisearch";
import Store from "../../Store";

/**
 * SuggestionsFilterProps
 */
export interface SuggestionsFilterProps {
    target: string;
    numberOfSuggestions: number;
    classNames: {
        container: string,
        top: string,
        item: string,
    };
    template: {
        top: string,
        item: string,
        category_item: string,
    };
    categoryField?: string;
    categoryName?: string;
    environmentId?: string;
    repository?: Repository;
    store?: Store;
    dictionary?: { [key: string]: string; };
}
