/**
 * @jsx h
 */

/**
 * Vendors
 */
import { h } from 'preact';

/**
 * Locals
 */
import {store} from "../store";
import SearchComponent from "../Widgets/Search/SearchComponent";
import ResultComponent from "../Widgets/Result/ResultComponent";

store.subscribe(() => {
    console.log(store.getState())
});



/**
 * Widgets factory class
 */
export default class WidgetFactory {
    static searchInput({ target }) {
        return <SearchComponent
            store={store}
            target={target}
        />
    };

    static result({ target }) {
        return <ResultComponent
            store={store}
            target={target}
        />
    }
}