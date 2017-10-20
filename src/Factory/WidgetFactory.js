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
import SearchComponent from "../Widgets/Search/SearchComponent";
import ResultComponent from "../Widgets/Result/ResultComponent";

/**
 * Widgets factory class
 */
export default class WidgetFactory {
    static searchInput({ target }) {
        return <SearchComponent
            target={target}
        />
    };

    static result({ target }) {
        return <ResultComponent
            target={target}
        />
    }
}