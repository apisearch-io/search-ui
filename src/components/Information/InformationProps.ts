import {Repository} from "apisearch";
import {Query} from "apisearch";
import {Result} from "apisearch";

/**
 * InformationProps
 */
export interface InformationProps {
    target: any;
    classNames: {
        container: string,
    };
    template: {
        container: string,
    };
    formatData: Function;
    environmentId?: string;
    repository?: Repository;
    dirty?: boolean;
    currentResult?: Result;
    currentQuery?: Query;
}
