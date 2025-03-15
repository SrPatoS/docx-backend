import { getUserWorkReportHashUtil } from "@src/api/module/work-report-api/utils/get-user-work-report-hash.util";
import { IWorkReport, workReportModel, WorkStatus } from "@src/models/work-report.model";
import { ApiResponse } from "@src/api/_types/api-response.type";

export class GetCurrentAndNextStatusWorkReportUseCase {
	async handler(userId: Id): Promise<ApiResponse> {
		const response: ApiResponse = {
			errors: [],
			message: "",
			data: {}
		};

		const id = getUserWorkReportHashUtil(userId);

		const data = <IWorkReport | null>await workReportModel.findOne({
			hash: id,
			active: true
		}).exec();

		if (!data) {
			return {
				...response,
				data: {
					current: WorkStatus.WaitingStart,
					next: WorkStatus.Started
				}
			};
		}

		let status = {
			current: WorkStatus.Started,
			next: WorkStatus.LunchStarted
		};

		if (data.currentStatus === WorkStatus.Started) {
			status = {
				current: WorkStatus.Started,
				next: WorkStatus.LunchStarted
			};
		} else if (data.currentStatus === WorkStatus.LunchStarted) {
			status = {
				current: WorkStatus.LunchStarted,
				next: WorkStatus.LunchFinished
			};
		} else if (data.currentStatus === WorkStatus.LunchFinished) {
			status = {
				current: WorkStatus.LunchFinished,
				next: WorkStatus.Finished
			};
		} else if (data.currentStatus === WorkStatus.Finished) {
			status = {
				current: WorkStatus.Finished,
				next: WorkStatus.None
			};
		}

		response.data = status;

		return response;
	}
}