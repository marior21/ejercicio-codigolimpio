import TimeCalculator from "./timeCalculator";

export default class TimeCalculatorHour extends TimeCalculator {
    private readonly _occursEveryNumber: number;

    constructor(occursEveryNumber: number, startTime: Date, endTime: Date) {
        super(startTime, endTime)
        this._occursEveryNumber = occursEveryNumber;
    }

    protected override nextTimeProtected(currentTime: Date): Date {
        const nextTime = new Date(currentTime);
        nextTime.setHours(currentTime.getHours() + this._occursEveryNumber);
        return nextTime;
    }
}