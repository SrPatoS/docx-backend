export class DateUtil {
	public static getCurrentTimeString(): string {
		return new Date().getTime().toString();
	}
}