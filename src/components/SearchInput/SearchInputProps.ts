import {Repository} from "apisearch";
import {Query} from "apisearch";
import {Result} from "apisearch";

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
    dirty?: boolean;
    currentResult?: Result;
    currentQuery?: Query;
    htmlNodeInheritProps?: {
        autocomplete?: string,
        spellcheck?: boolean,
    };
}
