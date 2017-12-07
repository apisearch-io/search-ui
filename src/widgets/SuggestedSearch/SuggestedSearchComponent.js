/**
 * @jsx h
 */

import { h, Component } from 'preact';
import {
    highlightSuggestion,
    selectNextSuggestion,
    selectPreviousSuggestion,
    selectActiveSuggestion
} from './helpers';

/**
 * Actions
 */
import {
    simpleSearchAction,
    suggestedSearchAction
} from "./suggestedSearchActions";

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
        /**
         * Check suggestions available
         * if some, prepend the current query to the other suggestions array
         * else, only append the current query to the suggestions array
         */
        const suggests = (props.data && props.data.suggests)
            ? [this.state.q, ...props.data.suggests]
            : [this.state.q]
        ;

        /**
         * Prepare suggestions array
         */
        this.setState({
            currentSuggestions: suggests.map((suggest, key) => {
                return {
                    isActive: (0 === key),
                    name: suggest,
                    htmlName: highlightSuggestion(this.state.q, suggest)
                }
            })
        });
    }

    handleSearch = (e) => {
        const {
            startSearchOn,
            environmentId,
            currentQuery,
            client
        } = this.props;

        /**
         * Set the current query text
         */
        this.setState({q: e.target.value});

        /**
         * Search when string is bigger than {startSearchOn}
         */
        if (e.target.value.length < startSearchOn) {
            this.setState({currentSuggestions: []});
            return;
        }

        /**
         * Dispatch suggested search action
         */
        suggestedSearchAction(
            {
                queryText: e.target.value
            },
            {
                environmentId,
                currentQuery,
                client
            }
        )
    };

    handleSuggestionsNavigation = (e) => {
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
            /**
             * Prevent cursor to go at the starting point of the line
             */
            e.preventDefault();

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
            });

            const {
                environmentId,
                currentQuery,
                client
            } = this.props;

            simpleSearchAction(
                {
                    queryText: this.state.q
                },
                {
                    environmentId,
                    currentQuery,
                    client
                }
            )
        }
    };

    handleSuggestionClick = (e) => {
        this.setState({
            q: e.target.innerText,
            currentSuggestions: []
        });

        const {
            environmentId,
            currentQuery,
            client
        } = this.props;

        simpleSearchAction(
            {
                queryText: e.target.innerText
            },
            {
                environmentId,
                currentQuery,
                client
            }
        )
    };

    handleSearchInputFocusedOut = (e) => {
        /**
         * It handles when a user focuses out the search input
         * If is not clicking on the suggestions box
         * The suggestions are cleared and panel closes
         */
        if (
            null === e.relatedTarget ||
            false === e.relatedTarget.classList.contains('as-suggestedSearch--box')
        ) {
            this.setState({currentSuggestions: []});
        }

        return false;
    };

    render() {
        const {
            placeholder,
            autofocus,
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

        return (
            <div className={`as-suggestedSearch ${containerClassName}`}>
                <input
                    type={`text`}
                    value={this.state.q}
                    className={`as-suggestedSearch__input ${inputClassName}`}
                    placeholder={placeholder}
                    autofocus={autofocus}

                    onInput={this.handleSearch}
                    onKeyDown={this.handleSuggestionsNavigation}
                    onBlur={this.handleSearchInputFocusedOut}
                />

                <div
                    tabIndex={`0`}
                    className={`as-suggestedSearch__box ${boxClassName}`}
                    style={{
                        display: currentSuggestions.length !== 0
                            ? 'block'
                            : 'none'
                    }}
                >
                    {currentSuggestions.map((suggestion, key) => {
                        return (0 !== key)
                            ? <div
                                className={
                                    `as-suggestedSearch__suggestion ` +
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
                            : null
                    })}
                </div>
            </div>
        )
    }
}

SuggestedSearchComponent.defaultProps = {
    placeholder: '',
    autofocus: false,
    startSearchOn: 0,
    classNames: {
        container: '',
        input: '',
        box: '',
        suggestion: '',
        activeSuggestion: 'as-suggestedSearch__suggestion--active'
    }
};

export default SuggestedSearchComponent;