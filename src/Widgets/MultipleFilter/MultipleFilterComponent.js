/**
 * @jsx h
 */
import { h, Component } from 'preact';

/**
 * Filter Component
 */
class MultipleFilterComponent extends Component {
    componentWillMount() {

    }

    render() {
        const {
            limit,
            classNames: {
                container: containerClassName,
                top: topClassName,
                itemsList: itemsListClassName,
                item: itemClassName
            },
            template: {
                top: topTemplate,
                item: itemTemplate
            }
        } = this.props;

        return (
            <div className={`asui-multipleFilter ${containerClassName}`}>
                Hello
            </div>
        )
    }
}

MultipleFilterComponent.defaultProps = {
    type: 'FILTER_MUST_ALL',
    limit: 10,
    classNames: {
        container: '',
        top: '',
        itemList: '',
        item: ''
    },
    template: {
        top: null,
        item: null
    }
};

export default MultipleFilterComponent;