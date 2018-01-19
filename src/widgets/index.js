import {clearFilters} from "./clearFilters";
import {information} from "./information";
import {result} from "./result";
import {multipleFilter} from "./multipleFilter";
import {simpleSearch} from "./simpleSearch";
import {sortBy} from "./sortBy";
import {suggestedSearch} from "./suggestedSearch";
import {pagination} from "./pagination";

/**
 * Widget factories
 */
export const widgets = {
    simpleSearch,
    suggestedSearch,
    clearFilters,
    multipleFilter,
    sortBy,
    information,
    result,
    pagination
};