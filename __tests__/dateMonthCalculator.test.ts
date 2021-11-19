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
    [VariableDayNumber.First, VariableDayType.Monday, 3, new Date(2020, 0, 3, 0), new Date(2020, 0, 6, 0), new Date(2020, 3, 6, 0)],
    [VariableDayNumber.Second, VariableDayType.Monday, 3, new Date(2020, 0, 3, 0), new Date(2020, 0, 13, 0), new Date(2020, 3, 13, 0)],
    [VariableDayNumber.Third, VariableDayType.Monday, 3, new Date(2020, 0, 3, 0), new Date(2020, 0, 20, 0), new Date(2020, 3, 20, 0)],
    [VariableDayNumber.Fourth, VariableDayType.Monday, 3, new Date(2020, 0, 3, 0), new Date(2020, 0, 27, 0), new Date(2020, 3, 27, 0)],
    [VariableDayNumber.Last, VariableDayType.Monday, 3, new Date(2020, 0, 3, 0), new Date(2020, 0, 27, 0), new Date(2020, 3, 27, 0)],
    [VariableDayNumber.Fourth, VariableDayType.Monday, 3, new Date(2020, 0, 24, 0), new Date(2020, 0, 27, 0), new Date(2020, 3, 27, 0)],

    [VariableDayNumber.First, VariableDayType.Tuesday, 3, new Date(2020, 0, 3, 0), new Date(2020, 0, 7, 0), new Date(2020, 3, 7, 0)],
    [VariableDayNumber.Second, VariableDayType.Tuesday, 3, new Date(2020, 0, 3, 0), new Date(2020, 0, 14, 0), new Date(2020, 3, 14, 0)],
    [VariableDayNumber.Third, VariableDayType.Tuesday, 3, new Date(2020, 0, 3, 0), new Date(2020, 0, 21, 0), new Date(2020, 3, 21, 0)],
    [VariableDayNumber.Fourth, VariableDayType.Tuesday, 3, new Date(2020, 0, 3, 0), new Date(2020, 0, 28, 0), new Date(2020, 3, 28, 0)],
    [VariableDayNumber.Last, VariableDayType.Tuesday, 3, new Date(2020, 0, 3, 0), new Date(2020, 0, 28, 0), new Date(2020, 3, 28, 0)],
    [VariableDayNumber.Fourth, VariableDayType.Tuesday, 3, new Date(2020, 0, 24, 0), new Date(2020, 0, 28, 0), new Date(2020, 3, 28, 0)],

    [VariableDayNumber.First, VariableDayType.Wednesday, 3, new Date(2020, 0, 3, 0), new Date(2020, 1, 5, 0), new Date(2020, 4, 6, 0)],
    [VariableDayNumber.Second, VariableDayType.Wednesday, 3, new Date(2020, 0, 3, 0), new Date(2020, 0, 8, 0), new Date(2020, 3, 8, 0)],
    [VariableDayNumber.Third, VariableDayType.Wednesday, 3, new Date(2020, 0, 3, 0), new Date(2020, 0, 15, 0), new Date(2020, 3, 15, 0)],
    [VariableDayNumber.Fourth, VariableDayType.Wednesday, 3, new Date(2020, 0, 3, 0), new Date(2020, 0, 22, 0), new Date(2020, 3, 22, 0)],
    [VariableDayNumber.Last, VariableDayType.Wednesday, 3, new Date(2020, 0, 3, 0), new Date(2020, 0, 29, 0), new Date(2020, 3, 29, 0)],
    [VariableDayNumber.Fourth, VariableDayType.Wednesday, 3, new Date(2020, 0, 24, 0), new Date(2020, 1, 26, 0), new Date(2020, 4, 27, 0)],

    [VariableDayNumber.First, VariableDayType.Thursday, 3, new Date(2020, 0, 3, 0), new Date(2020, 1, 6, 0), new Date(2020, 4, 7)],
    [VariableDayNumber.Second, VariableDayType.Thursday, 3, new Date(2020, 0, 3, 0), new Date(2020, 0, 9, 0), new Date(2020, 3, 9)],
    [VariableDayNumber.Third, VariableDayType.Thursday, 3, new Date(2020, 0, 3, 0), new Date(2020, 0, 16, 0), new Date(2020, 3, 16)],
    [VariableDayNumber.Fourth, VariableDayType.Thursday, 3, new Date(2020, 0, 3, 0), new Date(2020, 0, 23, 0), new Date(2020, 3, 23)],
    [VariableDayNumber.Last, VariableDayType.Thursday, 3, new Date(2020, 0, 3, 0), new Date(2020, 0, 30, 0), new Date(2020, 3, 30)],
    [VariableDayNumber.Fourth, VariableDayType.Thursday, 3, new Date(2020, 0, 24, 0), new Date(2020, 1, 27, 0), new Date(2020, 4, 28)],

    [VariableDayNumber.First, VariableDayType.Friday, 3, new Date(2020, 0, 3, 0), new Date(2020, 0, 3, 0), new Date(2020, 3, 3)],
    [VariableDayNumber.Second, VariableDayType.Friday, 3, new Date(2020, 0, 3, 0), new Date(2020, 0, 10, 0), new Date(2020, 3, 10)],
    [VariableDayNumber.Third, VariableDayType.Friday, 3, new Date(2020, 0, 3, 0), new Date(2020, 0, 17, 0), new Date(2020, 3, 17)],
    [VariableDayNumber.Fourth, VariableDayType.Friday, 3, new Date(2020, 0, 3, 0), new Date(2020, 0, 24, 0), new Date(2020, 3, 24)],
    [VariableDayNumber.Last, VariableDayType.Friday, 3, new Date(2020, 0, 3, 0), new Date(2020, 0, 31, 0), new Date(2020, 3, 24)],
    [VariableDayNumber.Fourth, VariableDayType.Friday, 3, new Date(2020, 0, 24, 0), new Date(2020, 0, 24, 0), new Date(2020, 3, 24)],

    //[VariableDayNumber.First, VariableDayType.Weekday, 3, new Date(2020, 0, 3, 0), new Date(2020, 1, 3, 0), new Date(2020, 4, 1)],
    // [VariableDayNumber.Second, VariableDayType.Weekday, 3, new Date(2020, 0, 3, 0), new Date(2020, 0, 10, 0), new Date(2020, 3, 10)],
    // [VariableDayNumber.Third, VariableDayType.Weekday, 3, new Date(2020, 0, 3, 0), new Date(2020, 0, 17, 0), new Date(2020, 3, 17)],
    // [VariableDayNumber.Fourth, VariableDayType.Weekday, 3, new Date(2020, 0, 3, 0), new Date(2020, 0, 24, 0), new Date(2020, 3, 24)],
    // [VariableDayNumber.Last, VariableDayType.Weekday, 3, new Date(2020, 0, 3, 0), new Date(2020, 0, 31, 0), new Date(2020, 3, 24)],
    // [VariableDayNumber.Fourth, VariableDayType.Weekday, 3, new Date(2020, 0, 24, 0), new Date(2020, 0, 24, 0), new Date(2020, 3, 24)]

  ])('next date calculate is correct with the number %p of %p variable day every %p months, current date %p and result %p',
    (inputVariableDayNumber: VariableDayNumber, inputVariableDayType: VariableDayType, inputEveryMonth, inputDate: Date, expectedDate: Date, nextMonthExpectedDate: Date) => {
      const dateMonthCalculator: DateMonthCalculatorVariableDay =
        new DateMonthCalculatorVariableDay(inputVariableDayType, inputVariableDayNumber, inputEveryMonth);
      let nextDate = dateMonthCalculator.nextDate(inputDate);
      expect(nextDate).toStrictEqual(expectedDate);

      if (nextMonthExpectedDate != null) {
        nextDate = dateMonthCalculator.nextDate(nextDate);
        // eslint-disable-next-line jest/no-conditional-expect
        expect(nextDate).toStrictEqual(nextMonthExpectedDate);
      }

    });
});