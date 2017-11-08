/** @jsx h */
import {h} from 'preact';
import {shallow} from 'preact-render-spy';
import Template from "../Template";

describe('<SimpleSearchComponent />',() => {
    const passedProps = {
        className: 'template-custom-class',
        template: `<div>Render this --> {{name}}</div>`,
        data: {
            name: 'Apisearch'
        }
    };

    it('should render with passed props', () => {
        const tree = shallow(
            <Template {...passedProps} />
        );

        expect(tree).toMatchSnapshot();
    });
    it('should update with new data', () => {
        const tree = shallow(
            <Template {...passedProps} />
        );
        const newData = {
            name: 'Apisearch UI'
        };

        tree.render(
            <Template
                {...passedProps}
                data={newData}
            />
        );

        expect(tree).toMatchSnapshot();
    });
});