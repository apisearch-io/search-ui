/**
 * Set of helpers for the suggestions widget
 */

/**
 * Highlight text
 */
export function highlightSuggestion(currentQueryText, suggestion) {
    let regex = new RegExp(`(${currentQueryText})`, 'gi');
    let highlightedSuggestion = suggestion.replace(regex, "<em>$1</em>");
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
    let currentActiveSuggestionKey;
    let isAnySuggestionActive = suggestionsArray
        .some(suggestion => suggestion.isActive);

    return suggestionsArray.map((suggestion, key) => {
        /**
         * If there are no previous suggestions active
         * mark the first one
         */
        if (false === isAnySuggestionActive) {
            suggestion.isActive = true;
            isAnySuggestionActive = true;

            return suggestion;
        }

        /**
         * Detect current active suggestion
         */
        if (
            suggestion.isActive &&
            key + 1 < suggestionsArray.length
        ) {
            currentActiveSuggestionKey = key;
            suggestion.isActive = false;
        }

        /**
         * Modify the first suggestion next to
         * the current active suggestion
         */
        if (
            key === currentActiveSuggestionKey + 1 &&
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
    let currentActiveSuggestionKey;
    suggestionsArray.forEach((suggestion, key) => {
        if (suggestion.isActive) {
            currentActiveSuggestionKey = key;
        }
    });

    return suggestionsArray.map((suggestion, key) => {
        /**
         * Set the current active suggestion as false
         * if is Active AND is not the last one
         */
        if (
            suggestion.isActive &&
            currentActiveSuggestionKey - 1 >= 0
        ) {
            suggestion.isActive = false;
        }

        /**
         * Set active the suggestion previous to
         * the current active suggestion
         */
        if (
            currentActiveSuggestionKey -1 === key &&
            currentActiveSuggestionKey - 1 >= 0
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