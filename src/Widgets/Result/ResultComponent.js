/** @jsx h */
import { h, Component } from 'preact';

class ResultComponent extends Component {
    constructor() {
        super();
    }

    render() {
        if (typeof this.props.data.items === 'undefined') {
            return null;
        }

        return (
            <ul>
                {this.props.data.items.map(item =>
                    <li>{item.uuid.id} - {item.uuid.type}</li>
                )}
            </ul>
        )
    }
}

export default ResultComponent;