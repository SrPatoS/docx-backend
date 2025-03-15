import { ApiResponse } from "@src/api/_types/api-response.type";
import { getUserWorkReportHashUtil } from "@src/api/module/work-report-api/utils/get-user-work-report-hash.util";
import { workReportModel, WorkStatus } from "@src/models/work-report.model";
import { DateUtil } from "@src/api/_utils/date.util";

interface ICreateWorkReport {
	status: WorkStatus;
	observation: string;
	date: string;
}

export class WorkReportCreate {
	async handle(userId: Id, data: ICreateWorkReport): Promise<ApiResponse> {
		const id = await getUserWorkReportHashUtil(userId);

		const currentDate = DateUtil.formatToPtBrDate(new Date(data.date));

		const report = {
			key: "",
			data: {
				date: currentDate,
				observation: data.observation
			}
		};

		const statusMap: Record<WorkStatus, string> = {
			[WorkStatus.WaitingStart]: "waiting",
			[WorkStatus.Started]: "startWork",
			[WorkStatus.LunchStarted]: "startLunch",
			[WorkStatus.LunchFinished]: "endLunch",
			[WorkStatus.Finished]: "endWork",
			[WorkStatus.None]: "endWork"
		};

		report.key = statusMap[data.status] ?? "";

		await workReportModel.updateOne({
			hash: id
		}, {
			$set: {
				userId: userId,
				date: currentDate,
				uniqueCode: id,
				dateString: DateUtil.getPtBrDateString(currentDate),
				hash: id,
				currentStatus: data.status,
				[report.key]: report.data
			}
		}, { upsert: true }).exec();

		return {
			data: {},
			message: "Status Atualizado!",
			errors: []
		};
	}
}
