/**
 * @jsx h
 */

/**
 * Vendors
 */
import { h, createElement } from 'preact';

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
 *
 * @info
 *   The className object merge is because react does not
 *   merge the defaultProps deep objects with the custom
 *   props object passed to the component.
 *     @see https://github.com/facebook/react/issues/2568
 *     @see https://stackoverflow.com/questions/40428847/react-component-defaultprops-objects-are-overridden-not-merged
 */
class WidgetFactory {

    /**
     * Simple search input
     */
    static simpleSearch({
        target,
        placeholder,
        autofocus,
        classNames
    }) {
        return <SimpleSearchComponent
            target={target}
            placeholder={placeholder}
            autofocus={autofocus}
            classNames={{
                ...SimpleSearchComponent.defaultProps.classNames,
                ...classNames
            }}
        />
    };

    /**
     * Suggested Search input
     */
    static suggestedSearch({
        target,
        placeholder,
        autofocus,
        classNames,
        template
    }) {
        return <SuggestedSearchComponent
            target={target}
            placeholder={placeholder}
            autofocus={autofocus}
            classNames={{
                ...SuggestedSearchComponent.defaultProps.classNames,
                ...classNames
            }}
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
            classNames={{
                ...SortByComponent.defaultProps.classNames,
                ...classNames
            }}
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
            classNames={{
                ...ResultComponent.defaultProps.classNames,
                ...classNames
            }}
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
            classNames={{
                ...InformationComponent.defaultProps.classNames,
                ...classNames
            }}
            template={template}
        />
    }
}

export default WidgetFactory;