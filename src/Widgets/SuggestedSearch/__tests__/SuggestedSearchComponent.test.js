/** @jsx h */
import {h} from 'preact';
import {shallow} from 'preact-render-spy';
import SuggestedSearchComponent from './../SuggestedSearchComponent';

describe('<SuggestedSearchComponent />',() => {
    const defaultProps = {
        target: '#some-tagret'
    };
    const receivedData = {
        suggests: [
            'suggestion 1',
            'suggestion 2',
            'suggestion 3'
        ]
    };

    it('should render with default props', () => {
        const tree = shallow(
            <SuggestedSearchComponent {...defaultProps} />
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
    it('should render with custom props', () => {
        /**
         * Full custom props available object
         */
        const customProps = {
            placeholder: 'Type to get suggestions...',
            autofocus: true,
            classNames: {
                container: 'custom-container-class',
                input: 'custom-input-class',
                box: 'custom-box-class',
                suggestion: 'custom-suggestion-class',
                activeSuggestion: 'custom-active-suggestion-class'
            }
        };

        const tree = shallow(
            <SuggestedSearchComponent
                {...defaultProps}
                {...customProps}
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
    it('should handleSearch() on input event', () => {
        const tree = shallow(
            <SuggestedSearchComponent {...defaultProps} />
        );

        /**
         * HandleSearch() mock
         */
        tree.find('input')[0].attributes.onInput = jest.fn();
        tree.find('input').simulate('input', 'i want to get suggestions');

        expect(
            tree.find('input').attr('onInput')
        ).toBeCalledWith('i want to get suggestions');
    });
    it('should componentWillReceiveProps() with suggestions and render it', () => {
        const tree = getUpdatedSuggestedSearchComponent();

        /**
         * Check suggestions state
         */
        expect(tree.state('currentSuggestions')).toMatchSnapshot();
        /**
         * Check rendered html
         */
        expect(tree).toMatchSnapshot();
    });
    it('should handleSuggestionsNavigation() and re-render the list being the last suggestion the active one', () => {
        const tree = getUpdatedSuggestedSearchComponent();
        const mockedArrowDownEvent = { code: 'ArrowDown' };

        /**
         * Navigate through suggestions
         * 3 suggestions down
         */
        tree.find('input').simulate('keyDown', mockedArrowDownEvent);
        tree.find('input').simulate('keyDown', mockedArrowDownEvent);
        tree.find('input').simulate('keyDown', mockedArrowDownEvent);

        /**
         * This last event won't do anything
         * since there are only three suggestions
         * to navigate
         */
        tree.find('input').simulate('keyDown', mockedArrowDownEvent);

        expect(tree.state('currentSuggestions')).toMatchSnapshot();
        expect(tree).toMatchSnapshot();
    });
    it('should handleSuggestionsNavigation() and re-render the list being the first suggestion the active one', () => {
        const tree = getUpdatedSuggestedSearchComponent();
        const mockedArrowDownEvent = { code: 'ArrowDown' };
        const mockedArrowUpEvent = { code: 'ArrowUp', preventDefault: jest.fn() };

        /**
         * Navigate through suggestions
         * 2 suggestions down, 1 suggestion up
         */
        tree.find('input').simulate('keyDown', mockedArrowDownEvent);
        tree.find('input').simulate('keyDown', mockedArrowDownEvent);
        tree.find('input').simulate('keyDown', mockedArrowUpEvent);

        expect(tree.state('currentSuggestions')).toMatchSnapshot();
        expect(tree).toMatchSnapshot();
    });
    it('should handleSuggestionClick(), select the clicked suggestion and close the box', () => {
        const tree = getUpdatedSuggestedSearchComponent();
        const mock = jest.fn();

        tree.find('.asui-suggestedSearch--suggestion')[2].attributes.onClick = mock;
        tree.find('.asui-suggestedSearch--suggestion').at(2).simulate('click');
        tree.setState({
            q: tree.find('.asui-suggestedSearch--suggestion').at(2).text(),
            currentSuggestions: []
        });

        expect(mock).toBeCalled();
        expect(tree).toMatchSnapshot();
    });
    it('should handleSearchInputFocusedOut() and close the suggestions box', () => {
        const tree = getUpdatedSuggestedSearchComponent();
        const mockedBlurEvent = { relatedTarget: null };

        /**
         * Click outside input value,
         * and outside relatedTarget value "suggestions box"
         */
        tree.find('input').simulate('blur', mockedBlurEvent);

        expect(tree).toMatchSnapshot();
    });

    /**
     * Return a Shallowed Suggested search component
     * with an updated state and props
     */
    const getUpdatedSuggestedSearchComponent = () => {
        const tree = shallow(
            <SuggestedSearchComponent {...defaultProps} />
        );

        /**
         * Simulation of handleSearch functionality
         * setting the state of the query
         * and changing its props
         */
        tree.setState({q: 'i want to get suggestions'});

        /**
         * Triggering componentWillReceiveProps(...props)
         * with this preact-render-spy hack
         */
        tree.render(
            <SuggestedSearchComponent
                {...defaultProps}
                data={receivedData}
            />
        );

        return tree;
    }
});