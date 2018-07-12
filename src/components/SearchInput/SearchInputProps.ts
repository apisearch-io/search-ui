import {Repository} from "apisearch";
import {Query} from "apisearch";
import {Result} from "apisearch";

/**
 * Created by mmoreram on 9/07/18.
 */
export interface SearchInputProps {
    target: any;
    placeholder: string;
    autofocus: boolean;
    startSearchOn: number;
    clearSearch: boolean;
    withContainer: boolean;
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
        spellcheck?: number,
    };
}
