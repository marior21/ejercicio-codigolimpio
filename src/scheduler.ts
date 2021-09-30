export default class Scheduler {
    private readonly _configuration: Configuration;
    private readonly _limits: Limits;
    constructor(configuration: Configuration, limits: Limits) {
        this._configuration = configuration;
        this._limits = limits;
    }

    getNextDateTime(currentDateTime: Date): Ouput {
        if (this._configuration.type === Types.Once) {
            return this.getOnceOuput()
        }
        return new Ouput("Prueba", currentDateTime);
    }

    private getOnceOuput(): Ouput {
        const dateOnce: string = this._configuration.onceDate.toDateString();
        const timeOnce: string = this._configuration.onceDate.toTimeString();
        const description = `Ocurrs once. Shedule will be used on ${dateOnce} at ${timeOnce} started on ${this._limits.startDate}`;

        return new Ouput(description, this._configuration.onceDate);
    }
}