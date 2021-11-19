import Utils from "../../utils/utils";
import { VariableDayNumber, VariableDayType } from "../enums";
import IDateMonthCalculator from "./iDateMonthCalculator";

export default class DateMonthCalculatorVariableDay implements IDateMonthCalculator {
    private readonly _variableDayType: VariableDayType;
    private readonly _frecuencyVariableDay: VariableDayNumber;
    private readonly _everyMonths: number;
    private _firstExecution: boolean;

    constructor(variableDayType: VariableDayType, frecuencyVariableDay: VariableDayNumber, everyMonths: number) {
        this._everyMonths = everyMonths;
        this._frecuencyVariableDay = frecuencyVariableDay;
        this._variableDayType = variableDayType;
        this._firstExecution = true;
    }
    nextDate(currentDate: Date): Date {
        let nextDate: Date = new Date(currentDate);
        let currentDateTemp: Date = new Date(currentDate);
        if (this._everyMonths > 0 && this._firstExecution === false) {
            nextDate = new Date(
                nextDate.getFullYear(),
                nextDate.getMonth() + this._everyMonths,
                1);
            currentDateTemp = new Date(nextDate);
        }
        let nextTempDate: Date = new Date(nextDate.getFullYear(), nextDate.getMonth(), 1, 0, 0, 0);
        const daysInMonth: number = Utils.getDaysInMonth(nextDate.getFullYear(), nextDate.getMonth());

        if (this._variableDayType > 7) {
            //week
        }
        let dictionaryDays = this.getStepsDays(daysInMonth, nextTempDate);

        if (this._frecuencyVariableDay > 0) {
            nextDate = dictionaryDays.get(this._frecuencyVariableDay);
        }
        else {
            nextDate = Array.from(dictionaryDays.values()).pop();
        }

        if (nextDate < currentDateTemp) {
            nextTempDate = new Date(nextDate.getFullYear(), nextDate.getMonth() + 1, 1, 0, 0, 0);
            dictionaryDays = this.getStepsDays(daysInMonth, nextTempDate);

            if (this._frecuencyVariableDay > 0) {
                nextDate = dictionaryDays.get(this._frecuencyVariableDay);
            }
            else {
                nextDate = Array.from(dictionaryDays.values()).pop();
            }
        }

        this._firstExecution = false;
        return nextDate;
    }


    private getStepsDays(daysInMonth: number, nextTempDate: Date) {
        const dictionaryDays = new Map();
        let numberOcurrsDay = 0;
        //const initialDay: number = nextTempDate.getDate();
        for (let index = 1; index <= daysInMonth; index++) {
            if (Utils.getDaySpanishFormat(nextTempDate) === this._variableDayType) {
                numberOcurrsDay++;
                dictionaryDays.set(numberOcurrsDay, new Date(nextTempDate));

            }
            if (nextTempDate.getDate() === daysInMonth && numberOcurrsDay < this._frecuencyVariableDay) {
                index = 1;
            }
            nextTempDate.setDate(nextTempDate.getDate() + 1);
        }
        return dictionaryDays;
    }
}