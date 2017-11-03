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
        /**
         * Dispatch input search action
         */
        simpleSearchAction(
            e.target.value,
            this.props.currentQuery,
            this.props.client
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
                    onKeyUp={this.handleSearch}
                />
            </div>
        );
    }
}

SimpleSearchComponent.defaultProps = {
    placeholder: '',
    autofocus: false,
    classNames: {
        container: '',
        input: ''
    }
};

export default SimpleSearchComponent;