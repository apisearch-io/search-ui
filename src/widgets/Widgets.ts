import {clearFilters} from "./ClearFilters";
import {information} from "./Information";
import {multipleFilter} from "./MultipleFilter";
import {pagination} from "./Pagination";
import {result} from "./Result";
import {searchInput} from "./SearchInput";
import {sortBy} from "./SortBy";

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
    pagination,
};

export default widgets;
