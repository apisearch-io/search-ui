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
    private speechRecognition;

    /**
     * Constructor
     */
    constructor(props) {
        super(props);
        if (props.autocomplete) {
            this.state = { queryText: "" };
        }

        const that = this;

        const speechRecognition = window["webkitSpeechRecognition"];
        if (props.speechRecognition && typeof speechRecognition === "function") {
            that.speechRecognition = new speechRecognition();
            that.speechRecognition.onresult = (event) => {
                const text = event.results[0][0].transcript;
                that.handleSearch(text);
            };

            that.speechRecognition.onerror = (event) => {
                console.log("Speech Recognition Error - " + event.error);
            };
        }
    }

    /**
     * Components will mount
     */
    componentWillMount() {

        const props = this.props;

        /**
         * Dispatch action
         */
        initialSearchSetup(
            props.environmentId,
            props.store.getCurrentQuery(),
            props.initialSearch,
            props.autocomplete,
            props.searchableFields,
            props.queryOperator,
        );
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
     * @param speechRecognition
     */
    onSpeechStart(e, speechRecognition) {
        speechRecognition.start();
    }

    /**
     * @param e
     */
    doNothing(e) {}

    /**
     * @param config
     */
    withConfig(config: any) {
        if (this.speechRecognition) {
            this.speechRecognition.lang = this.props.config.options.locale ?? "";
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

        let searchInput = (<input
            type="search"
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

        if (this.speechRecognition) {
            searchInput = (
                <div style="position: relative">
                    {searchInput}
                    <div
                        class={`as-searchInput-speechRecognition`}
                        onClick={(e) => this.onSpeechStart(e, this.speechRecognition)}
                    >
                        <Template
                            template={props.template.speechRecognition}
                            dictionary={props.dictionary}
                        />
                    </div>
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
    initialSearch: "",
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
