import Input from "./Widgets/Input";
import Result from "./Widgets/Result";

export default class WidgetFactory {
    static input(target, settings) {
        return new Input(
            target,
            settings
        );
    };

    // ... more widgets
    static result(target, settings) {
        return new Result(
            target,
            settings
        );
    }
}