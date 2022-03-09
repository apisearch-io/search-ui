import {Repository} from "apisearch";
import Store from "../../Store";

/**
 * RangeFilterProps
 */
export interface RangeFilterProps {
    target: any;
    filterName: string;
    filterField: string;
    minValue: number;
    maxValue: number;
    minMaxCallback: (min: number, max: number) => void;
    step: number;
    callback: (from: number, to: number, min: number, max: number, rangeUid: string, currencyPlaceholder: string) => void;
    onSliderMove: (from: number, to: number, min: number, max: number, rangeUid: string, currencyPlaceholder: string) => void;
    classNames: {
        container: string,
        top: string,
        wrapper: string,
        input: string,
        from: string,
        to: string,
    };
    attributes: {
        from: string,
        to: string,
    };
    native: boolean;
    template: {
        top: string,
        slider: string,
    };
    environmentId?: string;
    repository?: Repository;
    store?: Store;
    dictionary?: { [key: string]: string; };
}
