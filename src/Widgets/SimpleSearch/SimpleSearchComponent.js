/**
 * @jsx h
 */

import { h, Component } from 'preact';
import {simpleSearchAction} from "./simpleSearchActions";

/**
 * SimpleSearch Component
 */
class SimpleSearchComponent extends Component {
    shouldComponentUpdate() {
        return false;
    }

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
            {   // queryOptions
                queryText: e.target.value
            },
            {   // appOptions
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
                input: inputClassName
            }
        } = this.props;

        return (
            <div className={`asui-simpleSearch ${containerClassName}`}>
                <input
                    type='text'
                    className={`asui-simpleSearch--input ${inputClassName}`}
                    autofocus={autofocus}
                    placeholder={placeholder}
                    onInput={this.handleSearch}
                />
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
        input: ''
    }
};

export default SimpleSearchComponent;