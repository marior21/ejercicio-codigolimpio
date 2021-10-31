import { Occurs, SchedulerType } from "../enums";
import DailyConfiguration from "./dailyConfiguration";
import Limits from "./limits";
import WeeklyConfiguration from "./weeklyConfiguration";

export default class Configuration {
    private readonly _schedulerType: SchedulerType;
    private readonly _occurs: Occurs;
    private readonly _enabled: boolean;
    private readonly _limits: Limits;
    private readonly _onceDate: Date;
    private readonly _weeklyConfiguration: WeeklyConfiguration;
    private readonly _dailyConfiguration: DailyConfiguration;

    constructor(
        schedulerType: SchedulerType,
        enabled: boolean,
        occurs: Occurs,
        onceDate: Date,
        limits: Limits,
        weeklyConfiguration: WeeklyConfiguration,
        dailyConfiguration: DailyConfiguration
    ) {
        this._schedulerType = schedulerType;
        this._occurs = occurs;
        this._limits = limits;
        this._enabled = enabled;
        this._onceDate = onceDate;
        this._weeklyConfiguration = weeklyConfiguration;
        this._dailyConfiguration = dailyConfiguration;

        this.validateArguments();
    }

    get schedulerType(): SchedulerType {
        return this._schedulerType;
    }

    get ocurrs(): Occurs {
        return this._occurs;
    }

    get limits(): Limits {
        return this._limits;
    }

    get enabled(): boolean {
        return this._enabled;
    }

    get oncedate(): Date {
        return this._onceDate;
    }

    get weeklyConfiguration(): WeeklyConfiguration {
        return this._weeklyConfiguration;
    }

    get dailyConfiguration(): DailyConfiguration {
        return this._dailyConfiguration;
    }

    validateArguments(): void {
        if (this.schedulerType === SchedulerType.Once && this.oncedate == null) {
            throw new Error("Oncedate must have a value");
        }
        if (this.schedulerType === SchedulerType.Recurring) {
            if (this._occurs === null) {
                throw new Error("Ocurrs must have a value");
            }
            if (this.ocurrs === Occurs.Weekley && this.weeklyConfiguration == null) {
                throw new Error("WeeklyConfiguration must have a value");
            }
            if (this.ocurrs === Occurs.Daily && this.dailyConfiguration == null) {
                throw new Error("DailyConfiguration must have a value");
            }
        }
        if (this.limits === null) {
            throw new Error("Limits must have a value");
        }
        if (this.enabled === null) {
            throw new Error("Enabled must have a value");
        }
        if (this.schedulerType === null) {
            throw new Error("schedulerType must have a value");
        }
    }
}