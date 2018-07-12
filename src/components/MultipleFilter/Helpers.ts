/**
 * Manage filter items
 *
 * If an item is on the list, remove it
 * else, add it!
 *
 * @param selectedItem
 * @param currentItems
 *
 * @returns {[null,null]}
 */
export function manageCurrentFilterItems(
    selectedItem: string,
    currentItems: string[],
) {
    const isElementActive = currentItems
        .some((item) => item === selectedItem)
    ;

    if (isElementActive) {
        return currentItems
            .filter((item) => item !== selectedItem)
        ;
    } else {
        return [
            ...currentItems,
            selectedItem,
        ];
    }
}
