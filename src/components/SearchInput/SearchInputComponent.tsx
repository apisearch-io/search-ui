import {h, Component} from 'preact';
import {simpleSearchAction} from "./SearchInputActions";
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
    private queryTextEvent;
    private lastQueryTextStringDispatched;

    /**
     * Constructor
     */
    constructor(props) {
        super(props);
        if (props.autocomplete) {
            this.state = { queryText: "" };
        }

        const that = this;

        window.addEventListener("beforeunload", function() {
            that.dispatchQueryStringEvent(props, 0);
        });
    }

    /**
     * Component will receive props
     *
     * @param props
     */
    componentWillReceiveProps(props) {
        this.setState({
            queryText: props.store.getCurrentQuery().getQueryText(),
        });
    }

    /**
     * @param search
     */
    handleSearch = (search) => {
        const props = this.props;
        const startSearchOn = props.startSearchOn;
        const finalSpace = search.charAt(search.length - 1) === " " ? " " : "";
        const targetValueNoSpaces = search.trim() + finalSpace;

        simpleSearchAction(
            props.environmentId,
            props.store.getCurrentQuery(),
            props.repository,
            targetValueNoSpaces === " " ? "" : targetValueNoSpaces,
            search.length >= startSearchOn,
        );
    }

    /**
     * Clear search
     */
    clearSearch = () => {

        const props = this.props;
        const startSearchOn = props.startSearchOn;
        const environmentId = props.environmentId;
        const currentQuery = props.store.getCurrentQuery();
        const repository = props.repository;
        const visibleResults = 0 === startSearchOn;

        simpleSearchAction(
            environmentId,
            currentQuery,
            repository,
            "",
            visibleResults,
        );
    }

    /**
     * Key down
     */
    handleKeyDown(e) {
        switch (e.key) {
            case "ArrowRight":
            case "Tab":
            case "Enter":
                this.replaceWithAutocomplete(e);
                return;
        }

        switch (e.keyCode) {
            case 39:
            case 9:
            case 13:
                this.replaceWithAutocomplete(e);
                return;
        }

        window.postMessage({
            key: e.key ?? e.keyCode,
            name: "apisearch_input_keydown",
        }, "*");
    }

    replaceWithAutocomplete(e) {
        const props = this.props;
        const autocomplete = this.props.store.getCurrentResult().getAutocomplete();

        if (autocomplete !== null && autocomplete !== "") {
            simpleSearchAction(
                props.environmentId,
                props.store.getCurrentQuery(),
                props.repository,
                this.props.store.getCurrentResult().getAutocomplete(),
                true,
            );

            e.preventDefault();
            return;
        }
    }

    /**
     * @param e
     */
    doNothing(e) {}

    /**
     * @param config
     */
    withConfig(config: any) {

    }

    /**
     * @param props
     * @param timeout
     */
    dispatchQueryStringEvent(props: SearchInputProps, timeout: number) {
        const currentQuery = props.store.getCurrentQuery();
        const currentQueryText = currentQuery.getQueryText();

        if (this.queryTextEvent) {
            this.lastQueryTextStringDispatched = null;
            clearTimeout(this.queryTextEvent);
        }

        if (this.lastQueryTextStringDispatched === currentQueryText) {
            return;
        }

        this.lastQueryTextStringDispatched = currentQueryText;
        if (currentQueryText !== "") {
            const that = this;
            this.lastQueryTextStringDispatched = currentQueryText;
            this.queryTextEvent = setTimeout(function() {
                that.queryTextEvent = null;
                window.postMessage({
                    name: "apisearch_search",
                    query_text: currentQueryText,
                    query: currentQuery.toArray(),
                    site: props.store.getSite(),
                    device: props.store.getDevice(),
                }, "*");
            }, timeout);
        }
    }

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
        const currentQuery = props.store.getCurrentQuery();
        const currentQueryText = currentQuery.getQueryText();
        const htmlNodeInheritProps = props.htmlNodeInheritProps;
        const showAutocomplete = currentQuery.areAutocompleteEnabled();
        const autocomplete = props.store.getCurrentResult()
            ? props.store.getCurrentResult().getAutocomplete()
            : null;

        const keyDownCallback = showAutocomplete
            ? (e) => this.handleKeyDown(e)
            : (e) => this.doNothing(e);

        const keyDownAction = showAutocomplete
            ? (e) => this.replaceWithAutocomplete(e)
            : (e) => this.doNothing(e);

        const style = showAutocomplete
            ? "position: relative; top: 0px; left: 0px; background-color: transparent; border-color: transparent;"
            : "";

        const autocompletableClass = showAutocomplete
            ? "autocompletable"
            : "";

        this.dispatchQueryStringEvent(props, 2000);

        let searchInput = (<input
            type="text"
            className={`as-searchInput__input ${inputClassName} ${autocompletableClass}`}
            placeholder={placeholder}
            autofocus={autofocus}
            {...htmlNodeInheritProps}
            onInput={(event) => this.handleSearch((event.target as HTMLInputElement).value)}
            value={currentQueryText}
            style={style}
            onKeyDown={keyDownCallback}
            onTouchStart={keyDownAction}
            ref={this.inputRef}
        />);

        if (showAutocomplete) {
            searchInput = (
                <div style="position: relative">
                    <AutocompleteComponent
                        autocomplete={autocomplete}
                        queryText={currentQueryText}
                        inputClassName={inputClassName}
                    />

                    {searchInput}
                </div>
            );
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
                                    dictionary={props.dictionary}
                                />
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
    placeholder: "",
    autofocus: false,
    autocomplete: false,
    startSearchOn: 0,
    clearSearch: true,
    withContainer: true,
    searchableFields: [],
    speechRecognition: false,
    classNames: {
        container: "",
        input: "",
        clearSearch: "",
    },
    template: {
        clearSearch: "x",
        speechRecognition: "{S}",
    },
};

export default SearchInputComponent;
