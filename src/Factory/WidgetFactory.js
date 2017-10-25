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
import ResultInformationComponent from "../Widgets/ResultInformation/ResultInformationComponent";

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

    static resultInfo({
        target,
        classNames,
        template
    }) {
        return <ResultInformationComponent
            target={target}
            classNames={classNames}
            template={template}
        />
    }
}