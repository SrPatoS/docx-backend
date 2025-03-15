import { CryptoUtil } from "@src/api/_utils/crypto.util";
import { workReportModel } from "@src/models/work-report.model";

export async function getUserWorkReportHashUtil(userId: Id): Promise<string> {
	const pendingWork = await workReportModel.findOne({
		userId: userId,
		endWork: null,
		active: true
	}).select({
		date: true
	}).exec();

	let dateToCreate = new Date();

	if (pendingWork) {
		dateToCreate = pendingWork.date;
	}
	
	const date = dateToCreate.toLocaleDateString("pt-BR");
	return CryptoUtil.createMd5(`${date}-${String(userId)}`);
}