export default abstract class TimeCalculator {

    protected readonly _startTime: Date;
    protected readonly _endTime: Date;

    constructor(startTime: Date, endTime: Date) {
        if (endTime != null && startTime != null && endTime < startTime) {
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

    private isLessThanStarTime(date: Date): boolean {
        if (this._startTime == null) {
            return false;
        }
        const startTime = new Date(date);
        startTime.setHours(this._startTime.getHours(), this._startTime.getMinutes(), this._startTime.getSeconds());
        return date.getTime() < startTime.getTime();
    }

    private isGreaterThanEndTime(date: Date): boolean {
        if (this._endTime == null) {
            return false;
        }
        const endTime = new Date(date);
        endTime.setHours(this._endTime.getHours(), this._endTime.getMinutes(), this._endTime.getSeconds());
        return date.getTime() > endTime.getTime();
    }

    protected abstract nextTimeProtected(currentTime: Date): Date;
}