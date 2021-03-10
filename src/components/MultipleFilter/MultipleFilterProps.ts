import {Repository} from "apisearch";
import {Query} from "apisearch";
import {Result} from "apisearch";

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
    formatData: Function;
    activeFirst: boolean;
    environmentId?: string;
    repository?: Repository;
    dirty?: boolean;
    currentResult?: Result;
    currentQuery?: Query;
    dictionary?: { [key: string]: string; };
}
