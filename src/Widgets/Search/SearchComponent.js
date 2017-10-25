/**
 * @jsx h
 */

import { h, Component } from 'preact';
import {keyupSearchAction} from "./searchActions";

/**
 * Search Component
 */
class SearchComponent extends Component {
    constructor() {
        super();
        this.state = {
            q: ''
        };
        this.handleSearch = this.handleSearch.bind(this);
    }

    shouldComponentUpdate() {
        return false;
    }

    handleSearch = (e) => {
        this.setState({q: e.target.value});

        // Dispatch input search
        keyupSearchAction(
            e.target.value,
            this.props.currentQuery,
            this.props.client
        )
    };

    render() {
        const {
            placeholder,
            classNames: {
                container: containerClassName,
                input: inputClassName
            }
        } = this.props;

        return (
            <div className={`asui-search ${containerClassName}`}>
                <input
                    className={inputClassName}
                    placeholder={placeholder}
                    value={this.state.q}
                    onKeyUp={this.handleSearch}
                />
            </div>
        );
    }
}

SearchComponent.defaultProps = {
    placeholder: '',
    classNames: {
        container: '',
        input: ''
    }
};


export default SearchComponent;