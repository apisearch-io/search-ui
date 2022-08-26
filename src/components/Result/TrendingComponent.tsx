import {Item} from "apisearch";
import {h} from 'preact';
import ResultComponent from "./ResultComponent";

/**
 * Trending Component
 */
class TrendingComponent extends ResultComponent {

    /**
     * Component will receive props
     *
     * @param props
     */
    public componentWillReceiveProps(props) {

        if (props.store.getCurrentResult() == null) {
            this.setState((prevState) => {
                return {
                    items: [],
                };
            });
            return;
        }

        const currentResult = props.store.getCurrentResult();
        let items = currentResult.getMetadataValue("trending");
        if (items && items.length > 0) {
            items.map((item: any) => Item.createFromArray(item));
        } else {
            items = currentResult.getItems().slice(0, 10);
        }

        this.setState((prevState) => {
            return {
                items,
            };
        });
    }
}

export default TrendingComponent;
