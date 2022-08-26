import {Repository} from "apisearch";
import Store from "../../Store";

/**
 * MultipleFilterProps
 */
export interface MultipleFilterProps {
    target: any;
    filterName: string;
    filterField: string;
    aggregationField: string;
    applicationType: number;
    fetchLimit: number;
    viewLimit: number;
    sortBy: [string, string];
    ranges: object;
    labels: object;
    classNames: {
        container: string,
        top: string,
        itemsList: string,
        item: string,
        active: string,
        showMoreContainer: string,
    };
    template: {
        top: string,
        item: string,
        showMore: string,
        showLess: string,
    };
    formatData: (item) => void;
    activeFirst: boolean;
    promoted: string[];
    dynamicSearch: boolean;
    dynamicSearchPlaceholder: string;
    environmentId?: string;
    repository?: Repository;
    store?: Store;
    dictionary?: { [key: string]: string; };
}
