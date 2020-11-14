import {applySortByToQuery} from "./components/SortBy/SortByHelper"
import {Query} from "apisearch";

/**
 * ApisearchUI class
 */
export default class ApisearchHelper {

    /**
     * Click
     *
     * @param query
     * @param sort_by
     *
     * @return {any}
     */
    public sortBy(
        query: Query,
        sort_by: string,
    )
    {
        applySortByToQuery(query, sort_by);
    }
}
