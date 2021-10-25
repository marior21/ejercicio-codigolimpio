export default class Utils {
    public static formatDate(date: Date): string {
        return date?.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
    }

    public static formatTime(time: Date): string {
        return time?.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    }

    public static getDaySpanishFormat(date: Date): number {
        return date.getDay() === 0 ? 7 : date.getDay();
    }
}