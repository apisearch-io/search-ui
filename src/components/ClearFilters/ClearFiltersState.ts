/**
 * ClearFiltersState
 */
export interface ClearFiltersState {
    showClearFilters: boolean;
    appliedFilters: {filter: string, num: number, values: string[]}[];
}
