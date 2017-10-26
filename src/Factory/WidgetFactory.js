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
import SimpleSearchComponent from "../Widgets/SimpleSearch/SimpleSearchComponent";
import SortByComponent from "../Widgets/SortBy/SortByComponent";
import ResultComponent from "../Widgets/Result/ResultComponent";
import InformationComponent from "../Widgets/Information/InformationComponent";
import SuggestedSearchComponent from "../Widgets/SuggestedSearch/SuggestedSearchComponent";

/**
 * Widgets factory class
 */
class WidgetFactory {

    /**
     * Simple search input
     */
    static simpleSearch({
        target,
        placeholder,
        classNames
    }) {
        return <SimpleSearchComponent
            target={target}
            placeholder={placeholder}
            classNames={classNames}
        />
    };

    /**
     * Suggested Search input
     */
    static suggestedSearch({
        target,
        placeholder,
        classNames,
        template
    }) {
        return <SuggestedSearchComponent
            target={target}
            placeholder={placeholder}
            classNames={classNames}
            template={template}
        />
    }

    /**
     * Sort By
     */
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

    /**
     * Search result
     */
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

    /**
     * Search result information
     */
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