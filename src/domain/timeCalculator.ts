export default abstract class TimeCalculator {

    protected readonly _startTime: Date;
    protected readonly _endTime: Date;

    constructor(startTime: Date, endTime: Date) {
        if (endTime < startTime) {
            throw new Error('endTime is not possible to be less than startTime');
        }
        this._startTime = startTime;
        this._endTime = endTime;
    }

    public nextTime(currentTime: Date): Date {
        if (this.isLessThanStarTime(currentTime)) {
            return null;
        }
        if (this.isGreaterThanEndTime(currentTime)) {
            return null;
        }
        const nextTime = this.nextTimeProtected(currentTime);
        if (this.isGreaterThanEndTime(nextTime)) {
            return null;
        }
        return nextTime;
    }

    private isLessThanStarTime = (date: Date): boolean => date.getTime() < this._startTime.getTime();

    private isGreaterThanEndTime = (date: Date): boolean => date.getTime() > this._endTime.getTime();

    protected abstract nextTimeProtected(currentTime: Date): Date;
}