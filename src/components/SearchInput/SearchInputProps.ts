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
    withContainer: boolean;
    searchableFields: string[];
    speechRecognition: boolean;
    queryOperator: string;
    classNames: {
        container: string,
        input: string,
        clearSearch: string,
    };
    template: {
        clearSearch: string,
        speechRecognition: string,
    };
    environmentId?: string;
    repository?: Repository;
    store?: Store;
    htmlNodeInheritProps?: {
        autocomplete?: string,
        spellcheck?: boolean,
    };
    dictionary?: { [key: string]: string; };
    config: any;
}
