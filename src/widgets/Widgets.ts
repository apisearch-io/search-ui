import clearFilters from "./ClearFilters";
import information from "./Information";
import multipleFilter from "./MultipleFilter";
import pagination from "./Pagination";
import result from "./Result";
import searchInput from "./SearchInput";
import sortBy from "./SortBy";
import checkboxFilter from "./CheckboxFilter";
import rangeFilter from "./RangeFilter";
import reload from "./Reload";

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
    checkboxFilter: checkboxFilter,
    rangeFilter: rangeFilter,
    reload: reload,
};
