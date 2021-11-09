import { FrecuencyVariableDay, VariableDayType } from "../enums";
import IDateMonthCalculator from "./iDateMonthCalculator";

export default class DateMonthCalculatorVariableDay implements IDateMonthCalculator {
    private readonly _variableDayType: VariableDayType;
    private readonly _frecuencyVariableDay: FrecuencyVariableDay;
    private readonly _everyMonths: number

    constructor(variableDayType: VariableDayType, frecuencyVariableDay: FrecuencyVariableDay, everyMonths: number) {
        this._everyMonths = everyMonths;
        this._frecuencyVariableDay = frecuencyVariableDay;
        this._variableDayType = variableDayType;
    }
    nextDate(currentDate: Date): Date {
        throw new Error("Method not implemented.");
    }

}