import {Repository} from "apisearch";
import Store from "../../Store";

/**
 * SuggestionsFilterProps
 */
export interface SuggestionsFilterProps {
    target: string;
    numberOfSuggestions: number;
    firstSuggestionCategories: boolean;
    classNames: {
        container: string,
        top: string,
        item: string,
    };
    template: {
        top: string,
        item: string,
        itemWithCategory: string,
    };
    environmentId?: string;
    repository?: Repository;
    store?: Store;
    dictionary?: { [key: string]: string; };
}
