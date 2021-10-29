import TimeCalculator from "./timeCalculator";

export default class TimeCalculatorOnce extends TimeCalculator {
    private readonly _occursOnceTime: Date;

    constructor(occursOnceTime: Date) {
        super(null, null)
        this._occursOnceTime = occursOnceTime;
    }

    protected override nextTimeProtected(currentTime: Date): Date {
        const nextTime = new Date(currentTime);
        nextTime.setHours(this._occursOnceTime.getHours(), this._occursOnceTime.getMinutes(), this._occursOnceTime.getSeconds());
        return nextTime;
    }
}