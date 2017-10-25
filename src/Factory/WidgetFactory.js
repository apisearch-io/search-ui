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
import InformationComponent from "../Widgets/Information/InformationComponent";

/**
 * Widgets factory class
 */
export default class WidgetFactory {
    static search({
        target,
        placeholder,
        classNames
    }) {
        return <SearchComponent
            target={target}
            placeholder={placeholder}
            classNames={classNames}
        />
    };

    static result({
        target,
        classNames,
        template
    }) {
        return <ResultComponent
            target={target}
            classNames={classNames}
            template={template}
        />
    }

    static information({
        target,
        classNames,
        template
    }) {
        return <InformationComponent
            target={target}
            classNames={classNames}
            template={template}
        />
    }
}