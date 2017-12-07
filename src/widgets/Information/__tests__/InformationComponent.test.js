/** @jsx h */
import {h} from 'preact';
import {deep, shallow} from 'preact-render-spy';
import InformationComponent from './../InformationComponent';
import Template from '../../Template';

describe('<InformationComponent />',() => {
    const defaultProps = {
        target: '#some-tagret',
    };
    const data = {
        total_hits: 12,
        total_items: 32
    }

    it('should render with default props', () => {
        const tree = deep(
            <InformationComponent
                {...defaultProps}
                data={data}
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
    it('should render with custom props', () => {
        /**
         * Full custom props available object
         */
        const customProps = {
            classNames: {
                container: 'custom-container-class',
            },
            template: {
                container: `
                    <span class="total-hits">{{total_hits}}</span>
                    <span class="total-items">{{total_items}}</span>
                `
            }
        };

        const tree = deep(
            <InformationComponent
                {...defaultProps}
                {...customProps}
                data={data}
            />
        );

        expect(tree).toMatchSnapshot();
    });
    it('should update content when passing new data', () => {
        const tree = deep(
            <InformationComponent
                {...defaultProps}
                data={data}
            />
        );

        const updatedDataProps = {
            total_hits: 34,
            total_items: 67
        }
        tree.render(
            <InformationComponent
                {...defaultProps}
                data={updatedDataProps}
            />
        )

        expect(tree).toMatchSnapshot();
    });
});