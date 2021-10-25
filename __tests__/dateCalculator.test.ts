import DateCalculator from "../src/domain/dateCalculator";
import Week from "../src/domain/week";


describe('date calculador', () => {
  test.each([
    [Date.UTC(2020, 0, 2), Date.UTC(2020, 0, 3)],
    [Date.UTC(2020, 4, 5), Date.UTC(2020, 4, 7)],
    [Date.UTC(2020, 4, 9), Date.UTC(2020, 4, 25)],
    [Date.UTC(2020, 4, 10), Date.UTC(2020, 4, 25)],
    [Date.UTC(2020, 4, 11), Date.UTC(2020, 4, 14)],
    [Date.UTC(2020, 4, 12), Date.UTC(2020, 4, 14)],
    [Date.UTC(2020, 4, 13), Date.UTC(2020, 4, 14)],
    [Date.UTC(2020, 4, 14), Date.UTC(2020, 4, 15)],
    [Date.UTC(2020, 4, 15), Date.UTC(2020, 5, 1)],
    [Date.UTC(2020, 4, 16), Date.UTC(2020, 5, 1)]
  ])('next date calculate is correct with 2 weeks and monday, thursday and friday, for date input %p', (inputNumberDate: number, expectedNumberDate: number) => {
    const week: Week = new Week();
    week.monday = true;
    week.thursday = true;
    week.friday = true;
    const inputDate = new Date(inputNumberDate);
    const expectedDate = new Date(expectedNumberDate);
    const dateCalculator: DateCalculator = new DateCalculator(2, week);

    const nextDate = dateCalculator.nextDate(inputDate);
    console.log(expectedDate.toString());
    console.log(nextDate.toString());

    expect(nextDate).toStrictEqual(expectedDate);
  });

  test('dateCalculator throw error if number of weeks is zero', () => {
    const week: Week = new Week();
    week.monday = true;
    expect(() => new DateCalculator(0, week)).toThrowError();

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