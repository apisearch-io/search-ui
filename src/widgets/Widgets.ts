import clearFilters from "./ClearFilters";
import information from "./Information";
import multipleFilter from "./MultipleFilter";
import pagination from "./Pagination";
import result from "./Result";
import searchInput from "./SearchInput";
import sortBy from "./SortBy";

/**
 * Widget factories
 */
export default {
    searchInput: searchInput,
    clearFilters: clearFilters,
    multipleFilter: multipleFilter,
    sortBy: sortBy,
    information: information,
    result: result,
    pagination: pagination,
};
