import DateCalculator from "../src/domain/calculators/dateCalculator";
import Week from "../src/domain/configuration/week";


describe('date calculador', () => {
  test.each([
    [0, Date.UTC(2020, 0, 2), Date.UTC(2020, 0, 3)],
    [0, Date.UTC(2020, 4, 5), Date.UTC(2020, 4, 7)],
    [0, Date.UTC(2020, 4, 9), Date.UTC(2020, 4, 11)],
    [0, Date.UTC(2020, 4, 10), Date.UTC(2020, 4, 11)],
    [0, Date.UTC(2020, 4, 11), Date.UTC(2020, 4, 14)],
    [0, Date.UTC(2020, 4, 12), Date.UTC(2020, 4, 14)],
    [0, Date.UTC(2020, 4, 13), Date.UTC(2020, 4, 14)],
    [0, Date.UTC(2020, 4, 14), Date.UTC(2020, 4, 15)],
    [0, Date.UTC(2020, 4, 15), Date.UTC(2020, 4, 18)],
    [0, Date.UTC(2020, 4, 16), Date.UTC(2020, 4, 18)],

    [1, Date.UTC(2020, 0, 2), Date.UTC(2020, 0, 3)],
    [1, Date.UTC(2020, 4, 5), Date.UTC(2020, 4, 7)],
    [1, Date.UTC(2020, 4, 9), Date.UTC(2020, 4, 18)],
    [1, Date.UTC(2020, 4, 10), Date.UTC(2020, 4, 18)],
    [1, Date.UTC(2020, 4, 11), Date.UTC(2020, 4, 14)],
    [1, Date.UTC(2020, 4, 12), Date.UTC(2020, 4, 14)],
    [1, Date.UTC(2020, 4, 13), Date.UTC(2020, 4, 14)],
    [1, Date.UTC(2020, 4, 14), Date.UTC(2020, 4, 15)],
    [1, Date.UTC(2020, 4, 15), Date.UTC(2020, 4, 22)],
    [1, Date.UTC(2020, 4, 16), Date.UTC(2020, 4, 25)],

    [2, Date.UTC(2020, 0, 2), Date.UTC(2020, 0, 3)],
    [2, Date.UTC(2020, 4, 5), Date.UTC(2020, 4, 7)],
    [2, Date.UTC(2020, 4, 9), Date.UTC(2020, 4, 25)],
    [2, Date.UTC(2020, 4, 10), Date.UTC(2020, 4, 25)],
    [2, Date.UTC(2020, 4, 11), Date.UTC(2020, 4, 14)],
    [2, Date.UTC(2020, 4, 12), Date.UTC(2020, 4, 14)],
    [2, Date.UTC(2020, 4, 13), Date.UTC(2020, 4, 14)],
    [2, Date.UTC(2020, 4, 14), Date.UTC(2020, 4, 15)],
    [2, Date.UTC(2020, 4, 15), Date.UTC(2020, 4, 29)],
    [2, Date.UTC(2020, 4, 16), Date.UTC(2020, 5, 1)]
  ])('next date calculate is correct with %p weeks and monday, thursday and friday, for date input %p', (inputNumberWeeks: number, inputNumberDate: number, expectedNumberDate: number) => {
    const week: Week = new Week();
    week.monday = true;
    week.thursday = true;
    week.friday = true;
    const inputDate = new Date(inputNumberDate);
    const expectedDate = new Date(expectedNumberDate);
    const dateCalculator: DateCalculator = new DateCalculator(inputNumberWeeks, week);

    const nextDate = dateCalculator.nextDate(inputDate);  

    expect(nextDate).toStrictEqual(expectedDate);
  });

  test.each([
    [0, Date.UTC(2020, 4, 4), Date.UTC(2020, 4, 5)],
    [0, Date.UTC(2020, 4, 5), Date.UTC(2020, 4, 6)],
    [0, Date.UTC(2020, 4, 6), Date.UTC(2020, 4, 10)],
    [0, Date.UTC(2020, 4, 7), Date.UTC(2020, 4, 10)],
    [0, Date.UTC(2020, 4, 8), Date.UTC(2020, 4, 10)],
    [0, Date.UTC(2020, 4, 9), Date.UTC(2020, 4, 10)],
    [0, Date.UTC(2020, 4, 10), Date.UTC(2020, 4, 12)],

    [1, Date.UTC(2020, 4, 4), Date.UTC(2020, 4, 5)],
    [1, Date.UTC(2020, 4, 5), Date.UTC(2020, 4, 6)],
    [1, Date.UTC(2020, 4, 6), Date.UTC(2020, 4, 10)],
    [1, Date.UTC(2020, 4, 7), Date.UTC(2020, 4, 10)],
    [1, Date.UTC(2020, 4, 8), Date.UTC(2020, 4, 10)],
    [1, Date.UTC(2020, 4, 9), Date.UTC(2020, 4, 10)],
    [1, Date.UTC(2020, 4, 10), Date.UTC(2020, 4, 17)],

    [2, Date.UTC(2020, 4, 4), Date.UTC(2020, 4, 5)],
    [2, Date.UTC(2020, 4, 5), Date.UTC(2020, 4, 6)],
    [2, Date.UTC(2020, 4, 6), Date.UTC(2020, 4, 10)],
    [2, Date.UTC(2020, 4, 7), Date.UTC(2020, 4, 10)],
    [2, Date.UTC(2020, 4, 8), Date.UTC(2020, 4, 10)],
    [2, Date.UTC(2020, 4, 9), Date.UTC(2020, 4, 10)],
    [2, Date.UTC(2020, 4, 10), Date.UTC(2020, 4, 24)]
  ])('next date calculate is correct with %p weeks and tuesday, wednesday and sunday, for date input %p', (inputNumberWeeks: number, inputNumberDate: number, expectedNumberDate: number) => {
    const week: Week = new Week();
    week.tuesday = true;
    week.wednesday = true;
    week.sunday = true;
    const inputDate = new Date(inputNumberDate);
    const expectedDate = new Date(expectedNumberDate);
    const dateCalculator: DateCalculator = new DateCalculator(inputNumberWeeks, week);

    const nextDate = dateCalculator.nextDate(inputDate);

    expect(nextDate).toStrictEqual(expectedDate);
  });

  test.each([
    [0, Date.UTC(2020, 4, 4), Date.UTC(2020, 4, 5)],
    [0, Date.UTC(2020, 4, 5), Date.UTC(2020, 4, 6)],
    [0, Date.UTC(2020, 4, 6), Date.UTC(2020, 4, 7)],
    [0, Date.UTC(2020, 4, 7), Date.UTC(2020, 4, 8)],
    [0, Date.UTC(2020, 4, 8), Date.UTC(2020, 4, 9)],
    [0, Date.UTC(2020, 4, 9), Date.UTC(2020, 4, 10)],
    [0, Date.UTC(2020, 4, 10), Date.UTC(2020, 4, 11)],

    [1, Date.UTC(2020, 4, 4), Date.UTC(2020, 4, 5)],
    [1, Date.UTC(2020, 4, 5), Date.UTC(2020, 4, 6)],
    [1, Date.UTC(2020, 4, 6), Date.UTC(2020, 4, 7)],
    [1, Date.UTC(2020, 4, 7), Date.UTC(2020, 4, 8)],
    [1, Date.UTC(2020, 4, 8), Date.UTC(2020, 4, 9)],
    [1, Date.UTC(2020, 4, 9), Date.UTC(2020, 4, 10)],
    [1, Date.UTC(2020, 4, 10), Date.UTC(2020, 4, 17)],

    [2, Date.UTC(2020, 4, 4), Date.UTC(2020, 4, 5)],
    [2, Date.UTC(2020, 4, 5), Date.UTC(2020, 4, 6)],
    [2, Date.UTC(2020, 4, 6), Date.UTC(2020, 4, 7)],
    [2, Date.UTC(2020, 4, 7), Date.UTC(2020, 4, 8)],
    [2, Date.UTC(2020, 4, 8), Date.UTC(2020, 4, 9)],
    [2, Date.UTC(2020, 4, 9), Date.UTC(2020, 4, 10)],
    [2, Date.UTC(2020, 4, 10), Date.UTC(2020, 4, 24)]
  ])('next date calculate is correct with %p weeks and monday, tuesday, wednesday, thursday, friday, saturday and sunday, for date input %p', (inputNumberWeeks: number, inputNumberDate: number, expectedNumberDate: number) => {
    const week: Week = new Week();
    week.monday = true;
    week.tuesday = true;
    week.wednesday = true;
    week.thursday = true;
    week.friday = true;
    week.saturday = true;
    week.sunday = true;
    const inputDate = new Date(inputNumberDate);
    const expectedDate = new Date(expectedNumberDate);
    const dateCalculator: DateCalculator = new DateCalculator(inputNumberWeeks, week);

    const nextDate = dateCalculator.nextDate(inputDate);

    expect(nextDate).toStrictEqual(expectedDate);
  });

  test('dateCalculator throw error if number of weeks is less than zero', () => {
    const week: Week = new Week();
    week.monday = true;
    expect(() => new DateCalculator(-4, week)).toThrowError();

  });

  test('dateCalculator throw error if week is null', () => {
    const week: Week = new Week();
    week.monday = true;
    expect(() => new DateCalculator(2, null)).toThrowError();

  });

  test('dateCalculator throw error if week is empty', () => {
    const week: Week = new Week();
    expect(() => new DateCalculator(2, week)).toThrowError();

  });
});