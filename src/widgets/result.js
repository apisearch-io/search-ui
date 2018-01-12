/**
 * @jsx h
 */

import { h, createElement } from 'preact';
import ResultComponent from "../components/Result/ResultComponent";

/**
 * Result
 *
 * @param target
 * @param itemsPerPage
 * @param promote
 * @param exclude
 * @param highlightsEnabled
 * @param classNames
 * @param template
 * @param formatData
 * @returns {XML}
 */
export const result = ({
    target,
    itemsPerPage,
    promote,
    exclude,
    highlightsEnabled,
    classNames,
    template,
    formatData
}) => {
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
};