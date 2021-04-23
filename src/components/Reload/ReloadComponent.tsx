import { h, Component } from "preact";
import Template from "../Template";
import {reloadAction} from "./ReloadActions";
import {ReloadProps} from "./ReloadProps";

/**
 * ReloadComponent
 */
class ReloadComponent extends Component<ReloadProps> {

    /**
     * Handle click
     */
    public handleClick = () => {

        const props = this.props;
        const environmentId = props.environmentId;
        const currentQuery = props.store.getCurrentQuery();
        const repository = props.repository;

        /**
         * Dispatch a clear filter action
         */
        reloadAction(
            environmentId,
            currentQuery,
            repository,
        );
    }

    /**
     * Render
     *
     * @return {}
     */
    public render() {

        const props = this.props;
        const containerClassName = props.classNames.container;
        const containerTemplate = props.template.container;

        return ( <div className={`as-clearFilters ${containerClassName}`}
                      onClick={this.handleClick}
            >
                <Template
                    template={containerTemplate}
                    dictionary={this.props.dictionary}
                />
            </div>
        );
    }
}

ReloadComponent.defaultProps = {
    classNames: {
        container: "",
    },
    template: {
        container: "Reload",
    },
};

export default ReloadComponent;
