export default class Week {
    public monday = false;
    public tuesday = false;
    public wednesday = false;
    public thursday = false;
    public friday = false;
    public saturday = false;
    public sunday = false;

    public isDayChoosen(day: number): boolean {
        switch (day) {
            case 0: return this.sunday;
            case 1: return this.monday;
            case 2: return this.tuesday;
            case 3: return this.wednesday;
            case 4: return this.thursday;
            case 5: return this.friday;
            case 6: return this.saturday;
            default: throw new Error("Day week overflow");
        }
    }

    public isEmpty(): boolean {
        return this.sunday === false &&
            this.monday === false &&
            this.tuesday === false &&
            this.wednesday === false &&
            this.thursday === false &&
            this.friday === false &&
            this.saturday === false;
    }

}