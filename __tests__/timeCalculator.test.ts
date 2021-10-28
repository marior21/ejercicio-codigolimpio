import { TimeUnit } from "../src/domain/enums";
import TimeCalculator from "../src/domain/timeCalculatorHour";


describe('time calculador', () => {
  test.each([
    [2, TimeUnit.Hours, Date.UTC(null, null, null, 12, 0, 0), Date.UTC(null, null, null, 14, 0, 0)]
  ])('next time calculate is correct with every %p %p inside 04:00 - 18:00', (inputOccursEvery: number, inputUnit: TimeUnit, inputNumberDate: number, expectedNumberDate: number) => {

    const inputDate = new Date(inputNumberDate);
    const expectedDate = new Date(expectedNumberDate);
    const starTime = new Date(Date.UTC(null, null, null, 4));
    const endTime = new Date(Date.UTC(null, null, null, 18));
    const dateCalculator: TimeCalculator = new TimeCalculator(null, inputOccursEvery, inputUnit, starTime, endTime);

    const nextDate = dateCalculator.nextTime(inputDate);

    expect(nextDate.getHours()).toStrictEqual(expectedDate.getHours());
    expect(nextDate.getMinutes()).toStrictEqual(expectedDate.getMinutes());
    expect(nextDate.getSeconds()).toStrictEqual(expectedDate.getSeconds());
  });
});