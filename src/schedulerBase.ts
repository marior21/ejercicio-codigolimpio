import Limits from "./limits";
import Ouput from "./ouput";

export default abstract class SchedulerBase {
    protected readonly _limits: Limits;
    protected _currentDate: Date;
    private readonly _enabled: boolean;
    constructor(enabled: boolean, limits: Limits) {
        this._enabled = enabled;
        this._limits = limits;
    }

    getNextDateTime(currentDate: Date): Ouput {
        if (this._enabled === false) {
            return null;
        }
        this._currentDate = currentDate;
        const nextDate = this.getNextDateTimeProtected();
        this._currentDate = null;
        return this.getOuput(nextDate);
    }

    protected abstract getNextDateTimeProtected(): Date

    protected abstract getOuput(date: Date): Ouput
}
