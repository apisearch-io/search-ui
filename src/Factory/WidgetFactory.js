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
import SortByComponent from "../Widgets/SortBy/SortByComponent";
import ResultComponent from "../Widgets/Result/ResultComponent";
import InformationComponent from "../Widgets/Information/InformationComponent";

/**
 * Widgets factory class
 */
class WidgetFactory {
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

    static sortBy({
        target,
        classNames,
        options
    }) {
        return <SortByComponent
            target={target}
            classNames={classNames}
            options={options}
        />
    }

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

export default WidgetFactory;