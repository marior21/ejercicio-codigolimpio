import Configuration from "../configuration/configuration";
import Ouput from "../ouput";
import SchedulerBase from "./scheduler";
import Utils from "../../utils/utils";

export default class SchedulerRecurring extends SchedulerBase {
    private readonly _configuration: Configuration;

    constructor(configuration: Configuration) {
        super(configuration.enabled, configuration.limits)
        this._configuration = configuration;
    }

    protected override getNextDateTimeProtected(): Date {
        const nextDate: Date = new Date(this._currentDate);

        if (this._configuration.dailyConfiguration != null) {
            nextDate.setHours(0);
            nextDate.setMinutes(0);
            nextDate.setSeconds(0);
            nextDate.setDate(nextDate.getDate() + this._configuration.dailyConfiguration.frecuency);
            const occursOnceTime: Date = this._configuration.dailyConfiguration.occursOnceTime;
            if (occursOnceTime != null) {
               nextDate.setHours(occursOnceTime.getHours());
               nextDate.setMinutes(occursOnceTime.getMinutes());
               nextDate.setSeconds(occursOnceTime.getSeconds());     
            }
        }

        if (this._configuration.weeklyConfiguration != null) {

        }
        if (this._configuration != null) {
            //algo
        }

        return nextDate;
    }

    protected override getOuput(nextDate: Date): Ouput {
        const date: string = Utils.formatDate(nextDate);
        const when: string = this._configuration.dailyConfiguration?.frecuency === 1
            ? 'every day'
            : `each ${this._configuration.dailyConfiguration?.frecuency} day`;

        const description = `Ocurrs ${when}. Shedule will be used on ${date} starting on ${Utils.formatDate(this._limits.startDate)}`;
        return new Ouput(description, nextDate);
    }
}