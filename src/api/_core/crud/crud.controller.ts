import { Model } from "mongoose";
import { CrudUseCase } from "@src/api/_core/crud/crud.usecase";
import { z } from "zod";
import { Request, Response, Router } from "express";
import { apiCreateResponseUtil } from "@src/api/_utils/api-create-response.util";

export class CrudController {
	private useCase: CrudUseCase<any>;

	constructor(
		private route: string,
		private model: Model<any>,
		private validationSchema: z.ZodSchema
	) {
		this.useCase = new CrudUseCase(
			model,
			validationSchema
		);
	}

	getRouter() {
		const router = Router();
		router.post(`/${this.route}`, this.create.bind(this));
		router.put(`/${this.route}`, this.update.bind(this));
		return router;
	}

	protected async create(req: Request, res: Response) {
		const result = await this.useCase.create(req.body);
		apiCreateResponseUtil(result, res);
	}

	protected async update(req: Request, res: Response) {
		const result = await this.useCase.update(req.body, req.query.id ?? "");
		apiCreateResponseUtil(result, res);
	}
}