import { Ocurrs } from "./enums";

export default class ConfigurationRecurring {
    private readonly _ocurrs: Ocurrs;
    private readonly _frecuency: number;
    private readonly _enabled: boolean;
    constructor(ocurrs: Ocurrs, frecuency: number, enabled: boolean) {
        this._ocurrs = ocurrs;
        this._frecuency = frecuency;
        this._enabled = enabled;
        this.validateArguments();
    }

    get ocurrs(): Ocurrs {
        return this._ocurrs;
    }

    get frecuency(): number {
        return this._frecuency;
    }

    get enabled(): boolean {
        return this._enabled;
    }

    validateArguments(): void {
        if (this._ocurrs === null) {
            throw new Error("Ocurrs must have a value");
        }
        if (this._frecuency === null) {
            throw new Error("Frecuency must have a value");
        }
        if (this._enabled === null) {
            throw new Error("Enabled must have a value");
        }
    }
}