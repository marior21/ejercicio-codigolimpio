
class Configuration {
    private readonly _type: Types;
    private readonly _onceDate: Date;
    private readonly _ocurrs: Ocurrs;
    private readonly _frecuency: number;
    private readonly _enabled: boolean;

    constructor(type: Types, onceDate: Date, ocurrs: Ocurrs, frecuency: number, enabled: boolean) {
        this._type = type;
        this._onceDate = onceDate;
        this._ocurrs = ocurrs;
        this._frecuency = frecuency;
        this._enabled = enabled;
        this.validateArguments();
    }

    get type(): Types {
        return this._type;
    }

    get onceDate(): Date {
        return this._onceDate;
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
        if (this._type === null) {
            throw new Error("The Type must have a value");
        }
        if (this._type === Types.Once && this._onceDate === null) {
            throw new Error("If the Type is Once, the Once Date must have a value");
        }
        if (this._type === Types.Recurring) {
            if (this._ocurrs === null) {
                throw new Error("If the type is Recurring, ocurrs must have a value");
            }
            if (this._frecuency === null) {
                throw new Error("If the type is recurring, frecuency must have a value");
            }
        }
        if (this._enabled === null) {
            throw new Error("Enabled must have a value");
        }
    }
}