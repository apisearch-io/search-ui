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
        return (
            <div>
                <input
                    className="form-control"
                    placeholder="Search something..."
                    value={this.state.q}
                    onKeyUp={this.handleSearch}
                />
            </div>
        );
    }
}

export default SearchComponent;