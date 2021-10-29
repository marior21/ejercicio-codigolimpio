import Limits from "../src/domain/configuration/limits";
import Ouput from "../src/domain/ouput";
import { Occurs, SchedulerType, TimeUnit } from "../src/domain/enums";
import Scheduler from "../src/domain/scheduler/scheduler";
import Configuration from "../src/domain/configuration/configuration";
import SchedulerFactory from "../src/domain/scheduler/schedulerFactory";
//import Week from "../src/domain/configuration/week";
import DailyConfiguration from "../src/domain/configuration/dailyConfiguration";


const onceDate: Date = new Date(2020, 0, 8, 14);
const currentDate: Date = new Date(2020, 0, 4);

function getOnceScheduler(enabled: boolean): Scheduler {
  const startDate: Date = new Date(2020, 0, 1);
  const limits: Limits = new Limits(startDate, null);
  const configuration: Configuration = new Configuration(SchedulerType.Once, enabled, null, onceDate, limits, null, null);

  return SchedulerFactory.create(configuration);
};


function getRecurringScheduler(enabled: boolean, ocurrs: Occurs, limits: Limits): Scheduler {
  const startDate: Date = new Date(2020, 0, 1);
  const limitsArg: Limits = limits != null ? limits : new Limits(startDate, null);
  const configuration: Configuration = new Configuration(SchedulerType.Recurring, enabled, ocurrs, currentDate, limitsArg, null, null);

  return SchedulerFactory.create(configuration);
};

describe('scheduler once', () => {
  test('next date in once date mode in scheduler enabled return once date', () => {
    const scheduler: Scheduler = getOnceScheduler(true);
    const ouput: Ouput = scheduler.getNextDateTime(currentDate);
    expect(ouput.description).toEqual('Ocurrs once. Shedule will be used on 08/01/2020 at 14:00 starting on 01/01/2020');
    expect(ouput.nextDate).toBe(onceDate);
  });

  test('next date in once date mode in scheduler not enabled return null', () => {
    const scheduler: Scheduler = getOnceScheduler(false);
    const ouput: Ouput = scheduler.getNextDateTime(currentDate);

    expect(ouput).toBe(null);
  });
});


describe('scheduler recurring', () => {
  test('next date in recurring date mode in scheduler enabled and one day frecuency return correct date', () => {

    const startDate: Date = new Date(2020, 0, 1);
    const limits: Limits = new Limits(startDate, null);
    const dailayConfiguration: DailyConfiguration = new DailyConfiguration(1, null, null, null, null, null);
    const configuration: Configuration = new Configuration(SchedulerType.Recurring, true, Occurs.Daily, currentDate, limits, null, dailayConfiguration);

    const scheduler: Scheduler = SchedulerFactory.create(configuration);
    const ouput: Ouput = scheduler.getNextDateTime(currentDate);

    const dateExpected = new Date(2020, 0, 5);
    expect(ouput.description).toEqual('Ocurrs every day. Shedule will be used on 05/01/2020 starting on 01/01/2020');
    expect(ouput.nextDate).toStrictEqual(dateExpected);
  });

  test('next date in recurring date mode in scheduler enabled with currentdate don`t in startDate limits throw', () => {
    const limits: Limits = new Limits(new Date(2022, 0, 1), null);
    const scheduler: Scheduler = getRecurringScheduler(true, Occurs.Daily, limits);

    expect(() => scheduler.getNextDateTime(currentDate)).toThrow();
  });

  test('next date in recurring date mode in scheduler enabled with currentdate don`t in endDate limits throw', () => {
    const limits: Limits = new Limits(new Date(2020, 0, 1), new Date(2020, 0, 2));
    const scheduler: Scheduler = getRecurringScheduler(true, Occurs.Daily, limits);

    expect(() => scheduler.getNextDateTime(currentDate)).toThrow();
  });

  test.each([
    [1, new Date(2020, 4, 4), new Date(null, null, null, 12, 23, 56), new Date(2020, 4, 5, 12, 23, 56)],
    [2, new Date(2020, 4, 4), new Date(null, null, null, 23, 23, 56), new Date(2020, 4, 6, 23, 23, 56)],
    [10, new Date(2020, 4, 4), new Date(null, null, null, 12, 54, 56), new Date(2020, 4, 14, 12, 54, 56)]
  ])('next date calculate is correct with daily configuration and occurs once %p and %p',
    (frecuency: number, inputDate: Date, occurOnceTime: Date, expectedDate: Date) => {
      const startDate: Date = new Date(2020, 0, 1);
      const limits: Limits = new Limits(startDate, null);
      const dailayConfiguration: DailyConfiguration = new DailyConfiguration(frecuency, occurOnceTime, null, null, null, null);
      const configuration: Configuration = new Configuration(SchedulerType.Recurring, true, Occurs.Daily, currentDate, limits, null, dailayConfiguration);

      const scheduler: Scheduler = SchedulerFactory.create(configuration);

      const nextDate: Date = scheduler.getNextDateTime(inputDate).nextDate;

      expect(nextDate).toStrictEqual(expectedDate);
    });

  test.each([
    [1, new Date(2020, 4, 4, 10, 20, 34), 2, TimeUnit.Hours, new Date(2020, 4, 5, 12, 20, 34)],
  ])('next date calculate is correct with daily configuration and occurs every %p and %p',
    (frecuency: number, inputDate: Date, occursEveryNumber: number, timeUnit: TimeUnit, expectedDate: Date) => {
      const startDate: Date = new Date(2020, 0, 1);
      const limits: Limits = new Limits(startDate, null);
      const starTime = new Date(null, null, null, 4);
      const endTime = new Date(null, null, null, 18);
      const dailayConfiguration: DailyConfiguration = new DailyConfiguration(frecuency, null, timeUnit, occursEveryNumber, starTime, endTime);
      const configuration: Configuration = new Configuration(SchedulerType.Recurring, true, Occurs.Daily, currentDate, limits, null, dailayConfiguration);

      const scheduler: Scheduler = SchedulerFactory.create(configuration);

      const nextDate: Date = scheduler.getNextDateTime(inputDate).nextDate;

      expect(nextDate).toStrictEqual(expectedDate);
    });
});
