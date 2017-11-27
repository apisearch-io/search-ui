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
            currentPage: 1
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
            padding,
            classNames: {
                container: containerClassName
            },
            currentQuery,
            data
        } = this.props;

        let { currentPage } = this.state;

        /**
         * Get Total pages
         */
        let totalPages = Math.ceil(
            parseInt(data.total_hits) / parseInt(currentQuery.size)
        );
        let pages = totalPagesToArray(totalPages);

        /**
         *  Get pages spectre
         */
        const paginationSettings = {
            totalPages,
            padding,
            currentPage,
            spectreSize: (padding * 2) + 1,
            isTouchingLeft: currentPage <= (padding + 1),
            isTouchingRight: (currentPage + padding) >= totalPages
        };
        let pagesSpectre = pages.slice(
            start(paginationSettings),
            end(paginationSettings)
        );

        return (
            <div className={`asui-pagination pagination-list ${containerClassName}`}>
                <span
                    className={`pagination-link`}
                    onClick={() => this.handleClick(currentPage - 1)}
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
                    onClick={() => this.handleClick(currentPage + 1)}
                >
                    Next
                </span>
            </div>
        );
    }
}

function totalPagesToArray(totalPages) {
    let pages = [];
    for(let index = 1; index <= totalPages; index++) {
        pages.push(index);
    }

    return pages;
}

function start({
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

function end({
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

PaginationComponent.defaultProps = {
    padding: 3,
    classNames: {
        container: ''
    }
};

export default PaginationComponent;