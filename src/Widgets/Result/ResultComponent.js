/** @jsx h */
import { h, Component } from 'preact';
import Template from "../Template";

class ResultComponent extends Component {
    constructor() {
        super();
    }

    render() {
        const {
            className,
            data,
            template
        } = this.props;

        return (
            <div className={`asui-result ${className ? className : ''}`}>
                <Template
                    template={template.header}
                />

                <Template
                    template={template.body}
                    data={data}
                />

                <Template
                    template={template.footer}
                />
            </div>
        )
    }
}

export default ResultComponent;