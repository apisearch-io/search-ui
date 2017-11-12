
/**
 * Simple object to array
 *
 * @param object
 * @returns {Array}
 */
export function simpleObjectToArray(object) {
    return Object
        .keys(object)
        .map(key => object[key])
    ;
}

/**
 * Export the aggregations object to an array of items
 *
 * @param object
 * @returns {Array}
 */
export function aggregationsObjectToArray(object) {
    return Object
        .keys(object)
        .map(key => {
            return object[key] = {
                ...object[key],
                __key: key
            };
        })
    ;
}

export function manageCurrentFilterItems(selectedItem, currentItems) {
    let isElementActive = currentItems
        .some(item => item === selectedItem)
    ;

    if (isElementActive) {
        return currentItems
            .filter(item => item !== selectedItem)
        ;
    } else {
        return [
            ...currentItems,
            selectedItem
        ];
    }
};