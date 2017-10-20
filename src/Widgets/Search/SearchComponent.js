/** @jsx h */
import { h, Component } from 'preact';
import {keyupSearchAction} from "./searchActions";

class SearchComponent extends Component {
    constructor() {
        super();

        this.state = {
            q: ''
        };

        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch = (e) => {
        this.setState({q: e.target.value});

        // Dispatch input search
        this.props.store.dispatch(
            keyupSearchAction(e.target.value)
        );
    };

    render() {
        return (
            <div>
                <input
                    className="form-control"
                    placeholder="Search something..."
                    value={this.state.q}
                    onKeyUp={this.handleSearch}
                />
                <span>{this.state.q}</span>
            </div>
        );
    }
}

export default SearchComponent;