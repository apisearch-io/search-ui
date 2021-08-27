import {h} from 'preact';
import Template from "../Template";

/**
 * Arrow navigation component
 */
function NavigationComponent({
    isVisible,
    classNames,
    template,
    handleClick
}) {
    return (isVisible)
        ? (
            <li
                className={classNames}
                onClick={handleClick}
            >
                <Template
                    template={template}
                    dictionary={this.props.dictionary}
                />
            </li>
        )
        : null
    ;
}

export default NavigationComponent;
