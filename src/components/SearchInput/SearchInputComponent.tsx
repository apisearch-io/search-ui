import {h, Component} from 'preact';
import {simpleSearchAction, initialSearchSetup} from "./SearchInputActions";
import Template from "../Template";
import {SearchInputProps} from "./SearchInputProps";
import {SearchInputState} from "./SearchInputState";
import AutocompleteComponent from "./AutocompleteComponent";
import {useRef} from "preact/compat";

/**
 * SearchInput Component
 */
class SearchInputComponent extends Component<SearchInputProps, SearchInputState> {
    private inputRef = useRef(null);

    /**
     * Constructor
     */
    constructor(props) {
        super(props);
        if (props.autocomplete) {
            this.state = { queryText: '' };
        }
    }

    /**
     * Components will mount
     */
    componentWillMount() {

        const props = this.props;
        const environmentId = props.environmentId;
        const initialSearch = props.initialSearch;
        const currentQuery = props.store.getCurrentQuery();
        const autocomplete = props.autocomplete;
        const searchableFields = props.searchableFields;

        /**
         * Dispatch action
         */
        initialSearchSetup(
            environmentId,
            currentQuery,
            initialSearch,
            autocomplete,
            searchableFields
        );
    }

    /**
     * Component will receive props
     *
     * @param props
     */
    componentWillReceiveProps(props) {
        this.setState({
            queryText: props.store.getCurrentQuery().getQueryText()
        });
    }

    /**
     * Handle search
     *
     * @param e
     */
    handleSearch = (e) => {
        const props = this.props;
        const startSearchOn = props.startSearchOn;
        const environmentId = props.environmentId;
        const currentQuery = props.store.getCurrentQuery();
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
        const currentQuery = props.store.getCurrentQuery();
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
     * Key down
     */
    handleKeyDown(e) {

        switch (e.keyCode) {
            case 39:
            case 9:
                const props = this.props;
                const environmentId = props.environmentId;
                const currentQuery = props.store.getCurrentQuery();
                const repository = props.repository;

                if (this.props.store.getCurrentResult().getSuggestions().length > 0) {
                    simpleSearchAction(
                        environmentId,
                        currentQuery,
                        repository,
                        this.props.store.getCurrentResult().getSuggestions()[0],
                        true
                    )
                }

                break;
        }
    }

    doNothing(e) {}

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
        const currentQueryText = props.store.getCurrentQuery().getQueryText();
        const htmlNodeInheritProps = props.htmlNodeInheritProps;
        const suggestions = props.store.getCurrentResult()
            ? props.store.getCurrentResult().getSuggestions()
            : [];

        const showAutocomplete = props.autocomplete;

        const keyDownCallback = showAutocomplete
            ? (e) => this.handleKeyDown(e)
            : (e) => this.doNothing(e);

        const style = showAutocomplete
            ? 'position: relative; top: 0px; left: 0px; background-color: transparent; border-color: transparent;'
            : '';

        let searchInput = (<input
            type='text'
            className={`as-searchInput__input ${inputClassName}`}
            placeholder={placeholder}
            autofocus={autofocus}
            {...htmlNodeInheritProps}
            onInput={this.handleSearch}
            value={currentQueryText}
            style={style}
            onKeyDown={keyDownCallback}
            ref={this.inputRef}
        />)

        if (showAutocomplete) {
            searchInput = (
                <div style="position: relative">
                    <AutocompleteComponent
                      suggestions={suggestions}
                      queryText={currentQueryText}
                      inputClassName={inputClassName}
                    />
                    {searchInput}
                </div>
            )
        }

        if (withContainer) {
            searchInput = (
                <div className={`as-searchInput ${containerClassName}`}>
                    {searchInput}

                    {(clearSearch && currentQueryText && currentQueryText.length !== 0)
                        ? (
                            <div
                                className={`as-searchInput__clearSearch ${clearSearchClassName}`}
                                onClick={this.clearSearch}
                            >
                                <Template
                                    template={clearSearchTemplate}
                                    dictionary={this.props.dictionary}
                                />
                            </div>
                        ) : null
                    }
                </div>
            )
        }

        return searchInput;
    }
}

SearchInputComponent.defaultProps = {
    placeholder: '',
    autofocus: false,
    autocomplete: false,
    startSearchOn: 0,
    clearSearch: true,
    initialSearch: '',
    withContainer: true,
    searchableFields: [],
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
