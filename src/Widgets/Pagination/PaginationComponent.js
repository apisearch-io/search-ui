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
            shownPages: 4
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

        let {shownPages, currentPage} = this.state;
        const isTouchingLeft = currentPage <= Math.round(shownPages / 2);
        const isTouchingRight = (currentPage + Math.round(shownPages / 2)) > totalPages;


        // pages spectre
        const start = () => {
            if (isTouchingLeft) {
                return currentPage - (currentPage % shownPages);
            }
            return currentPage - Math.round(shownPages / 2);
        };

        const end = () => {
            if (isTouchingLeft) {
                return (shownPages / currentPage) * currentPage;
            }
            if(isTouchingRight) {
                return (currentPage / shownPages) * (currentPage / shownPages)
            }
            return (currentPage) + Math.round(shownPages / 2);
        };

        let pagesSpectre = pages.slice(
            start(),
            end()
        );

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