export default abstract class TimeCalculatorBase {

    protected readonly _startTime: Date;
    protected readonly _endTime: Date;

    constructor(startTime: Date, endTime: Date) {
        this._startTime = startTime;
        this._endTime = endTime;
    }

    public nextTime(currentTime: Date): Date {
        if (this._startTime.getTime() > currentTime.getTime()) {
            return null;
        }
        if (this._endTime.getTime() < currentTime.getTime()) {
            return null;
        }
        const nextTime = this.nextTimeProtected(currentTime);
        if (this._startTime.getTime() > nextTime.getTime()) {
            return null;
        }
        if (this._endTime.getTime() < nextTime.getTime()) {
            return null;
        }
        return nextTime;
    }

    protected abstract nextTimeProtected(currentTime: Date): Date;
}