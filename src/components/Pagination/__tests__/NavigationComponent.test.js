/**
 * @jsx h
 */
import {h} from 'preact';
import {deep} from 'preact-render-spy';
import NavigationComponent from './../NavigationComponent';
import Template from '../../Template';

describe('<NavigationComponent />',() => {
    const defaultProps = {
        classNames:`navigation-component-class`,
        template: `(((Template)))`,
    };

    it('should render if isVisible is set to true', () => {
        let tree = getNavigationComponent({
            ...defaultProps,
            isVisible: true
        });

        expect(tree).toMatchSnapshot();
    });
    it('should NOT render if isVisible is set to false', () => {
        let tree = getNavigationComponent({
            ...defaultProps,
            isVisible: false
        });

        expect(tree).toMatchSnapshot();
    });
    it('should handleClick()', () => {
        let mock = jest.fn();
        let tree = getNavigationComponent({
            ...defaultProps,
            isVisible: true,
            handleClick: mock
        });

        tree.find('.navigation-component-class').at(0).simulate('click');

        expect(mock).toBeCalled();
    });


    const getNavigationComponent = ({
        isVisible,
        classNames,
        template,
        handleClick
    }) => {
        return deep(
            <NavigationComponent
                isVisible={isVisible}
                classNames={classNames}
                template={template}
                handleClick={handleClick}
            />
        );
    }
});