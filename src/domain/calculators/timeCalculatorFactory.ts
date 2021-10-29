import { TimeUnit } from "../enums";
import TimeCalculator from "./timeCalculator";
import TimeCalculatorHour from "./timeCalculatorHour";
import TimeCalculatorMinute from "./timeCalculatorMinute";
import TimeCalculatorSecond from "./timeCalculatorSecond";

export default class TimeCalculatorFactory {

    public static create(timeUnit: TimeUnit, occursEveryNumber: number, startTime: Date, endTime: Date): TimeCalculator {
        switch (timeUnit) {
            case TimeUnit.Hours:
                return new TimeCalculatorHour(occursEveryNumber, startTime, endTime);
            case TimeUnit.Minuts:
                return new TimeCalculatorMinute(occursEveryNumber, startTime, endTime);
            case TimeUnit.Seconds:
                return new TimeCalculatorSecond(occursEveryNumber, startTime, endTime);
            default:
                throw new Error(`${timeUnit} is not a TimeUnit supported`);
        }
    }
}