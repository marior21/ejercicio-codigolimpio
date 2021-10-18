import Week from "./week";

export default class DateCalculator {
    private readonly _numberWeeks: number;
    private readonly _weekConfig: Week;
    constructor(numberWeeks: number, weekConfig: Week) {
        this.validateArguments(numberWeeks, weekConfig);
        this._numberWeeks = numberWeeks;
        this._weekConfig = weekConfig;
    }
    private validateArguments(numberWeeks: number, weekConfig: Week) {
        if (numberWeeks === 0) {
            throw new Error("The number of weeks should be grater than zero");
        }
        if (weekConfig == null) {
            throw new Error("weekConfig is required");
        }
        if (weekConfig.isEmpty()) {
            throw new Error("weekConfig should not be empty");
        }
    }

    public nextDate(currentDate: Date): Date {
        const nextDate: Date = currentDate;
        let currentWeekDay: number = currentDate.getDay();
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
            nextDate.setDate(nextDate.getDate() + (this._numberWeeks * 7));
            currentWeekDay = nextDate.getDay();
            numberDaysToSum = 0;
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
                nextDate.setDate(nextDate.getDate() + 1);
                currentWeekDay = nextDate.getDay();

                for (let day = currentWeekDay; day < 7; day++) {
                    numberDaysToSum++;
                    if (this._weekConfig.isDayChoosen(day)) {
                        break;
                    }
                }
            }
        }

        return nextDate;
    }
}