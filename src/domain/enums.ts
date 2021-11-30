export enum SchedulerType {
    Once,
    Recurring
}

export enum Occurs {
    Daily = 0,
    Weekly = 1,
    Monthly = 2
}

export enum TimeUnit {
    Hours,
    Minuts,
    Seconds
}

export enum MonthlyFrecuencyType {
    exactDay,
    variableDay
}

export enum VariableDayNumber {
    First = 1,
    Second = 2,
    Third = 3,
    Fourth = 4,
    Last = 0
}

export enum VariableDayType {
    Monday = 1,
    Tuesday = 2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5,
    Saturday = 6,
    Sunday = 7,
    Day = 8,
    Weekday = 9,
    Weekendday = 10
}