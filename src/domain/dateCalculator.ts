import Week from "./week";

export default class DateCalculator {
    private readonly _numberWeeks: number;
    private readonly _weekConfig: Week;
    constructor(numberWeeks: number, weekConfig: Week) {
        this._numberWeeks = numberWeeks;
        this._weekConfig = weekConfig;
    }

    public nextDate(currentDate: Date): Date {
        let nextDate: Date = currentDate;
        const currentWeekDay: number = currentDate.getDay();
        let numberDaysToSum = 0;
        for (let day = currentWeekDay + 1; day < 7; day++) {
            numberDaysToSum++;
            if (this._weekConfig.isDayChoosen(day)) {
                break;
            }
        }
        if (numberDaysToSum > 0) {
            nextDate.setDate(nextDate.getDate() + numberDaysToSum);
        }
        else {
            if (this._numberWeeks === 2) {
                return null;
            }
            nextDate = null;
        }

        return nextDate;
    }
}