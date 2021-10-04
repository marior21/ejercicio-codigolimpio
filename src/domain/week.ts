export default class Week {
    public monday: boolean;
    public tuesday: boolean;
    public wednesday: boolean;
    public thursday: boolean;
    public friday: boolean;
    public saturday: boolean;
    public sunday: boolean;

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
}