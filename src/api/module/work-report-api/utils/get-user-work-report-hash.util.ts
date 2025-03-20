import { CryptoUtil } from "@src/api/_utils/crypto.util";
import { workReportModel } from "@src/models/work-report.model";
import { DateUtil } from "@src/api/_utils/date.util";

export async function getUserWorkReportHashUtil(userId: Id): Promise<string> {
	const pendingWork = await workReportModel.findOne({
		userId: userId,
		endWork: null,
		active: true
	}).select({
		startWork: true
	}).exec();

	let dateToCreate = DateUtil.formatToPtBrDate(new Date());

	if (pendingWork && pendingWork.startWork) {
		dateToCreate = pendingWork.startWork.date;
	}

	const date = dateToCreate.toLocaleDateString("pt-BR");
	return CryptoUtil.createMd5(`${date}-${String(userId)}`);
}