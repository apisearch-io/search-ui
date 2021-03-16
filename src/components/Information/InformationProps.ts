import {Repository} from "apisearch";
import Store from "../../Store";

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
    store?: Store;
    dictionary?: { [key: string]: string; };
}
