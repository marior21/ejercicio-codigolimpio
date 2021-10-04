import DateCalculator from "../src/domain/dateCalculator";
import Week from "../src/domain/week";


describe('date calculador', () => {
  test('next date calculate is correct with 2 weeks and monday, thursday and friday', () => {
    const week: Week = new Week();
    week.monday = true;
    week.thursday = true;
    week.friday = true;

    const dateCalculator: DateCalculator = new DateCalculator(2, week);

    const currentDate: Date = new Date(2020, 0, 2);
    const nextDate = dateCalculator.nextDate(currentDate);
    expect(nextDate).toStrictEqual(new Date(2020, 0, 3));
  });
});