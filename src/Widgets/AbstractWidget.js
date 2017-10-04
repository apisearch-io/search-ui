export default class AbstractWidget {
    constructor(target) {
        if (this.constructor.name === AbstractWidget) {
            throw TypeError(`You can't instantiate an Abstract class`);
        }

        if (typeof this.render === 'undefined') {
            throw new TypeError(`render() method must be implemented.`);
        }

        this.target = target;
    }
}