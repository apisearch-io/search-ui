/**
 * @jsx h
 */
import { h, Component } from 'preact';

/**
 * Pagination Component
 */
class PaginationComponent extends Component {
    constructor() {
        super();
        this.state = {
            currentPage: 2,
            itemsOnPage: 6
        }
    }

    handleClick = (page) => {
        this.setState({currentPage: page})
    };

    render() {
        const {
            classNames: {
                container: containerClassName
            },
            currentQuery,
            data
        } = this.props;

        let itemsPerPage = parseInt(currentQuery.size);
        let totalHits = parseInt(data.total_hits);

        // pages array
        let totalPages = Math.ceil(totalHits / itemsPerPage);
        let pages = totalPagesToArray(totalPages);
        // pages array

        const {itemsOnPage, currentPage} = this.state;

        // pages spectre
        let halfOfNumberOfItemsOnPage = Math.ceil(this.state.itemsOnPage / 2);
        let currentPageLessHalf = Math.ceil(this.state.currentPage - halfOfNumberOfItemsOnPage);

        let modulo = totalPages % this.state.currentPage;

        console.log(totalPages, this.state.currentPage);
        console.log(modulo)

        let pagesSpectre = pages.slice(
            currentPageLessHalf + modulo,
            currentPageLessHalf + this.state.itemsOnPage
        );
        console.log(pagesSpectre);
        // pages spectre

        return (
            <div className={`asui-pagination pagination-list ${containerClassName}`}>
                {pagesSpectre.map(page => {
                    return (
                        <span
                            className={`pagination-link ${(this.state.currentPage === page) ? 'is-current' : ''}`}
                            onClick={() => this.handleClick(page)}
                        >
                            {page}
                        </span>
                    )
                })}
            </div>
        );
    }
}

function totalPagesToArray(totalPages) {
    let pages = [];
    for(let index = 1; index < totalPages; index++) {
        pages.push(index);
    }

    return pages;
}

PaginationComponent.defaultProps = {
    classNames: {
        container: ''
    }
};

export default PaginationComponent;