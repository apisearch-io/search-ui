import { h, Component } from 'preact';
import Template from "../Template";
import {AutocompleteState} from "./AutocompleteState";
import {AutocompleteProps} from "./AutocompleteProps";

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
            suggestion: ''
        }
    }

    /**
     * Component will receive props
     *
     * @param props
     */
    componentWillReceiveProps(props) {
        if (props.suggestions.length > 0) {
            this.setState(prevState => {
                return {
                   suggestion: ((props.suggestions[0] + "") ?? "")
               };
            });
        } else {
            this.setState(prevState => {
                return {
                   suggestion: ''
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

        const suggestion = this.state.suggestion;

        console.log(typeof(this.state.suggestion));
        const queryText = this.props.queryText;
        const inputClassName = this.props.inputClassName;
        const queryTextLength = queryText.length;
        const formattedSuggestion = queryText + suggestion.substring(queryTextLength);

        return (
            <input
                type='text'
                className={`as-searchInput__input as-searchInput__autocomplete ${inputClassName}`}
                placeholder={formattedSuggestion}
                style="position: absolute; top: 0px; left: 0px; background-color: white;"
            />
        );
    }
}

export default AutocompleteComponent;
