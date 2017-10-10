/**
 * Abstract widget class
 * It works as an interface
 */
export default class AbstractReadWriteWidget {
    constructor(target) {
        if (this.constructor.name === AbstractReadWriteWidget) {
            throw TypeError(`You can't instantiate an Abstract class`);
        }

        if (typeof this.render === 'undefined') {
            throw new TypeError(`render() method must be implemented.`);
        }

        if (typeof this.updateQuery === 'undefined') {
            throw new TypeError(`updateQuery() method must be implemented.`);
        }

        this.target = target;
    }
}