class Ouput {
    readonly description: string;
    readonly nextDate: Date;

    constructor(theDescription: string, theNextDate: Date) {
        this.description = theDescription;
        this.nextDate = theNextDate;
    }

    getDescription(): string {
        return this.description;
    }

    getNextDate(): Date {
        return this.nextDate;
    }
}