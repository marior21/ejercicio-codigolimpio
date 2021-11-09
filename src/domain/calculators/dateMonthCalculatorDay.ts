import IDateMonthCalculator from "./iDateMonthCalculator";

export default class DateMonthCalculatorDay implements IDateMonthCalculator {
    private readonly _day: number;
    private readonly _everyMonths: number;
    constructor(day: number, everyMonths: number) {
        this._day = day;
        this._everyMonths = everyMonths;
    }
    nextDate(currentDate: Date): Date {
        throw new Error("Method not implemented.");
    }

}