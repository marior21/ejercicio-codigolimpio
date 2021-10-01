import ConfigurationRecurring from "./configurationRecurring";
import Limits from "./limits";
import Ouput from "./ouput";
import SchedulerBase from "./schedulerBase";

export default class SchedulerRecurring extends SchedulerBase {
    private readonly _configuration: ConfigurationRecurring;

    constructor(configuration: ConfigurationRecurring, limits: Limits) {
        super(configuration.enabled, limits)
        this._configuration = configuration;
    }

    protected override getNextDateTimeProtected(): Date {
        this._currentDate.setDate(this._currentDate.getDate() + this._configuration.frecuency);
        return this._currentDate;
    }

    protected override getOuput(nextDate: Date): Ouput {
        const date: string = nextDate.toDateString();
        const time: string = nextDate.toTimeString();
        const when: string = this._configuration.frecuency === 1
            ? 'every day'
            : `each ${this._configuration.frecuency} day`;

        const description = `Ocurrs ${when}. Shedule will be used on ${date} at ${time} started on ${this._limits.startDate.toLocaleDateString()}`;
        console.log(description);
        return new Ouput(description, nextDate);
    }
}