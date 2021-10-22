/**
 * @param selectedItem
 * @param currentItems
 */
export function wasElementRecentlySelected(
    selectedItem: string,
    currentItems: string[],
) {
    return !currentItems.some((item) => item === selectedItem);
}

/**
 * Manage filter items
 *
 * If an item is on the list, remove it
 * else, add it!
 *
 * @param selectedItem
 * @param currentItems
 * @param wasElementRecentlySelected
 * @param deleteIfWasRemoved
 *
 * @returns {any}
 */
export function manageCurrentFilterItems(
    selectedItem: string,
    currentItems: string[],
    wasElementRecentlySelected: boolean,
    deleteIfWasRemoved: boolean,
) {
    if (!wasElementRecentlySelected) {
        return deleteIfWasRemoved
            ? currentItems.filter((item) => item !== selectedItem)
            : currentItems;
    } else {
        return [
            ...currentItems,
            selectedItem,
        ];
    }
}

/**
 * @param query
 * @param filterName
 * @param withCurrent
 */
export function getShadowFilterValuesFromQuery(
    query,
    filterName: string,
    withCurrent: boolean,
): string[] {
    const fields: string[] = [];
    if (isFilterAvailable(query, filterName, 6)) {
        const fieldName = query.filters[filterName].field.substr(17);
        const fieldNameParts = fieldName.split("_");
        const currentLevel = parseInt(fieldNameParts[fieldNameParts.length - 1], 10);
        const fieldNameWithoutLevel = fieldNameParts.slice(0, fieldNameParts.length - 1).join("_");

        for (let it = 1; it < currentLevel; it++) {
            const iterationFieldName = fieldNameWithoutLevel + "_" + it;
            if (query.filters[iterationFieldName] !== undefined) {
                fields.push(query.filters[iterationFieldName].values[0]);
            }
        }

        if (withCurrent) {
            fields.push(query.filters[filterName].values[0]);
        }
    }

    return fields;
}

/**
 * @param query
 * @param filterName
 * @param applicationType
 */
export function isFilterAvailable(
    query: any,
    filterName: string,
    applicationType: number|null = null,
): boolean {
    return (
        query.filters !== undefined &&
        query.filters !== null &&
        typeof query.filters === "object" &&
        query.filters[filterName] !== undefined &&
        query.filters[filterName] !== null &&
        (
            applicationType === null ||
            query.filters[filterName].applicationType === applicationType ||
            query.filters[filterName].application_type === applicationType
        )
    );
}

/**
 * @param query
 * @param filterName
 * @param applicationType
 */
export function getFilterValuesFromQuery(
    query,
    filterName,
    applicationType: number|null = null,
): string[] {
    return isFilterAvailable(query, filterName, applicationType)
        ? query.filters[filterName].values
        : [];
}

/**
 * @param filter
 */
export function isLeveledFilter(filter): boolean {
    return filter.application_type === 6 ||
        filter.applicationType === 6;
}
