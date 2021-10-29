import Configuration from "../configuration/configuration";
import Ouput from "../ouput";
import SchedulerBase from "./scheduler";
import Utils from "../../utils/utils";
import TimeCalculator from "../calculators/timeCalculator";
import TimeCalculatorFactory from "../calculators/timeCalculatorFactory";
import DateCalculator from "../calculators/dateCalculator";

export default class SchedulerRecurring extends SchedulerBase {
    private readonly _configuration: Configuration;

    constructor(configuration: Configuration) {
        super(configuration.enabled, configuration.limits)
        this._configuration = configuration;
    }

    protected override getNextDateTimeProtected(): Date {
        let nextDate: Date = new Date(this._currentDate);

        if (this._configuration.dailyConfiguration != null) {
            nextDate.setDate(nextDate.getDate() + this._configuration.dailyConfiguration.frecuency);
            const timeCalculator: TimeCalculator = TimeCalculatorFactory.create(this._configuration.dailyConfiguration);
            if (timeCalculator != null) {
                const nextDailyTime: Date = timeCalculator.nextTime(nextDate);
                if (nextDailyTime != null) {
                    nextDate.setHours(nextDailyTime.getHours(), nextDailyTime.getMinutes(), nextDailyTime.getSeconds());
                }
            }
        }

        if (this._configuration.weeklyConfiguration != null) {
            const dateCalculator: DateCalculator = new DateCalculator(this._configuration.weeklyConfiguration.numberWeeks, this._configuration.weeklyConfiguration.weekConfig);
            nextDate = dateCalculator.nextDate(nextDate);
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