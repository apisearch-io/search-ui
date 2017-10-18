import InputText from "./Widgets/Search/SearchComponent";
import Result from "./Widgets/Result/ResultComponent";

/**
 * Widgets factory class
 */
export default class WidgetFactory {
    static inputText(target, settings) {
        return new InputText(
            target,
            settings
        );
    };

    static result(target, settings) {
        return new Result(
            target,
            settings
        );
    }
}