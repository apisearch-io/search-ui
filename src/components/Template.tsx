import { h, Component } from 'preact';
import {TemplateProps} from "./TemplateProps";
import * as Mustache from 'mustache';

/**
 * Template
 */
class Template extends Component<TemplateProps> {

    /**
     * Render template
     *
     * @param template
     * @param result
     * @param dictionary
     *
     * @return {any}
     */
    renderTemplate = (template, result, dictionary) => {

        let trans = function() {
            return function(text, render) {
                return dictionary[text] ?? text;
            }
        }

        let output = Mustache.render(template, {...result, ...{
            'trans': trans
        }});

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
        const dictionary = props.dictionary ?? {};

        return (template)
            ? <div
                className={className}
                dangerouslySetInnerHTML={this.renderTemplate(template, data, dictionary)}
            />
            : null
        ;
    }
}

export default Template;
