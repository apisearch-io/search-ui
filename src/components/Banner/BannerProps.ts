import {Repository} from "apisearch";
import Store from "../../Store";

/**
 * BannerProps
 */
export interface BannerProps {
    target: any;
    breakingPointSize: number;
    position: string;
    imagePrefix: string;
    environmentId?: string;
    repository?: Repository;
    store?: Store;
    dictionary?: { [key: string]: string; };
}
