import MonthlyConfiguration from "../configuration/MonthlyConfiguration";
import { MonthlyFrecuencyType } from "../enums";
import IDateMonthCalculator from "./iDateMonthCalculator";
import DateMonthCalculatorDay from "./dateMonthCalculatorDay";
import DateMonthCalculatorVariableDay from "./dateMonthCalculatorVariableDay";

export default class DateMonthCalculatorFactory {
    public static create(monthlyConfiguration: MonthlyConfiguration): IDateMonthCalculator {
        switch (monthlyConfiguration.frecuencyType) {
            case MonthlyFrecuencyType.excatDay:
                return new DateMonthCalculatorDay(monthlyConfiguration.day, monthlyConfiguration.everyMonths);
            case MonthlyFrecuencyType.variableDay:
                return new DateMonthCalculatorVariableDay(monthlyConfiguration.variableDayType, monthlyConfiguration.frecuencyVariableDay, monthlyConfiguration.everyMonths);
            default:
                throw new Error(`${monthlyConfiguration.frecuencyType} is not a MonthlyFrecuencyType supported`);
        }
    }
}