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
        return (
            <span>{this.state.query.q}</span>
        )
    }
};

export default ResultComponent;