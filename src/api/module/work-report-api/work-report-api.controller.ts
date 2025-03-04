import { apiCreateResponseUtil } from "@src/api/_utils/api-create-response.util";
import { WorkReportCreate } from "./usecases/create-work-report-api.usecase";
import { Request, Response } from "express";

export class WorkReportApiController {
    async create(req: Request, res: Response) {
        const service = new WorkReportCreate();
        const data = await service.handle(req.body);
        apiCreateResponseUtil(data, res);
    }
}