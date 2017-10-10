/**
 * Abstract component class
 * It works as an interface
 */
export default class AbstractReadWidget {
    constructor(target) {
        if (this.constructor.name === AbstractReadWidget) {
            throw TypeError(`You can't instantiate an Abstract class`);
        }

        if (typeof this.render === 'undefined') {
            throw new TypeError(`render() method must be implemented.`);
        }

        this.target = target;
    }
}