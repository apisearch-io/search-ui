/** @jsx h */
import {h} from 'preact';
import {deep} from 'preact-render-spy';
import {initialDataProvider, updatedDataProvider} from './dataProvider.js';
import MultipleFilterComponent from './../MultipleFilterComponent';

describe('<MultipleFilterComponent />', () => {
    const itemTemplate = `
        <a class="aggregation {{#isActive}}is-active{{/isActive}}">
            <input type="checkbox" id="filter_{{values.id}}" {{#isActive}}checked="checked"{{/isActive}}>
            <label for="filter_{{values.id}}">{{values.name}} ({{n}})</label>
        </a>           
    `;
    const defaultProps = {
        target: '#some-target',
        name: 'year',
        filterField: 'year_id',
        template: {
            item: itemTemplate
        }
    };
    const customProps = {
        target: '#some-target',
        name: 'year',
        filterField: 'year_id',
        aggregationField: 'year_data',
        applicationType: 4,
        fetchLimit: 6,
        viewLimit: 3,
        showMoreActive: true,
        classNames: {
            container: 'container-custom-class',
            top: 'top-custom-class',
            itemsList: 'itemsList-custom-class',
            item: 'item-custom-class',
            showMoreContainer: 'showMoreContainer-custom-class'
        },
        template: {
            top: 'Filter top header template:',
            item: itemTemplate,
            showMore: '<b>+ Show more</b>',
            showLess: '<b>- Show less</b>'
        }
    };

    it('should render with default props', () => {
        /**
         * Rendering component with default props (dirty)
         * Updating Store query on componentWillMount()
         * Re-rendering component with aggregations
         */
        let tree = getDirtyMultipleFilterComponent(defaultProps);
        expect(tree.component().props).toMatchSnapshot();

        tree = updateMultipleFilterComponent(tree, defaultProps, initialDataProvider);
        expect(tree).toMatchSnapshot();
    });
    it('should render with custom props, and re-render with aggregations', () => {
        /**
         * Rendering component with all custom props (dirty)
         * Updating Store query on componentWillMount()
         * Re-rendering component with aggregations
         */
        let tree = getDirtyMultipleFilterComponent(customProps);
        expect(tree.component().props).toMatchSnapshot();

        tree = updateMultipleFilterComponent(tree, customProps, initialDataProvider);
        expect(tree).toMatchSnapshot();
    });
    it('should handleCLick() given a selected aggregation and set it as active', () => {
        /**
         * Create and mount a component
         */
        const mock = jest.fn();
        let tree = getDirtyMultipleFilterComponent(customProps);
        tree = updateMultipleFilterComponent(tree, customProps, initialDataProvider);

        tree.find('.asui-multipleFilter--item')[1].attributes.onClick = mock;
        tree.find('.asui-multipleFilter--item').at(1).simulate('click');

        tree = updateMultipleFilterComponent(tree, customProps, updatedDataProvider);

        expect(mock).toBeCalled();
        expect(tree).toMatchSnapshot();
    });
    it('should handleShowMore() and handleShowLess()', () => {
        /**
         * Create and mount a component
         */
        let tree = getDirtyMultipleFilterComponent(customProps);
        tree = updateMultipleFilterComponent(tree, customProps, initialDataProvider);

        /**
         * Click on show more function
         */
        tree.find('.asui-showMore').at(0).simulate('click');
        tree = updateMultipleFilterComponent(tree, customProps, initialDataProvider);

        /**
         * It should show the third and last aggregation item
         * plus a ShowLess button
         */
        expect(tree).toMatchSnapshot();

        /**
         * Click on show less function
         */
        tree.find('.asui-showMore').at(0).simulate('click');
        tree = updateMultipleFilterComponent(tree, customProps, initialDataProvider);

        /**
         * It should hide the third and last aggregation item
         * plus a ShowMore button
         */
        expect(tree).toMatchSnapshot();
    });

    const getDirtyMultipleFilterComponent = (props) => {
        MultipleFilterComponent.prototype.componentWillMount = jest.fn();
        const tree = deep(
            <MultipleFilterComponent
                dirty={true}
                {...props}
            />
        );
        /**
         * Mocking componentWillMount functionality
         */
        tree.setState({limit: props.limit});

        return tree;
    };
    const updateMultipleFilterComponent = (tree, props, data) => {
        tree.render(
            <MultipleFilterComponent
                dirty={false}
                {...props}
                data={data}
            />
        );

        return tree;
    }
});