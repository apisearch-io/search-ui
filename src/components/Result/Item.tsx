import {Component, h} from "preact";
import {highlightElement} from "../../Highlight";
import Template from "../Template";
import {ItemProps} from "./ItemProps";
import {ItemState} from "./ItemState";

/**
 * Item
 */
class Item extends Component<ItemProps, ItemState> {

    /**
     * @param nextProps
     * @param nextState
     */
    public shouldComponentUpdate(nextProps: Readonly<ItemProps>, nextState: Readonly<ItemState>): boolean {
        const shouldUpdate = this.props.data.uuid_composed !== nextProps.data.uuid_composed;
        if (!shouldUpdate) {
            this.highlight();
        }

        return shouldUpdate;
    }

    public componentDidMount() {
        this.highlight();
    }

    public componentDidUpdate() {
        this.highlight();
    }

    public highlight() {
        const queryText = this.props.data.query_text;
        if (this.props.data.highlights_enabled && queryText !== "") {
            const element = document.getElementById("as-result-" + this.props.data.uuid_composed);
            highlightElement(element, queryText);
        }
    }

    /**
     * Render
     *
     * @return {any}
     */
    public render() {
        const props = this.props;
        const template = props.template;
        const data = props.data;
        const dictionary = props.dictionary ?? {};
        const id = "as-result-" + data.uuid_composed;

        return <Template
            template={template}
            data={data}
            id={id}
            className={`as-result__itemsList ${props.className}`}
            dictionary={dictionary}
        />;
    }
}

export default Item;
