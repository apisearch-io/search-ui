/** @jsx h */
import { h, Component } from 'preact';
import ApisearchStore from "../../ApisearchStore";

class ResultComponent extends Component {
    constructor() {
        super();
        this.state = ApisearchStore.getData();
    }

    componentWillMount() {
        ApisearchStore.on('change', () =>
            this.setState(ApisearchStore.getData())
        )
    }

    render() {
        let items = (this.state.items !== 0)
            ? this.state.items
            : []
        ;

        return (
            <ul>
                {items.map(item => <li>{item.uuid.id} - {item.uuid.type}</li>)}
            </ul>
        )
    }
};

export default ResultComponent;