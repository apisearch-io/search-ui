import Input from "./Widgets/Input";
import Hits from "./Widgets/Hits";

export default class WidgetFactory {
    static input(target, settings) {
        return new Input(
            target,
            settings
        );
    };

    static hits(target, settings) {
        return new Hits(
            target,
            settings
        )
    }
}