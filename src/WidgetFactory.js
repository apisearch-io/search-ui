import InputText from "./Widgets/InputText";
import Result from "./Widgets/Result";
import Hits from "./Widgets/Hits";

export default class WidgetFactory {
    static inputText(target, settings) {
        return new InputText(
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

    static hits(target, settings) {
        return new Hits(
            target,
            settings
        );
    }
}