/**
 * @jsx h
 */
import { h, Component } from 'preact';
import Template from "../Template";
import {paginationChangeAction} from "./paginationActions";
import {
    getTotalPages,
    totalPagesToArray,
    getStart,
    getEnd
} from "./helpers";

/**
 * Pagination Component
 */
class PaginationComponent extends Component {

    handleClick = (page) => {
        const {
            data,
            environmentId,
            currentQuery,
            client
        } = this.props;

        let totalPages = getTotalPages({
            totalHits: data.total_hits,
            hitsPerPage: currentQuery.size
        });

        /**
         * Do not let go further
         */
        if (page <= 0) page = 1;
        if (page >= totalPages) page = totalPages;

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

    render() {
        const {
            padding,
            classNames: {
                container: containerClassName,
                item: itemClassName,
                active: activeClassName,
                disabled: disabledClassName,
                next: nextClassName,
                previous: previousClassName,
                last: lastClassName,
                first: firstClassName,
            },
            template: {
                item: itemTemplate,
                next: nextTemplate,
                previous: previousTemplate,
                first: firstTemplate,
                last: lastTemplate
            },
            currentQuery: {
                page: currentQueryPage,
                size: currentQuerySize
            },
            data
        } = this.props;

        /**
         * Get Total pages
         */
        let totalPages = getTotalPages({
            totalHits: data.total_hits,
            hitsPerPage: currentQuerySize
        });
        let pages = totalPagesToArray(totalPages);

        /**
         *  Get pages spectre
         */
        const paginationSettings = {
            totalPages,
            padding,
            currentPage: currentQueryPage,
            spectreSize: (padding * 2) + 1,
            isTouchingLeft: currentQueryPage <= (padding + 1),
            isTouchingRight: (currentQueryPage + padding) >= totalPages
        };
        let spectre = pages.slice(
            getStart(paginationSettings),
            getEnd(paginationSettings)
        );

        return (
            <ul className={`asui-pagination ${containerClassName}`}>
                <NavigationComponent
                    classNames={`asui-pagination--item ${firstClassName}`}
                    template={firstTemplate}
                    handleClick={() => this.handleClick(1)}
                />
                <NavigationComponent
                    classNames={`asui-pagination--item ${previousClassName}`}
                    template={previousTemplate}
                    handleClick={() => this.handleClick(currentQueryPage - 1)}
                />

                {spectre.map(page => (
                    <li
                        className={`asui-pagination--item ${itemClassName} ${(currentQueryPage === page) ? activeClassName : ''}`}
                        onClick={() => this.handleClick(page)}
                    >
                        <Template
                            template={itemTemplate}
                            data={{item: page}}
                        />
                    </li>
                ))}

                <NavigationComponent
                    classNames={`asui-pagination--item ${nextClassName}`}
                    template={nextTemplate}
                    handleClick={() => this.handleClick(currentQueryPage + 1)}
                />
                <NavigationComponent
                    classNames={`asui-pagination--item ${lastClassName}`}
                    template={lastTemplate}
                    handleClick={() => this.handleClick(totalPages)}
                />
            </ul>
        );
    }
}

function NavigationComponent({
    classNames,
    template,
    handleClick
}) {
    return <li
        className={classNames}
        onClick={handleClick}
    >
        <Template template={template} />
    </li>;
}

PaginationComponent.defaultProps = {
    padding: 3,
    showFirstLast: false,
    classNames: {
        container: '',
        item: '',
        active: 'active',
        disabled: 'disabled',
        next: '',
        first: '',
        previous: '',
        last: ''
    },
    template: {
        item: '{{item}}',
        next: 'Next >',
        previous: '< Prev',
        first: '<< First',
        last: 'Last >>'
    }
};

export default PaginationComponent;