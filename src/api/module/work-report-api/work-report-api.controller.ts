import { apiCreateResponseUtil } from "@src/api/_utils/api-create-response.util";
import { WorkReportCreate } from "./usecases/create-work-report-api.usecase";
import { Request, Response } from "express";
import {
	GetCurrentAndNextStatusWorkReportUseCase
} from "@src/api/module/work-report-api/usecases/get-current-and-next-status-work-report.usecase";

export class WorkReportApiController {
	async create(req: Request, res: Response) {
		const service = new WorkReportCreate();
		const data = await service.handle(res.locals["userData"]._id, req.body);
		apiCreateResponseUtil(data, res);
	}

	async getCurrentStatus(req: Request, res: Response) {
		const useCase = new GetCurrentAndNextStatusWorkReportUseCase();
		const data = await useCase.handler(res.locals["userData"]._id);
		apiCreateResponseUtil(data, res);
	}
}