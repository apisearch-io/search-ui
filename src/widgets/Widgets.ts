import {clearFilters} from "./ClearFilters";
import {information} from "./Information";
import {result} from "./Result";
import {multipleFilter} from "./MultipleFilter";
import {searchInput} from "./SearchInput";
import {sortBy} from "./SortBy";
import {pagination} from "./Pagination";

/**
 * Widget factories
 */
const widgets = {
    searchInput,
    clearFilters,
    multipleFilter,
    sortBy,
    information,
    result,
    pagination
};

export default widgets;