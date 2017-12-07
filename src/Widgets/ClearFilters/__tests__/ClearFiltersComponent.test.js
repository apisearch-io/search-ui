/** @jsx h */
import {h} from 'preact';
import {deep, shallow} from 'preact-render-spy';
import ClearFiltersComponent from './../ClearFiltersComponent';

describe('<ClearFiltersComponent />',() => {
    const defaultProps = {
        target: '#some-tagret',
    };
    const customProps = {
        classNames: {
            container: 'some-custom-container-class'
        },
        template: {
            container: '<button>Clear this awesome filters!</button>'
        }
    };
    const newData = {
        currentQuery: {
            filters: {
                year: {
                    field: "indexed_metadata.year",
                    values: ["1995"]
                }
            }
        }
    };

    it('it should not render if any filter is active', () => {
        const tree = deep(
            <ClearFiltersComponent {...defaultProps} />
        );

        /**
         * Testing rendered html
         */
        expect(tree).toMatchSnapshot();
    });
    it('should render if some filter filter is active with default props', () => {
        const tree = deep(
            <ClearFiltersComponent {...defaultProps} />
        );

        tree.render(
            <ClearFiltersComponent
                {...defaultProps}
                {...newData}
            />
        );

        /**
         * Testing the default props tree
         */
        expect(tree.component().props).toMatchSnapshot();

        /**
         * Testing rendered html
         */
        expect(tree).toMatchSnapshot();
    });
    it('should render if some filter filter is active with custom props', () => {
        const tree = deep(
            <ClearFiltersComponent
                {...defaultProps}
                {...customProps}
            />
        );

        tree.render(
            <ClearFiltersComponent
                {...defaultProps}
                {...customProps}
                {...newData}
            />
        );

        /**
         * Testing the default props tree
         */
        expect(tree.component().props).toMatchSnapshot();

        /**
         * Testing rendered html
         */
        expect(tree).toMatchSnapshot();
    });
    it('should handleCLick() remove filters and hide himself', () => {
        const tree = deep(
            <ClearFiltersComponent {...defaultProps} />
        );
        tree.render(
            <ClearFiltersComponent
                {...defaultProps}
                {...newData}
            />
        );

        const mock = jest.fn();
        tree.find('.as-clearFilters')[0].attributes.onClick = mock;
        tree.find('.as-clearFilters').at(0).simulate('click');

        /**
         * Mocking onCLick functionality
         */
        tree.setState({showClearFilters: false});

        /**
         * Expect onClick to be called
         */
        expect(mock).toBeCalled();

        /**
         * Testing rendered html
         */
        expect(tree).toMatchSnapshot();
    });
});