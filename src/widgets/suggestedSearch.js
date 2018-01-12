/**
 * @jsx h
 */

import { h, createElement } from 'preact';
import SuggestedSearchComponent from "../components/SuggestedSearch/SuggestedSearchComponent";

/**
 * Suggested Search
 *
 * @param target
 * @param placeholder
 * @param autofocus
 * @param startSearchOn
 * @param classNames
 * @param template
 * @returns {XML}
 */
export const suggestedSearch = ({
    target,
    placeholder,
    autofocus,
    startSearchOn,
    classNames,
    template
}) => {
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
};