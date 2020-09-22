import { h, Component } from 'preact';
import {simpleSearchAction} from "./SearchInputActions";
import Template from "../Template";
import {SearchInputProps} from "./SearchInputProps";

/**
 * SearchInput Component
 */
class SearchInputComponent extends Component<SearchInputProps> {

    /**
     * Handle search
     *
     * @param e
     */
    handleSearch = (e) => {

        const props = this.props;
        const startSearchOn = props.startSearchOn;
        const environmentId = props.environmentId;
        const currentQuery = props.currentQuery;
        const repository = props.repository;
        const visibleResults = e.target.value.length >= startSearchOn;

        /**
         * Dispatch input search action
         */
        simpleSearchAction(
            environmentId,
            currentQuery,
            repository,
            e.target.value,
            visibleResults
        );
    };

    /**
     * Clear search
     */
    clearSearch = () => {

        const props = this.props;
        const startSearchOn = props.startSearchOn;
        const environmentId = props.environmentId;
        const currentQuery = props.currentQuery;
        const repository = props.repository;
        const visibleResults = 0 == startSearchOn;

        simpleSearchAction(
            environmentId,
            currentQuery,
            repository,
            '',
            visibleResults
        )
    };

    /**
     * Search
     *
     * @return {any}
     */
    render() {

        const props = this.props;
        const placeholder = props.placeholder;
        const autofocus = props.autofocus;
        const clearSearch = props.clearSearch;
        const withContainer = props.withContainer;
        const containerClassName = props.classNames.container;
        const inputClassName = props.classNames.input;
        const clearSearchClassName = props.classNames.clearSearch;
        const clearSearchTemplate = props.template.clearSearch;
        const currentQueryText = props.currentQuery.getQueryText();
        const htmlNodeInheritProps = props.htmlNodeInheritProps;

        let searchInput = (<input
            type='text'
            className={`as-searchInput__input ${inputClassName}`}
            placeholder={placeholder}
            autofocus={autofocus}
            {...htmlNodeInheritProps}
            onInput={this.handleSearch}
            value={currentQueryText}
        />);

        if (withContainer) {
            return (
                <div className={`as-searchInput ${containerClassName}`}>
                    {searchInput}

                    {(clearSearch && currentQueryText && currentQueryText.length !== 0)
                        ? (
                            <div
                                className={`as-searchInput__clearSearch ${clearSearchClassName}`}
                                onClick={this.clearSearch}
                            >
                                <Template template={clearSearchTemplate}/>
                            </div>
                        ) : null
                    }
                </div>
            );
        }

        return searchInput;
    }
}

SearchInputComponent.defaultProps = {
    placeholder: '',
    autofocus: false,
    startSearchOn: 0,
    clearSearch: true,
    withContainer: true,
    classNames: {
        container: '',
        input: '',
        clearSearch: ''
    },
    template: {
        clearSearch: 'x'
    }
};

export default SearchInputComponent;
