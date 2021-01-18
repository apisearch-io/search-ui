import { h, Component } from 'preact';
import {SnapshotProps} from "./SnapshotProps";
import {SnapshotState} from "./SnapshotState";

/**
 * SnapshotComponent
 */
class SnapshotComponent extends Component<SnapshotProps, SnapshotState> {

    /**
     * Component receive props
     *
     * @param props
     */
    componentWillReceiveProps(props) {
        let query = props.currentQuery;

        this.setState(prevState => {
            return {query: query};
        });
    }

    /**
     * Render
     *
     * @return {}
     */
    render() {

        const queryAsJson = this.state.query == undefined
            ? ''
            : JSON.stringify(this.state.query.toArray())

        return (<div>{queryAsJson}</div>)
    }
}

export default SnapshotComponent;
