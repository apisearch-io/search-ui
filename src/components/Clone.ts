class Clone {
    static object(object) {
        return Object.assign(Object.create(Object.getPrototypeOf(object)), object);
    }
}

export default Clone;
