/**
 * @jsx h
 */

import { h, Component } from 'preact';
import {keyupSuggestedSearchAction} from "./suggestedSearchAction";
import {
    highlightSuggestion,
    selectNextSuggestion,
    selectPreviousSuggestion,
    selectActiveSuggestion
} from './helpers';

/**
 * Suggested Search Component
 */
class SuggestedSearchComponent extends Component {
    constructor() {
        super();

        this.state = {
            q: '',
            currentSuggestions: []
        };
    }

    componentWillReceiveProps(props) {
        const suggests = props.data.suggests || [];

        /**
         * Prepare suggestions array
         */
        this.setState({
            currentSuggestions: suggests.map(suggest => {
                return {
                    isActive: false,
                    name: suggest,
                    htmlName: highlightSuggestion(this.state.q, suggest)
                }
            })
        });
    }

    handleSearch = (e) => {
        /**
         * Set the current query text
         */
        this.setState({q: e.target.value});

        /**
         * Dispatch suggested search action
         */
        keyupSuggestedSearchAction(
            e.target.value,
            this.props.currentQuery,
            this.props.client
        )
    };

    handleSuggestionClick = (e) => {
        this.setState({
            q: e.target.innerText,
            currentSuggestions: []
        });
    };

    handleSearchInputFocusedOut = (e) => {
        /**
         * It handles when a user focuses out the search input
         * If is not clicking on the suggestions box
         * The suggestions are cleared and panel closes
         */
        if (
            null === e.relatedTarget ||
            false === e.relatedTarget.classList.contains('asui-suggestedSearch--box')
        ) {
            this.setState({currentSuggestions: []})
        }

        return false;
    };

    handleSuggestionsNavigation = (e) => {
        /**
         * Return if no suggestions
         */
        if (this.state.currentSuggestions.length === 0) {
            return;
        }

        /**
         * When user hits arrow down
         */
        if (e.code === 'ArrowDown') {
            this.setState({
                currentSuggestions: selectNextSuggestion(
                    this.state.currentSuggestions
                ),
                q: selectActiveSuggestion(
                    this.state.currentSuggestions
                )
            });
        }

        /**
         * When user hits arrow up
         */
        if (e.code === 'ArrowUp') {
            this.setState({
                currentSuggestions: selectPreviousSuggestion(
                    this.state.currentSuggestions
                ),
                q: selectActiveSuggestion(
                    this.state.currentSuggestions
                )
            });
        }

        /**
         * When user hits enter
         */
        if (e.code === 'Enter') {
            this.setState({
                q: selectActiveSuggestion(
                    this.state.currentSuggestions
                ),
                currentSuggestions: []
            })
        }
    };

    render() {
        const {
            placeholder,
            classNames: {
                container: containerClassName,
                input: inputClassName,
                box: boxClassName,
                suggestion: suggestionClassName,
                activeSuggestion: activeSuggestionClassName
            }
        } = this.props;

        const {
            currentSuggestions
        } = this.state;

        console.log(this.state.currentSuggestions)

        return (
            <div className={`asui-suggestedSearch ${containerClassName}`}>
                <input
                    type={`text`}
                    value={this.state.q}
                    className={`asui-suggestedSearch--input ${inputClassName}`}
                    placeholder={placeholder}

                    onInput={this.handleSearch}
                    onKeyDown={this.handleSuggestionsNavigation}
                    onBlur={this.handleSearchInputFocusedOut}
                />

                <div
                    tabIndex={"0"}
                    className={`asui-suggestedSearch--box ${boxClassName}`}
                    style={{
                        display: currentSuggestions
                            ? 'block'
                            : 'none'
                    }}
                >
                    {currentSuggestions.map(suggestion =>
                        <div
                            className={
                                `asui-suggestedSearch--suggestion ` +
                                `${suggestionClassName} ` +
                                `${suggestion.isActive
                                    ? activeSuggestionClassName
                                    : ''
                                }`
                            }
                            dangerouslySetInnerHTML={{
                                __html: suggestion.htmlName
                            }}
                            onClick={this.handleSuggestionClick}
                        />
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
        suggestion: '',
        activeSuggestion: 'is-active'
    }
};

export default SuggestedSearchComponent;