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
import SimpleSearchComponent from "../components/SimpleSearch/SimpleSearchComponent";
import SuggestedSearchComponent from "../components/SuggestedSearch/SuggestedSearchComponent";
import SortByComponent from "../components/SortBy/SortByComponent";
import MultipleFilterComponent from "../components/MultipleFilter/MultipleFilterComponent";
import ResultComponent from "../components/Result/ResultComponent";
import InformationComponent from "../components/Information/InformationComponent";
import ClearFiltersComponent from "../components/ClearFilters/ClearFiltersComponent";
import PaginationComponent from "../components/Pagination/PaginationComponent";

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
        startSearchOn,
        autofocus,
        classNames,
        template
    }) {
        return <SimpleSearchComponent
            target={target}
            placeholder={placeholder}
            autofocus={autofocus}
            startSearchOn={startSearchOn}
            classNames={{
                ...SimpleSearchComponent.defaultProps.classNames,
                ...classNames
            }}
            template={{
                ...SimpleSearchComponent.defaultProps.template,
                ...template
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
        startSearchOn,
        classNames,
        template
    }) {
        return <SuggestedSearchComponent
            target={target}
            placeholder={placeholder}
            autofocus={autofocus}
            startSearchOn={startSearchOn}
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
        promote,
        exclude,
        highlightsEnabled,
        classNames,
        template,
        formatData
    }) {
        return <ResultComponent
            target={target}
            itemsPerPage={itemsPerPage}
            promote={promote}
            exclude={exclude}
            highlightsEnabled={highlightsEnabled}
            classNames={{
                ...ResultComponent.defaultProps.classNames,
                ...classNames
            }}
            template={{
                ...ResultComponent.defaultProps.template,
                ...template
            }}
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
        padding,
        goFirstLast,
        classNames,
        template
    }) {
        return <PaginationComponent
            target={target}
            padding={padding}
            goFirstLast={goFirstLast}
            classNames={{
                ...PaginationComponent.defaultProps.classNames,
                ...classNames
            }}
            template={{
                ...PaginationComponent.defaultProps.template,
                ...template
            }}
        />
    }
}

export default WidgetFactory;