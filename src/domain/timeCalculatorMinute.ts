import TimeCalculatorBase from "./timeCalculatorBase";

export default class TimeCalculatorMinute extends TimeCalculatorBase {
    private readonly _occursEveryNumber: number;

    constructor(occursEveryNumber: number, startTime: Date, endTime: Date) {
        super(startTime, endTime)
        this._occursEveryNumber = occursEveryNumber;
    }

    protected override nextTimeProtected(currentTime: Date): Date {
        const nextTime = new Date(currentTime);
        nextTime.setMinutes(currentTime.getMinutes() + this._occursEveryNumber);
        return nextTime;
    }
}