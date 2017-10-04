import Input from "./Widgets/Input";

export default class WidgetFactory {
    static input(target, settings) {
        return new Input(
            target,
            settings
        );
    };

    // ... more widgets
}