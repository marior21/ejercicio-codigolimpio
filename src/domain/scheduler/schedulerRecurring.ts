import Configuration from "../configuration/configuration";
import Ouput from "../ouput";
import SchedulerBase from "./scheduler";
import TimeCalculator from "../calculators/timeCalculator";
import TimeCalculatorFactory from "../calculators/timeCalculatorFactory";
import DateWeekCalculator from "../calculators/dateWeekCalculator";
import OuputGenerator from "../ouputGenerator";
import DateMonthCalculatorFactory from "../calculators/dateMonthCalculatorFactory";
import IDateMonthCalculator from "../calculators/iDateMonthCalculator";

export default class SchedulerRecurring extends SchedulerBase {
    private readonly _configuration: Configuration;
    private readonly _ouputGenerator: OuputGenerator;

    constructor(configuration: Configuration) {
        super(configuration.enabled, configuration.limits)
        this._configuration = configuration;
        this._ouputGenerator = new OuputGenerator(configuration);
    }

    protected override getNextDateTimeProtected(): Date {
        let nextDate: Date = new Date(this._currentDate);
        if (this._configuration.dailyConfiguration != null) {
            const timeCalculator: TimeCalculator = TimeCalculatorFactory.create(this._configuration.dailyConfiguration);
            if (timeCalculator != null) {
                nextDate = timeCalculator.nextTime(nextDate);
                if (timeCalculator.isLastTime === false && this._configuration.monthlyConfiguration == null) {
                    return nextDate;
                }
            }
            else {
                nextDate.setDate(nextDate.getDate() + this._configuration.dailyConfiguration.frecuency);
            }
        }
        if (this._configuration.weeklyConfiguration != null) {
            const dateCalculator: DateWeekCalculator =
                new DateWeekCalculator(this._configuration.weeklyConfiguration.numberWeeks, this._configuration.weeklyConfiguration.weekConfig);
            nextDate = dateCalculator.nextDate(nextDate);
        }
        if (this._configuration.monthlyConfiguration != null) {
            const dateMonthCalculator: IDateMonthCalculator =
                DateMonthCalculatorFactory.create(this._configuration.monthlyConfiguration);
            nextDate = dateMonthCalculator.nextDate(nextDate);
        }
        return nextDate;
    }

    protected override getOuput(nextDate: Date): Ouput {
        return this._ouputGenerator.getOuput(nextDate);
    }
}