import Utils from "../utils/utils";
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
        let currentWeekDay: number = Utils.getDaySpanishFormat(currentDate);
        const isCurrentWeekDayChoosen: boolean = this._weekConfig.isDayChoosen(currentWeekDay);
        let numberDaysToSum = this.getNumberDays(
            isCurrentWeekDayChoosen ? currentWeekDay + 1 : currentWeekDay, isCurrentWeekDayChoosen ? 1 : 0);
        if (numberDaysToSum > 0) {
            nextDate.setDate(nextDate.getDate() + numberDaysToSum);
        }
        else {
            nextDate.setDate(nextDate.getDate() + (this._numberWeeks * 7));
            currentWeekDay = Utils.getDaySpanishFormat(nextDate);
            numberDaysToSum = this.getNumberDays(currentWeekDay, 0);
            if (currentWeekDay !== Week.SUNDAY && numberDaysToSum > 0) {
                nextDate.setDate(nextDate.getDate() + numberDaysToSum);
            }
            else {
                nextDate.setDate(nextDate.getDate() + (8 - Utils.getDaySpanishFormat(nextDate)));
                currentWeekDay = Utils.getDaySpanishFormat(nextDate);
                numberDaysToSum = this.getNumberDays(currentWeekDay, 0);
                if (numberDaysToSum > 0) {
                    nextDate.setDate(nextDate.getDate() + numberDaysToSum);
                }
            }
        }
        return nextDate;
    }

    private getNumberDays(startDay: number, startNumber: number): number {
        let numberDaysToSum = startNumber;
        let dayChoosen = false;
        for (let day = startDay; day <= 7; day++) {
            if (this._weekConfig.isDayChoosen(day)) {
                dayChoosen = true;
                break;
            }
            numberDaysToSum++;
        }
        return dayChoosen ? numberDaysToSum : 0;
    }
}