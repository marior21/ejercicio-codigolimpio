import Limits from "../src/domain/configuration/limits";
import Ouput from "../src/domain/ouput";
import { Occurs, SchedulerType } from "../src/domain/enums";
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
    [1,Date.UTC(2020, 4, 4), Date.UTC(null, null, null, 12, 23, 56), Date.UTC(2020, 4, 5, 12, 23, 56)]
  ])('next date calculate is correct with daily configuration and occurs once %p anad %p',
    (frecuency:number, inputNumberDate: number, occurOnceTimeNumber: number, expectedNumberDate: number) => {
      const inputDate = new Date(inputNumberDate);
      const occurOnceTime = new Date(occurOnceTimeNumber);
      const expectedDate = new Date(expectedNumberDate);
      const startDate: Date = new Date(2020, 0, 1);
      const limits: Limits = new Limits(startDate, null);
      const dailayConfiguration: DailyConfiguration = new DailyConfiguration(frecuency, occurOnceTime, null, null, null, null);
      const configuration: Configuration = new Configuration(SchedulerType.Recurring, true, Occurs.Daily, currentDate, limits, null, dailayConfiguration);

      const scheduler: Scheduler = SchedulerFactory.create(configuration);

      const nextDate: Date = scheduler.getNextDateTime(inputDate).nextDate;

      expect(nextDate).toStrictEqual(expectedDate);
    });
});
