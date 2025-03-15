import { CrudController } from "@src/api/_core/crud/crud.controller";
import { workWeekModel } from "@src/models/work-week.model";
import { workWeekSchema } from "./work-week.schema";
import { apiCreateResponseUtil } from "@src/api/_utils/api-create-response.util";
import { GetWeekWorkByUserUseCase } from "./usecase/getWeekWorkByUser.usecase";
import { Request, Response } from "express";

export class WorkWeekController extends CrudController {
	constructor() {
		super("work-week", workWeekModel, workWeekSchema);
	}

	async getWeekWorkByUser(req: Request, res: Response) {
		const useCase = new GetWeekWorkByUserUseCase();
		const result = await useCase.handle(res.locals["userData"]._id);
		apiCreateResponseUtil(result, res);
	}
}