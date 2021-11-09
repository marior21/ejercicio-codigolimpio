import Configuration from "../src/domain/configuration/configuration";
import Limits from "../src/domain/configuration/limits";
import Week from "../src/domain/configuration/week";
import { Occurs, SchedulerType } from "../src/domain/enums";


describe('configuration', () => {
  test('week throw error if day is incorrect', () => {
    const week: Week = new Week();
    expect(() => week.isDayChoosen(9)).toThrowError();
  });

  test('configuration throw error if schedulertype is null', () => {
    const startDate: Date = new Date(2020, 0, 1);
    const limits: Limits = new Limits(startDate, null);
    expect(() => new Configuration(null, true, null, new Date(4, 5, 2020), limits, null, null, null)).toThrowError();
  });

  test('configuration throw error if enabled is null', () => {
    const startDate: Date = new Date(2020, 0, 1);
    const limits: Limits = new Limits(startDate, null);
    expect(() => new Configuration(SchedulerType.Once, null, null, new Date(4, 5, 2020), limits, null, null, null)).toThrowError();
  });

  test('configuration throw error if limits is null', () => {
    expect(() => new Configuration(SchedulerType.Once, true, null, new Date(4, 5, 2020), null, null, null, null)).toThrowError();
  });

  test('configuration throw error if oncedata is null', () => {
    const startDate: Date = new Date(2020, 0, 1);
    const limits: Limits = new Limits(startDate, null);
    expect(() => new Configuration(SchedulerType.Once, true, null, null, limits, null, null, null)).toThrowError();
  });

  test('configuration throw error if occurs is null', () => {
    const startDate: Date = new Date(2020, 0, 1);
    const limits: Limits = new Limits(startDate, null);
    expect(() => new Configuration(SchedulerType.Recurring, true, null, null, limits, null, null, null)).toThrowError();
  });

  test('configuration throw error if weeklyConfiguration is null', () => {
    const startDate: Date = new Date(2020, 0, 1);
    const limits: Limits = new Limits(startDate, null);
    expect(() => new Configuration(SchedulerType.Recurring, true, Occurs.Weekly, null, limits, null, null, null)).toThrowError();
  });

  test('configuration throw error if dailyConfiguration is null', () => {
    const startDate: Date = new Date(2020, 0, 1);
    const limits: Limits = new Limits(startDate, null);
    expect(() => new Configuration(SchedulerType.Recurring, true, Occurs.Daily, null, limits, null, null, null)).toThrowError();
  });

  test('configuration throw error if monthlyConfiguration is null', () => {
    const startDate: Date = new Date(2020, 0, 1);
    const limits: Limits = new Limits(startDate, null);
    expect(() => new Configuration(SchedulerType.Recurring, true, Occurs.Monthly, null, limits, null, null, null)).toThrowError();
  });

});