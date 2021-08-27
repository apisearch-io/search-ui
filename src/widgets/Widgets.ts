import checkboxFilter from "./CheckboxFilter";
import clearFilters from "./ClearFilters";
import information from "./Information";
import multipleFilter from "./MultipleFilter";
import pagination from "./Pagination";
import rangeFilter from "./RangeFilter";
import reload from "./Reload";
import result from "./Result";
import searchInput from "./SearchInput";
import snapshot from "./Snapshot";
import sortBy from "./SortBy";
import suggestions from "./Suggestions";

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
    snapshot: snapshot,
    suggestions: suggestions
};
