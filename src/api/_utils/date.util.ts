export class DateUtil {
	public static getCurrentTimeString(): string {
		return new Date().getTime().toString();
	}

	public static getPtBrDateString(date: Date): string {
		return date.toLocaleDateString("pt-BR");
	}

	public static formatToPtBrDate(date: Date): Date {
		const newDate = new Date(date);
		newDate.setHours(newDate.getHours() - 3);
		return newDate;
	}
}