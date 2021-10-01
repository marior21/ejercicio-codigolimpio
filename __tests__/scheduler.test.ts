import Limits from "../src/limits";
import ConfigurationRecurring from "../src/configurationRecurring";
import Ouput from "../src/ouput";
import { Ocurrs } from "../src/enums";
import SchedulerBase from "../src/schedulerBase";
import SchedulerOnce from "../src/schedulerOnce";
import SchedulerRecurring from "../src/schedulerRecurring";

describe('scheduler', () => {
  const onceDate: Date = new Date(2020, 1, 8, 14);
  const currentDate: Date = new Date(2020, 1, 4);

  function getOnceScheduler(enabled: boolean): SchedulerOnce {
    const startDate: Date = new Date(2020, 1, 1);
    const limits: Limits = new Limits(startDate, null);
    return new SchedulerOnce(enabled, onceDate, limits);
  };


  function getRecurringScheduler(enabled: boolean, ocurrs: Ocurrs, frecuency: number): SchedulerRecurring {
    const startDate: Date = new Date(2020, 1, 1);
    const configuration: ConfigurationRecurring = new ConfigurationRecurring(ocurrs, frecuency, enabled);
    const limits: Limits = new Limits(startDate, null);
    return new SchedulerRecurring(configuration, limits);
  };



  test('next date in once date mode in scheduler enabled return once date', () => {
    const scheduler: SchedulerBase = getOnceScheduler(true);
    const ouput: Ouput = scheduler.getNextDateTime(currentDate);
    expect(ouput.nextDate).toBe(onceDate);
  });

  test('next date in once date mode in scheduler not enabled return null', () => {
    const scheduler: SchedulerBase = getOnceScheduler(false);
    const ouput: Ouput = scheduler.getNextDateTime(currentDate);
    expect(ouput).toBe(null);
  });

  test('next date in recurring date mode in scheduler enabled and one day frecuency return correct date', () => {
    const scheduler: SchedulerBase = getRecurringScheduler(true, Ocurrs.Daily, 1);
    const ouput: Ouput = scheduler.getNextDateTime(currentDate);

    const dateExpected = new Date(2020, 1, 5);

    expect(ouput.nextDate).toStrictEqual(dateExpected);
  });
});
