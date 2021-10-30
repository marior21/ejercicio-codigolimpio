import TimeCalculator from "./timeCalculator";
export default class TimeCalculatorOnce extends TimeCalculator {
    private readonly _occursOnceTime: Date;
    constructor(occursOnceTime: Date, frecuency: number) {
        super(null, null, frecuency)
        this._occursOnceTime = occursOnceTime;
    }

    protected override nextTimeProtected(currentTime: Date): Date {
        const nextTime = new Date(currentTime);
        if (nextTime.getTime() > this._occursOnceTime.getTime()) {
            nextTime.setDate(nextTime.getDate() + this._frecuency);
        }
        nextTime.setHours(this._occursOnceTime.getHours(), this._occursOnceTime.getMinutes(), this._occursOnceTime.getSeconds());
        return nextTime;
    }
}