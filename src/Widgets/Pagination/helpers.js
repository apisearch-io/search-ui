/**
 * Get total pages from the total reached hits
 * divided by the hits per page configured
 *
 * If there are more than 10.000 items
 * We reduce the max num of items to 9.999
 * to take care of performance
 */
export function getTotalPages({totalHits, hitsPerPage}) {
    totalHits = (totalHits >= 10000)
        ? 9999
        : totalHits
    ;

    return Math.ceil(
        parseInt(totalHits) / parseInt(hitsPerPage)
    );
}

/**
 * Pass total pages number into an array of numbers
 */
export function totalPagesToArray(totalPages) {
    let pages = [];
    for(let index = 1; index <= totalPages; index++) {
        pages.push(index);
    }

    return pages;
}

/**
 * Get the starting point of the pages spectre
 */
export function getStart({
    totalPages,
    padding,
    currentPage,
    spectreSize,
    isTouchingLeft,
    isTouchingRight
}) {
    if (isTouchingLeft) {
        return currentPage - (currentPage % spectreSize);
    }
    if (isTouchingRight) {
        return currentPage - (spectreSize - (totalPages % currentPage));
    }

    return currentPage - (padding + 1);
}

/**
 * Get the ending point of the pages spectre
 */
export function getEnd({
    totalPages,
    padding,
    currentPage,
    spectreSize,
    isTouchingLeft,
    isTouchingRight
}) {
    if (isTouchingLeft) {
        return spectreSize;
    }
    if (isTouchingRight) {
        return totalPages;
    }

    return currentPage + padding;
}