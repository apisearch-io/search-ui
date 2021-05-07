import { h, Component } from 'preact';
import {TemplateProps} from "./TemplateProps";
import * as Mustache from 'mustache';
import Translate from "./Translate";

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
    private renderTemplate = (template, result, dictionary) => {

        const trans = () => {
            return (text, render) => {
                return render(Translate.trans(text, dictionary));
            };
        };

        const output = Mustache.render(template, {...result, ...{
            "trans": trans,
        }});

        return {
            __html: output,
        };
    };

    /**
     * Render
     *
     * @return {any}
     */
    public render() {

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
