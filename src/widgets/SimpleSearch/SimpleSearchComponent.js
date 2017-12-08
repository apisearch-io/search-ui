/**
 * @jsx h
 */

import { h, Component } from 'preact';
import {simpleSearchAction} from "./simpleSearchActions";
import Template from "../Template";

/**
 * SimpleSearch Component
 */
class SimpleSearchComponent extends Component {

    handleSearch = (e) => {
        const {
            startSearchOn,
            environmentId,
            currentQuery,
            client
        } = this.props;

        /**
         * Search when string is bigger than {startSearchOn}
         */
        if (e.target.value.length < startSearchOn) return;

        /**
         * Dispatch input search action
         */
        simpleSearchAction(
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

    clearSearch = () => {
        const {
            environmentId,
            currentQuery,
            client
        } = this.props;

        simpleSearchAction(
            {
                queryText: ''
            },
            {
                environmentId,
                currentQuery,
                client
            }
        )
    };

    render() {
        const {
            placeholder,
            autofocus,
            classNames: {
                container: containerClassName,
                input: inputClassName,
                clearSearch: clearSearchClassName
            },
            template: {
                clearSearch: clearSearchTemplate
            },
            currentQuery: {
                q: currentQueryText
            }
        } = this.props;

        return (
            <div className={`as-simpleSearch ${containerClassName}`}>
                <input
                    type='text'
                    className={`as-simpleSearch__input ${inputClassName}`}
                    autofocus={autofocus}
                    placeholder={placeholder}
                    onInput={this.handleSearch}
                    value={currentQueryText}
                />

                {(currentQueryText.length !== 0)
                    ? (
                        <div
                            className={`as-simpleSearch__clearSearch ${clearSearchClassName}`}
                            onClick={this.clearSearch}
                        >
                            <Template template={clearSearchTemplate}/>
                        </div>
                    ) : null
                }
            </div>
        );
    }
}

SimpleSearchComponent.defaultProps = {
    placeholder: '',
    autofocus: false,
    startSearchOn: 0,
    classNames: {
        container: '',
        input: '',
        clearSearch: ''
    },
    template: {
        clearSearch: 'x'
    }
};

export default SimpleSearchComponent;