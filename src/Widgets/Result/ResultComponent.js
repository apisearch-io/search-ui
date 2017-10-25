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
                    className={`asui-result-header`}
                />

                <Template
                    template={template.body}
                    data={data}
                    className={`asui-result-body`}
                />

                <Template
                    template={template.footer}
                    className={`asui-result-footer`}
                />
            </div>
        )
    }
}

export default ResultComponent;