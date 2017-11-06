/** @jsx h */
import {h} from 'preact';
import {deep, shallow} from 'preact-render-spy';
import InformationComponent from './../InformationComponent';
import Template from '../../Template';

describe('<InformationComponent />',() => {
    const data = {
        total_hits: 12,
        total_items: 32
    }
    const templateString = {
        container: `
            <span class="total-hits">{{total_hits}}</span>
            <span class="total-items">{{total_items}}</span>
        `
    };

    it('should render with default props', () => {
        const tree = deep(<InformationComponent
            target={'#some-tagret'}
            template={templateString}
            data={data}
        />);

        expect(tree).toMatchSnapshot();
    });
    it('should render with custom props', () => {
        /**
         * Full custom props available object
         */
        const customProps = {
            classNames: {
                container: 'custom-container-class',
            }
        };

        const tree = deep(<InformationComponent
            target={'#some-tagret'}
            template={templateString}
            data={data}
            {...customProps}
        />);

        expect(tree).toMatchSnapshot();
    });
});