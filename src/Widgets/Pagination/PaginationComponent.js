/**
 * @jsx h
 */
import { h, Component } from 'preact';
import {paginationChangeAction} from "./paginationActions";

/**
 * Pagination Component
 */
class PaginationComponent extends Component {
    constructor() {
        super();
        this.state = {
            currentPage: 1,
            itemsOnPage: 7
        }
    }

    handleClick = (page) => {
        const {
            environmentId,
            currentQuery,
            client
        } = this.props;

        /**
         * Dispatch change page action
         */
        paginationChangeAction(
            {
                selectedPage: page
            },
            {
                environmentId,
                currentQuery,
                client
            }
        );
    };

    componentWillReceiveProps(props) {
        const { page } = props.data.query;
        this.setState({
            currentPage: page ? page : 1
        });
    }

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

        let totalPages = Math.ceil(totalHits / itemsPerPage);
        let pages = totalPagesToArray(totalPages);

        // -----------------------------------
        // |
        // |
        // |
        let {itemsOnPage, currentPage} = this.state;
        const isTouchingLeft = currentPage < Math.ceil(itemsOnPage / 2);

        // pages spectre
        const start = () => {
            if (isTouchingLeft) {
                return currentPage - (currentPage % itemsOnPage);
            }
            return currentPage - Math.ceil(itemsOnPage / 2);
        };

        const end = () => {
            if (isTouchingLeft) {
                return itemsOnPage / currentPage * currentPage;
            }
            return (currentPage - 1) + Math.ceil(itemsOnPage / 2);
        };

        console.log(currentPage % itemsOnPage);

        let pagesSpectre = pages.slice(
            start(),
            end()
        );
        console.log(pagesSpectre);

        return (
            <div className={`asui-pagination pagination-list ${containerClassName}`}>
                <span
                    className={`pagination-link`}
                    onClick={() => this.handleClick(this.state.currentPage - 1)}
                >
                    Prev
                </span>
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

                <span
                    className={`pagination-link`}
                    onClick={() => this.handleClick(this.state.currentPage + 1)}
                >
                    Next
                </span>
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