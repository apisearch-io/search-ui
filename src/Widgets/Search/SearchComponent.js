/** @jsx h */
import { h, Component } from 'preact';
import ApisearchStore from "../../ApisearchStore";
import {keyupSearchAction} from "./searchActions";

class SearchComponent extends Component {
    constructor() {
        super();
        this.state = ApisearchStore.getData();
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch = (e) => {
        this.setState({
            query: {
                ...this.state.query,
                q: e.target.value
            }
        });

        // Dispatch input search
        keyupSearchAction(e.target.value)
    };

    render() {
        return (
            <div>
                <input
                    className="form-control"
                    placeholder="Search something..."
                    value={this.state.query.q}
                    onKeyUp={this.handleSearch}
                />
            </div>
        );
    }
}

export default SearchComponent;