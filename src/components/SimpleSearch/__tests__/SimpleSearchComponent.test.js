/** @jsx h */
import {h} from 'preact';
import {shallow, deep} from 'preact-render-spy';
import SimpleSearchComponent from './../SimpleSearchComponent';

describe('<SimpleSearchComponent />', () => {
    const defaultProps = {
        target: '#some-tagret',
        currentQuery: {
            q: ''
        }
    };

    it('should render with default props', () => {
        const tree = shallow(
            <SimpleSearchComponent {...defaultProps} />
        );

        expect(tree).toMatchSnapshot();
    });
    it('should render with custom props', () => {
        /**
         * Full custom props available object
         */
        const customProps = {
            placeholder: 'Type something...',
            classNames: {
                container: 'custom-container-class'
            }
        };

        const tree = shallow(
            <SimpleSearchComponent
                {...defaultProps}
                {...customProps}
            />
        );

        expect(tree).toMatchSnapshot();
    });
    it('should render only the input when "withContainer" property is set to false', () => {
        const tree = shallow(
            <SimpleSearchComponent
                {...defaultProps}
                withContainer={false}
                clearSearch={false}
            />
        );

        expect(tree).toMatchSnapshot();
    });
    it('should render new html properties when "htmlNodeInheritProps" are passed', () => {
        /**
         * This is due when the targeted node is an input
         * instead of a container. When the system takes the selected "input"
         * gets its current properties and replaces this input with the
         * SimpleSearchComponent input.
         */
        const tree = shallow(
            <SimpleSearchComponent
                {...defaultProps}
                htmlNodeInheritProps={{
                    'className': 'some-class-name',
                    'data-apisearch': 'apisearch-search-bar',
                    'id': 'some-id',
                    'autocomplete': 'off',
                    'spellcheck': 0
                }}
                withContainer={false}
                clearSearch={false}
            />
        );

        expect(tree).toMatchSnapshot();
    });
    it('should handleSearch() on input event', () => {
        const tree = shallow(
            <SimpleSearchComponent {...defaultProps} />
        );

        tree.find('input')[0].attributes.onInput = jest.fn();
        tree.find('input').simulate('input', 'this is a search query text');

        expect(
            tree.find('input').attr('onInput')
        ).toBeCalledWith('this is a search query text')
    });
    it('should appear a clearSearch button when the input value is not empty, and should handle clearSearch() on click', () => {
        /**
         * A text is typed on the input
         */
        const tree = deep(
            <SimpleSearchComponent
                {...defaultProps}
                currentQuery={{q: 'Some query text...'}}
            />
        );
        expect(tree).toMatchSnapshot();

        /**
         * The clearSearch button is clicked
         */
        const trigger = jest.fn();
        tree.find('.as-simpleSearch__clearSearch')[0].attributes.onClick = trigger;
        tree.find('.as-simpleSearch__clearSearch').simulate('click');
        expect(trigger).toBeCalled();
    });
});