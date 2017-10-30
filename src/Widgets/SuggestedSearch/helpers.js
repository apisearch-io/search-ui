/**
 * Set of helpers for the suggestions widget
 */

/**
 * Highlight text
 */
export function highlightSuggestion(currentQueryText, suggestion) {
    let regex = new RegExp(`(${currentQueryText})`, 'gi');
    let highlightedSuggestion = suggestion.replace(regex, "<strong>$1</strong>");
    let sanitizedSpaces = highlightedSuggestion.split(' ');

    return sanitizedSpaces.join('&nbsp;');
}

/**
 * Mark as active the item next
 * to the last active item
 * on a given array of items
 *
 * @example when a user press a key arrow down
 */
export function selectNextSuggestion(suggestionsArray) {
    let currentActiveItemKey;

    return suggestionsArray.map((suggestion, key) => {
        /**
         * Detect current Active object
         */
        if (
            suggestion.isActive &&
            key + 1 < suggestionsArray.length
        ) {
            currentActiveItemKey = key;
            suggestion.isActive = false;
        }
        /**
         * Modify the first next to
         * the last active object
         */
        if (
            key === currentActiveItemKey + 1 &&
            key + 1 <= suggestionsArray.length
        ) {
            suggestion.isActive = true;
        }

        return suggestion;
    });
}

/**
 * Mark as active the item previous
 * to the last active item
 * on a given array of items
 *
 * @example when a user press a key arrow up
 */
export function selectPreviousSuggestion(suggestionsArray) {
    /**
     * Find the current active suggestion key
     */
    let currentActiveItemKey;
    suggestionsArray.forEach((suggestion, key) => {
        if (suggestion.isActive) {
            currentActiveItemKey = key;
        }
    });

    return suggestionsArray.map((suggestion, key) => {
        /**
         * Set the current active suggestion as false
         */
        if (suggestion.isActive) {
            suggestion.isActive = false;
        }
        /**
         * Set as active the previous active suggestion
         */
        if (
            key === currentActiveItemKey -1 &&
            currentActiveItemKey - 1 >= 0
        ) {
            suggestion.isActive = true;
        }

        return suggestion;
    });
}

/**
 * Return the active item of an array
 */
export function selectActiveSuggestion(suggestionsArray) {
    let selectedSuggestion = suggestionsArray.filter(suggestion => {
        if (suggestion.isActive) {
            return suggestion;
        }
    });

    return selectedSuggestion[0].name;
}