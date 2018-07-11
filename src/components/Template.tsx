import { h, Component } from 'preact';
import * as Hogan from 'hogan.js';
import {TemplateProps} from "./TemplateProps";

/**
 * Template
 */
class Template extends Component<TemplateProps> {

    /**
     * Render template
     *
     * @param template
     * @param result
     *
     * @return {any}
     */
    renderTemplate = (template, result) => {
        /**
         * Compile template using hogan.js
         */
        let compiledTemplate = Hogan.compile(template);
        let output = compiledTemplate.render(result);

        return {
            __html: output
        };
    };

    /**
     * Render
     *
     * @return {any}
     */
    render() {

        const props = this.props;
        const template = props.template;
        const data = props.data;
        const className = props.className;

        return (template)
            ? <div
                className={className}
                dangerouslySetInnerHTML={this.renderTemplate(template, data)}
            />
            : null
        ;
    }
}

export default Template;