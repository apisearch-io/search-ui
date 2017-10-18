/** @jsx h */
import { h, Component } from 'preact';

export default class SearchComponent extends Component {
    constructor() {
        super();

        this.state = {
            q: ''
        };

        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch = (e) => {
        this.setState({
            q: e.target.value
        })
    };

    render() {
        return (
            <div>
                <input
                    className="form-control"
                    placeholder=""
                    value={this.state.q}
                    onKeyUp={this.handleSearch}
                />
                <span>{this.state.q}</span>
            </div>
        );
    }
}