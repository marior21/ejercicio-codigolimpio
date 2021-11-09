import { FrecuencyVariableDay, MonthlyFrecuencyType, VariableDayType } from "../enums";

export default class MonthlyConfiguration {
    private readonly _frecuencyType: MonthlyFrecuencyType;
    private readonly _day: number;
    private readonly _everyMonths: number;
    private readonly _frecuencyVariableDay: FrecuencyVariableDay;
    private readonly _variableDayType: VariableDayType;

    constructor(
        frecuencyType: MonthlyFrecuencyType,
        day: number,
        everyMonths: number,
        frecuencyVariableDay: FrecuencyVariableDay,
        variableDayType: VariableDayType) {

        this._frecuencyType = frecuencyType;
        this._day = day;
        this._everyMonths = everyMonths;
        this._frecuencyVariableDay = frecuencyVariableDay;
        this._variableDayType = variableDayType;
        this.validateArguments();
    }

    get frecuencyType(): MonthlyFrecuencyType {
        return this._frecuencyType;
    }

    get day(): number {
        return this._day;
    }

    get everyMonths(): number {
        return this._everyMonths;
    }

    get frecuencyVariableDay(): FrecuencyVariableDay {
        return this._frecuencyVariableDay;
    }

    get variableDayType(): VariableDayType {
        return this._variableDayType;
    }

    validateArguments(): void {
        if (this.frecuencyType == null) {
            throw new Error('frecuencyType must have a value')
        }

        if (this.frecuencyType === MonthlyFrecuencyType.excatDay) {
            if (this.day == null || this.day === 0) {
                throw new Error('day mus have a value in MonthlyFrecuencyType.excatDay');
            }
        }

        if (this.frecuencyType === MonthlyFrecuencyType.variableDay) {
            if (this.frecuencyVariableDay == null) {
                throw new Error('frecuencyVariableDay must have a value');
            }
            if (this.variableDayType == null) {
                throw new Error('variableDayType must have a value');
            }
        }
        if (this.everyMonths == null || this.everyMonths == 0) {
            throw new Error('everyMonths mut have a value');
        }
    }
}