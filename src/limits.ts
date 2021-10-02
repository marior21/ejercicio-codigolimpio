export default class Limits {
    private readonly _startDate: Date;
    private readonly _endDate: Date;


    constructor(startDate: Date, endDate: Date) {
        // if (startDate == null) {
        //     throw new Error("startDate must have a value");
        // }
        // if (endDate == null) {
        //     throw new Error("endDate must have a value");
        // }
        this._startDate = startDate;
        this._endDate = endDate;
    }

    get startDate(): Date {
        return this._startDate;
    }

    get endDate(): Date {
        return this._endDate;
    }
}