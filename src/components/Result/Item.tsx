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
        const shouldUpdate = this.props.data.uuid_composed !== nextProps.data.uuid_composed ||
            this.props.data.metadata.image !== nextProps.data.metadata.image ||
            this.props.data.query !== nextProps.data.query;

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
        const isBestMatch = data.metadata.best_match ? "best-match" : "";
        const isExactMatch = data.metadata.exact_match ? "exact-match" : "";

        return <Template
            template={template}
            data={data}
            id={id}
            className={`${props.className} ${isBestMatch} ${isExactMatch}`}
            dictionary={dictionary}
        />;
    }
}

export default Item;
