/** @jsx h */
import { h, Component } from 'preact';
import Hogan from 'hogan.js';

class Template extends Component {
    renderTemplate = (template, data) => {
        let compiledTemplate = Hogan.compile(template);
        let output = compiledTemplate.render(data);


        return {
            __html: output
        };
    };

    render() {
        const {
            template,
            data,
            className
        } = this.props;

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