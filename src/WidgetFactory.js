/** @jsx h */
import {h} from 'preact';
import InputText from "./Widgets/Search/SearchComponent";

/**
 * Widgets factory class
 */
export default class WidgetFactory {
    static searchInput() {
        return <InputText />;
    };
}