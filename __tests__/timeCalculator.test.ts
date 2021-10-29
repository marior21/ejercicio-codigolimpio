import { TimeUnit } from "../src/domain/enums";
import TimeCalculator from "../src/domain/calculators/timeCalculator";
import TimeCalculatorFactory from "../src/domain/calculators/timeCalculatorFactory";


describe('time calculador', () => {
  test.each([
    [2, TimeUnit.Hours, Date.UTC(null, null, null, 12, 0, 0), Date.UTC(null, null, null, 14, 0, 0)],
    [2, TimeUnit.Hours, Date.UTC(null, null, null, 3, 0, 0), null],
    [2, TimeUnit.Hours, Date.UTC(null, null, null, 19, 0, 0), null],
    [2, TimeUnit.Minuts, Date.UTC(null, null, null, 12, 5, 0), Date.UTC(null, null, null, 12, 7, 0)],
    [2, TimeUnit.Minuts, Date.UTC(null, null, null, 3, 54, 0), null],
    [2, TimeUnit.Minuts, Date.UTC(null, null, null, 19, 4, 0), null],
    [34, TimeUnit.Seconds, Date.UTC(null, null, null, 12, 5, 20), Date.UTC(null, null, null, 12, 5, 54)],
    [34, TimeUnit.Seconds, Date.UTC(null, null, null, 17, 59, 30), null],
    [34, TimeUnit.Seconds, Date.UTC(null, null, null, 3, 54, 45), null],
    [34, TimeUnit.Seconds, Date.UTC(null, null, null, 19, 4, 34), null]
  ])('next time calculate is correct with every %p %p inside 04:00 - 18:00', (inputOccursEvery: number, inputUnit: TimeUnit, inputNumberDate: number, expectedNumberDate: number) => {

    const inputDate = new Date(inputNumberDate);
    const expectedDate = expectedNumberDate != null ? new Date(expectedNumberDate) : null;
    const starTime = new Date(Date.UTC(null, null, null, 4));
    const endTime = new Date(Date.UTC(null, null, null, 18));
    const timealculator: TimeCalculator = TimeCalculatorFactory.create(inputUnit, inputOccursEvery, starTime, endTime);

    const nextDate = timealculator.nextTime(inputDate);

    expect(nextDate?.getHours()).toStrictEqual(expectedDate?.getHours());
    expect(nextDate?.getMinutes()).toStrictEqual(expectedDate?.getMinutes());
    expect(nextDate?.getSeconds()).toStrictEqual(expectedDate?.getSeconds());

  });

  test('timeCalculator throw error if TimeUnit is not supported', () => {
    const starTime = new Date(Date.UTC(null, null, null, 4));
    const endTime = new Date(Date.UTC(null, null, null, 18));
    expect(() => TimeCalculatorFactory.create(7, 2, starTime, endTime)).toThrowError();
  });

  test('timeCalculator throw error if endTime is less then starTime', () => {
    const starTime = new Date(Date.UTC(null, null, null, 14));
    const endTime = new Date(Date.UTC(null, null, null, 12));
    expect(() => TimeCalculatorFactory.create(TimeUnit.Hours, 2, starTime, endTime)).toThrowError();
  });
});