import DateMonthCalculatorDay from "../src/domain/calculators/dateMonthCalculatorDay";
import DateMonthCalculatorVariableDay from "../src/domain/calculators/dateMonthCalculatorVariableDay";
import { VariableDayNumber, VariableDayType } from "../src/domain/enums";

describe('date month calculador', () => {
  test.each([
    [8, 3, new Date(2020, 0, 2), new Date(2020, 0, 8)],
    [8, 3, new Date(2020, 0, 20), new Date(2020, 1, 8)],
    [8, 3, new Date(2020, 0, 8, 0), new Date(2020, 3, 8, 0)],
    [30, 3, new Date(2020, 0, 30, 0), new Date(2020, 3, 30, 0)],
    [31, 3, new Date(2020, 0, 31, 0), new Date(2020, 3, 30, 0)]
  ])('next date calculate is correct with the %p day every %p months, current date %p and result %p',
    (inputDay: number, inputEveryMonth, inputDate: Date, expectedDate: Date) => {
      const dateMonthCalculator: DateMonthCalculatorDay = new DateMonthCalculatorDay(inputDay, inputEveryMonth);
      const nextDate = dateMonthCalculator.nextDate(inputDate);
      expect(nextDate).toStrictEqual(expectedDate);
    });

  test.each([
    [VariableDayNumber.First, VariableDayType.Thursday, 3, new Date(2020, 0, 3, 0), new Date(2020, 0, 9, 0)],
    [VariableDayNumber.Second, VariableDayType.Thursday, 3, new Date(2020, 0, 3, 0), new Date(2020, 0, 16, 0)],
    [VariableDayNumber.Third, VariableDayType.Thursday, 3, new Date(2020, 0, 3, 0), new Date(2020, 0, 23, 0)],
    [VariableDayNumber.Fourth, VariableDayType.Thursday, 3, new Date(2020, 0, 3, 0), new Date(2020, 0, 30, 0)],
    //[VariableDayNumber.Last, VariableDayType.Thursday, 3, new Date(2020, 0, 3, 0), new Date(2020, 0, 30, 0)]
  ])('next date calculate is correct with the number %p of %p variable day every %p months, current date %p and result %p',
    (inputVariableDayNumber: VariableDayNumber, inputVariableDayType: VariableDayType, inputEveryMonth, inputDate: Date, expectedDate: Date) => {
      const dateMonthCalculator: DateMonthCalculatorVariableDay =
        new DateMonthCalculatorVariableDay(inputVariableDayType, inputVariableDayNumber, inputEveryMonth);
      const nextDate = dateMonthCalculator.nextDate(inputDate);
      expect(nextDate).toStrictEqual(expectedDate);
    });
});