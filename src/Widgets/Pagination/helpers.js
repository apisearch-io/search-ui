
const calculateNextPages = ({currentPage, limit, totalPages}) => {
    let pages = [];
    for(let index = currentPage + 1; index < limit; index++) {
        pages.push(index);
    }

    return pages;
};

const calculatePrevPages = ({currentPage, limit, totalPages}) => {
    let pages = [];
    for(let index = currentPage - 1; index > 0; index--) {
        pages.push(index);
    }

    return pages;
};