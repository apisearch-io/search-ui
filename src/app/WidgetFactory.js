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
import SuggestedSearchComponent from "../Widgets/SuggestedSearch/SuggestedSearchComponent";
import SortByComponent from "../Widgets/SortBy/SortByComponent";
import MultipleFilterComponent from "../Widgets/MultipleFilter/MultipleFilterComponent";
import ResultComponent from "../Widgets/Result/ResultComponent";
import InformationComponent from "../Widgets/Information/InformationComponent";
import ClearFiltersComponent from "../Widgets/ClearFilters/ClearFiltersComponent";
import PaginationComponent from "../Widgets/Pagination/PaginationComponent";

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
     * Multiple filter
     */
    static multipleFilter({
        target,
        name,
        filterField,
        aggregationField,
        applicationType,
        fetchLimit,
        viewLimit,
        sortBy,
        classNames,
        template,
        formatData
    }) {
        return <MultipleFilterComponent
            target={target}
            name={name}
            filterField={filterField}
            aggregationField={aggregationField}
            applicationType={applicationType}
            fetchLimit={fetchLimit}
            viewLimit={viewLimit}
            sortBy={sortBy}
            classNames={{
                ...MultipleFilterComponent.defaultProps.classNames,
                ...classNames
            }}
            template={{
                ...MultipleFilterComponent.defaultProps.template,
                ...template
            }}
            formatData={formatData}
        />
    }

    /**
     * Clear filters button
     */
    static clearFilters({
        target,
        classNames,
        template
    }) {
        return <ClearFiltersComponent
            target={target}
            classNames={{
                ...InformationComponent.defaultProps.classNames,
                ...classNames
            }}
            template={template}
        />
    }

    /**
     * Search result
     */
    static result({
        target,
        itemsPerPage,
        highlightsEnabled,
        classNames,
        template,
        formatData
    }) {
        return <ResultComponent
            target={target}
            itemsPerPage={itemsPerPage}
            highlightsEnabled={highlightsEnabled}
            classNames={{
                ...ResultComponent.defaultProps.classNames,
                ...classNames
            }}
            template={template}
            formatData={formatData}
        />
    }

    /**
     * Search result information
     */
    static information({
        target,
        classNames,
        template,
        formatData
    }) {
        return <InformationComponent
            target={target}
            classNames={{
                ...InformationComponent.defaultProps.classNames,
                ...classNames
            }}
            template={template}
            formatData={formatData}
        />
    }

    /**
     * Search result information
     */
    static pagination({
        target,
        classNames
    }) {
        return <PaginationComponent
            target={target}
            classNames={{
                ...InformationComponent.defaultProps.classNames,
                ...classNames
            }}
        />
    }
}

export default WidgetFactory;