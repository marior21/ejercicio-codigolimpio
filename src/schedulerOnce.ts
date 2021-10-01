import Limits from "./limits";
import Ouput from "./ouput";
import SchedulerBase from "./schedulerBase";


export default class SchedulerOnce extends SchedulerBase {
    private readonly _onceDate: Date;
    constructor(enabled: boolean, onceDate: Date, limits: Limits) {
        super(enabled, limits)
        this._onceDate = onceDate;
    }

    protected override getNextDateTimeProtected(): Date {
        return this._onceDate;
    }

    protected override getOuput(date: Date): Ouput {
        const dateOnce: string = date.toDateString();
        const timeOnce: string = date.toTimeString();
        const description =
            `Ocurrs once. Shedule will be used on ${dateOnce} at ${timeOnce} started on ${this._limits.startDate.toLocaleDateString()}`;

        return new Ouput(description, date);
    }
}