import Utils from "../../utils/utils";
import { VariableDayNumber, VariableDayType } from "../enums";
import IDateMonthCalculator from "./iDateMonthCalculator";

export default class DateMonthCalculatorVariableDay implements IDateMonthCalculator {
    private readonly _variableDayType: VariableDayType;
    private readonly _frecuencyVariableDay: VariableDayNumber;
    private readonly _everyMonths: number

    constructor(variableDayType: VariableDayType, frecuencyVariableDay: VariableDayNumber, everyMonths: number) {
        this._everyMonths = everyMonths;
        this._frecuencyVariableDay = frecuencyVariableDay;
        this._variableDayType = variableDayType;
    }
    nextDate(currentDate: Date): Date {
        let nextDate: Date = new Date(currentDate);
        const nextTempDate: Date = new Date(currentDate);
        const daysInMonth: number = Utils.getDaysInMonth(nextDate.getFullYear(), nextDate.getMonth());

        if (this._variableDayType > 7) {
            //week
        }
        const dictonaryDays = new Map();
        let numberOcurrsDay = 0;
        const initialDay: number = nextTempDate.getDate();
        for (let index = initialDay; index <= daysInMonth; index++) {
            if (Utils.getDaySpanishFormat(nextTempDate) === this._variableDayType) {
                numberOcurrsDay++;
                dictonaryDays.set(numberOcurrsDay, new Date(nextTempDate));

            }
            if (nextTempDate.getDate() === daysInMonth && numberOcurrsDay === 0) {
                index = 1;
            }
            nextTempDate.setDate(nextTempDate.getDate() + 1);
        }

        if (this._frecuencyVariableDay > 0) {
            nextDate = dictonaryDays.get(this._frecuencyVariableDay);
        }
        else {
            nextDate = dictonaryDays.values[dictonaryDays.size - 1];
        }
        if (this._everyMonths === 344) {
            //TODO
        }

        return nextDate;
    }

}