/** @jsx h */
import { h, Component } from 'preact';
import {keyupSearchAction} from "./searchActions";

class SearchComponent extends Component {
    constructor() {
        super();
        this.handleSearch = this.handleSearch.bind(this);
    }

    componentWillMount() {
        this.setState(this.props.data);
    }

    handleSearch = (e) => {
        this.setState({
            query: {
                ...this.state.query,
                q: e.target.value
            }
        });

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
                    value={this.state.query.q}
                    onKeyUp={this.handleSearch}
                />
            </div>
        );
    }
}

export default SearchComponent;