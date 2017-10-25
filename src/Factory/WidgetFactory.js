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
    static search({
       target,
       className
    }) {
        return <SearchComponent
            target={target}
            className={className}
        />
    };

    static result({
        target,
        className,
        template
    }) {
        return <ResultComponent
            target={target}
            className={className}
            template={template}
        />
    }
}