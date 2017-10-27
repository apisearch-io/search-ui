/**
 * @jsx h
 */

import { h, Component } from 'preact';
import Template from "../Template";
import {keyupSuggestedSearchAction} from "./suggestedSearchAction";
import {defaultTemplate} from "./suggestionBoxTemplate";

/**
 * Suggested Search Component
 */
class SuggestedSearchComponent extends Component {
    constructor() {
        super();

        this.state = {
            q: ''
        };

        this.handleSearch = this.handleSearch.bind(this);
        this.handleSelectedSuggestion = this.handleSelectedSuggestion.bind(this);
    }

    handleSearch = (e) => {
        // Set current query text
        this.setState({q: e.target.value});

        // Dispatch suggested search action
        keyupSuggestedSearchAction(
            e.target.value,
            this.props.currentQuery,
            this.props.client
        )
    };

    handleSelectedSuggestion = (e) => {
        // Set current query text
        this.setState({q: e.target.innerText});

        // Dispatch suggested search action
        // @todo refactor this
        keyupSuggestedSearchAction(
            e.target.innerText,
            this.props.currentQuery,
            this.props.client
        );
    };

    handleArrowNavigation = (e) => {
        if (e.code === 'ArrowDown') {
            console.log('down')
        }
        if (e.code === 'ArrowUp') {
            console.log('up')
        }
    };

    render() {
        const {
            placeholder,
            classNames: {
                container: containerClassName,
                input: inputClassName,
                box: boxClassName,
                suggestion: suggestionClassName
            },
            data
        } = this.props;

        /**
         * Data accessible to the template
         */
        let reducedTemplateData = {
            suggests: data.suggests || []
        };

        return (
            <div className={`asui-suggestedSearch ${containerClassName}`}>
                <input
                    type={`text`}
                    value={this.state.q}
                    className={`asui-suggestedSearch--input ${inputClassName}`}
                    placeholder={placeholder}
                    onInput={this.handleSearch}
                    onKeyDown={this.handleArrowNavigation}
                />

                <div
                    className={`asui-suggestedSearch--box ${boxClassName}`}
                    style={{display: data.suggests ? 'block' : 'none'}}
                >
                    {reducedTemplateData.suggests.map(suggestion =>
                        <div
                            className={`asui-suggestedSearch--suggestion ${suggestionClassName}`}
                            onClick={this.handleSelectedSuggestion}
                        >
                            {suggestion}
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

SuggestedSearchComponent.defaultProps = {
    placeholder: '',
    classNames: {
        container: '',
        input: '',
        box: '',
        suggestion: null
    }
};

export default SuggestedSearchComponent;