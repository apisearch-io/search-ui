import { h, Component } from 'preact';
import {AutocompleteProps} from "./AutocompleteProps";
import {AutocompleteState} from "./AutocompleteState";

/**
 * Autocomplete Component
 */
class AutocompleteComponent extends Component<AutocompleteProps, AutocompleteState> {

    /**
     * Constructor
     */
    constructor(props) {
        super(props);

        this.state = {
            autocomplete: "",
        };
    }

    /**
     * Component will receive props
     *
     * @param props
     */
    componentWillReceiveProps(props) {
        if (props.autocomplete !== null) {
            this.setState((prevState) => {
                return {
                    autocomplete: props.autocomplete,
                };
            });
        } else {
            this.setState((prevState) => {
                return {
                    autocomplete: "",
                };
            });
        }
    }

    /**
     * Render
     *
     * @return {any}
     */
    render() {

        const autocomplete = this.state.autocomplete;
        const queryText = this.props.queryText;
        const inputClassName = this.props.inputClassName;
        const queryTextLength = queryText.length;
        const autocompleteText = autocomplete.substring(queryTextLength);
        const formattedAutocompleteText = autocompleteText === ""
            ? ""
            : queryText + autocompleteText + " ⤷";

        return (
            <input
                type="search"
                className={`as-searchInput__input as-searchInput__autocomplete ${inputClassName}`}
                placeholder={formattedAutocompleteText}
                style="position: absolute; top: 0px; left: 0px; background-color: white;"
            />
        );
    }
}

export default AutocompleteComponent;
