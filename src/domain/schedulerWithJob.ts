//play with schudule and jobs for future


import ConfigurationRecurring from "./configurationRecurring";
import Limits from "./limits";
import Utils from "../utils/utils";

export default class Scheduler {
    private readonly _configuration: ConfigurationRecurring;
    private readonly _limits: Limits;
    private currentDate: Date;
    private process: NodeJS.Timeout;

    public onNextDate?: (nextDate: Date, description: string) => void


    constructor(configuration: ConfigurationRecurring, limits: Limits) {
        this._limits = limits
        this._configuration = configuration;
    }

    public schedule(startDate: Date) {
        this.currentDate = startDate;
        this.process = setInterval(() => {
            this.onNextDate(this.currentDate, 'bla bla');
        }, this.calculateNextDate());
    }

    public once(nextDate: Date) {
        this.process = setInterval(() => {
            this.onNextDate(nextDate, 'bla bla');
        }, (nextDate.getMilliseconds() - Date.now()));
    }

    private calculateNextDate(): number {
        return 1;
    }
}