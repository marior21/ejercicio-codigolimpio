export default class Scheduler {
    readonly configuration: Configuration;
    readonly limits: Limits;
    constructor(theConfiguration: Configuration, theLimits: Limits) {
        this.configuration = theConfiguration;
        this.limits = theLimits;
    }

    getNextDateTime(currentDateTime: Date): Ouput {
        return new Ouput("Prueba", currentDateTime);
    }
}