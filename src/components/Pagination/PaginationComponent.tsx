import { h, Component } from 'preact';
import Template from "../Template";
import {paginationChangeAction} from "./PaginationActions";
import {PaginationState} from "./PaginationState";
import NavigationComponent from "./NavigationComponent";
import {
    getTotalPages,
    totalPagesToArray,
    getStart,
    getEnd
} from "./Helpers";
import {PaginationProps} from "./PaginationProps";

/**
 * Pagination Component
 */
class PaginationComponent extends Component<PaginationProps, PaginationState> {

    /**
     * Constructor
     */
    constructor() {
        super();
        this.state = {
            page: 1
        }
    }

    /**
     * Component will receive props
     *
     * @param props
     */
    componentWillReceiveProps(props) {

        const page = props.currentQuery.getPage();
        this.setState(prevState => {
            return {
                page: page
            };
        });
    }

    /**
     * Handle click
     *
     * @param page
     */
    handleClick = (page) => {
        const {
            currentResult,
            environmentId,
            currentQuery,
            repository
        } = this.props;

        let totalPages = getTotalPages(
            currentResult.getTotalHits(),
            currentQuery.getSize()
        );

        /**
         * Do not let go further
         */
        if (page <= 0) page = 1;
        if (page >= totalPages) page = totalPages;

        if (currentQuery.getPage() === page) {
            return;
        }

        /**
         * Dispatch change page action
         */
        paginationChangeAction(
            environmentId,
            currentQuery,
            repository,
            page
        );
    };

    /**
     * Render
     *
     * @return {any}
     */
    render() {

        const props = this.props;
        const currentResult = props.currentResult;
        if (props.currentResult == null) {
            return;
        }

        const currentQuerySize = props.currentQuery.getSize();
        const totalPages = getTotalPages(
            currentResult.getTotalHits(),
            currentQuerySize
        );

        /**
         * Hide container if hits are empty
         */
        if (
            currentResult.getTotalHits() === 0 ||
            totalPages === 1
        ) {
            return null;
        }

        const padding = props.padding;
        const goFirstLast = props.goFirstLast;
        const containerClassName = props.classNames.container;
        const itemClassName = props.classNames.item;
        const activeClassName = props.classNames.active;
        const disabledClassName = props.classNames.disabled;
        const nextClassName = props.classNames.next;
        const previousClassName = props.classNames.previous;
        const lastClassName = props.classNames.last;
        const firstClassName = props.classNames.first;

        const itemTemplate = props.template.item;
        const nextTemplate = props.template.next;
        const previousTemplate = props.template.previous;
        const firstTemplate = props.template.first;
        const lastTemplate = props.template.last;

        const currentQueryPage = props.currentQuery.getPage();

        /**
         * Get Total pages
         */

        const pages = totalPagesToArray(totalPages);

        /**
         *  Get pages spectre
         */
        const spectreSize =(padding * 2) + 1;
        const isTouchingLeft = currentQueryPage <= (padding + 1);
        const isTouchingRight = (currentQueryPage + padding) >= totalPages;

        const spectre = pages.slice(
            getStart(
                totalPages,
                padding,
                currentQueryPage,
                spectreSize,
                isTouchingLeft,
                isTouchingRight
            ),
            getEnd(
                totalPages,
                padding,
                currentQueryPage,
                spectreSize,
                isTouchingLeft,
                isTouchingRight
            )
        );

        /**
         * Dynamic disabled classes
         */
        const previousDisabledClass = (currentQueryPage === 1) ? disabledClassName : '';
        const nextDisabledClass = (currentQueryPage === totalPages) ? disabledClassName : '';

        return (
            <ul className={`as-pagination ${containerClassName}`}>
                <NavigationComponent
                    isVisible={goFirstLast}
                    classNames={`as-pagination__item as-pagination__item--first ${firstClassName} ${previousDisabledClass}`}
                    template={firstTemplate}
                    handleClick={() => this.handleClick(1)}
                />
                <NavigationComponent
                    isVisible={true}
                    classNames={`as-pagination__item as-pagination__item--previous ${previousClassName} ${previousDisabledClass}`}
                    template={previousTemplate}
                    handleClick={() => this.handleClick(currentQueryPage - 1)}
                />

                {spectre.map(page => (
                    <li
                        className={`as-pagination__item as-pagination__item--link ${itemClassName} ${
                            (currentQueryPage === page) ? activeClassName : ''
                        }`}
                        onClick={() => this.handleClick(page)}
                    >
                        <Template
                            template={itemTemplate}
                            data={{page: page.toLocaleString('de-DE')}}
                            dictionary={this.props.dictionary}
                        />
                    </li>
                ))}

                <NavigationComponent
                    isVisible={true}
                    classNames={`as-pagination__item as-pagination__item--next ${nextClassName} ${nextDisabledClass}`}
                    template={nextTemplate}
                    handleClick={() => this.handleClick(currentQueryPage + 1)}
                />
                <NavigationComponent
                    isVisible={goFirstLast}
                    classNames={`as-pagination__item as-pagination__item--last ${lastClassName} ${nextDisabledClass}`}
                    template={lastTemplate}
                    handleClick={() => this.handleClick(totalPages)}
                />
            </ul>
        );
    }
}

PaginationComponent.defaultProps = {
    padding: 3,
    goFirstLast: false,
    classNames: {
        container: '',
        item: '',
        active: 'as-pagination__item--active',
        disabled: 'as-pagination__item--disabled',
        next: '',
        first: '',
        previous: '',
        last: ''
    },
    template: {
        item: '{{page}}',
        next: '>',
        previous: '<',
        first: '<<',
        last: '>>'
    }
};

export default PaginationComponent;
