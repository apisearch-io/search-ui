/**
 * @jsx h
 */

import { h, createElement } from 'preact';
import InformationComponent from "../components/Information/InformationComponent";

export const information = ({
    target,
    classNames,
    template,
    formatData
}) => {
    return <InformationComponent
        target={target}
        classNames={{
            ...InformationComponent.defaultProps.classNames,
            ...classNames
        }}
        template={template}
        formatData={formatData}
    />
};