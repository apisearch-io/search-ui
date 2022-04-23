import {Component, h} from "preact";
import Template from "../Template";
import {ItemProps} from "./ItemProps";
import {ItemState} from "./ItemState";

/**
 * Item
 */
class Item extends Component<ItemProps, ItemState> {

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

        return <Template
            template={template}
            data={data}
            className={`as-result__itemsList ${props.className}`}
            dictionary={dictionary}
        />;
    }
}

export default Item;
