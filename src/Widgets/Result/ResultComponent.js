/** @jsx h */
import { h, Component } from 'preact';

class ResultComponent extends Component {
    render() {
        console.log(this.props.store.getState())
        return (
            <ul>
                <li>Result 1</li>
                <li>Result 2</li>
                <li>Result 3</li>
                <li>Result 4</li>
            </ul>
        )
    }
};

export default ResultComponent;