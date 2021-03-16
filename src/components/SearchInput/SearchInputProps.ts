import {Repository} from "apisearch";
import Store from "../../Store";

/**
 * Search Input Props
 */
export interface SearchInputProps {
    target: any;
    placeholder: string;
    autofocus: boolean;
    autocomplete: boolean;
    startSearchOn: number;
    clearSearch: boolean;
    initialSearch: string;
    withContainer: boolean;
    searchableFields: string[],
    classNames: {
        container: string,
        input: string,
        clearSearch: string,
    };
    template: {
        clearSearch: string,
    };
    environmentId?: string;
    repository?: Repository;
    store?: Store;
    htmlNodeInheritProps?: {
        autocomplete?: string,
        spellcheck?: boolean,
    };
    dictionary?: { [key: string]: string; }
}
