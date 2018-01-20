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
            clearSearch,
            withContainer,
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
            },
            htmlNodeInheritProps
        } = this.props;

        let searchInput = (<input
            type='text'
            className={`as-simpleSearch__input ${inputClassName}`}
            {...htmlNodeInheritProps}
            autofocus={autofocus}
            placeholder={placeholder}
            onInput={this.handleSearch}
            value={currentQueryText}
            autocomplete="off"
        />);

        if (withContainer) {
            return (
                <div className={`as-simpleSearch ${containerClassName}`}>
                    {searchInput}

                    {(clearSearch && currentQueryText.length !== 0)
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

        return searchInput;
    }
}

SimpleSearchComponent.defaultProps = {
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

export default SimpleSearchComponent;