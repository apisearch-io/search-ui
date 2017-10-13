import InputText from "./Widgets/InputText";
import Result from "./Widgets/Result";
import Hits from "./Widgets/Hits";
import SortBy from "./Widgets/SortBy";

export default class WidgetFactory {
    static inputText(target, settings) {
        return new InputText(
            target,
            settings
        );
    };

    static sortBy(target, settings) {
        return new SortBy(
            target,
            settings
        );
    }

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