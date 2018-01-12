/**
 * @jsx h
 */

import { h, createElement } from 'preact';
import SimpleSearchComponent from "../components/SimpleSearch/SimpleSearchComponent";

/**
 * Simple search
 *
 * @param target
 * @param placeholder
 * @param startSearchOn
 * @param autofocus
 * @param classNames
 * @param template
 * @returns {XML}
 */
export const simpleSearch = ({
    target,
    placeholder,
    startSearchOn,
    autofocus,
    classNames,
    template
}) => {
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