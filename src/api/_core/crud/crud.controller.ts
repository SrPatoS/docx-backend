import { Model } from "mongoose";
import { CrudUseCase } from "@src/api/_core/crud/crud.usecase";
import { z } from "zod";
import { Request, Response, Router } from "express";
import { apiCreateResponseUtil } from "@src/api/_utils/api-create-response.util";

export class CrudController {
	private useCase: CrudUseCase;

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
		router.get(`/${this.route}`, this.get.bind(this));
		router.delete(`/${this.route}`, this.delete.bind(this));
		router.get(`/${this.route}/all`, this.all.bind(this));
		router.post(`/${this.route}/paginated`, this.paginated.bind(this));
		router.post(`/${this.route}/search`, this.search.bind(this));
		return router;
	}

	protected async create(req: Request, res: Response) {
		const result = await this.useCase.create(req.body);
		apiCreateResponseUtil(result, res);
	}

	protected async update(req: Request, res: Response) {
		const result = await this.useCase.update(req.body, req.query.id as string ?? "");
		apiCreateResponseUtil(result, res);
	}

	protected async get(req: Request, res: Response) {
		const result = await this.useCase.get(req.query.id as string ?? "");
		apiCreateResponseUtil(result, res);
	}

	protected async delete(req: Request, res: Response) {
		const result = await this.useCase.delete(req.query.id as string ?? "");
		apiCreateResponseUtil(result, res);
	}

	protected async all(req: Request, res: Response) {
		const result = await this.useCase.all(req.query ?? {});
		apiCreateResponseUtil(result, res);
	}

	protected async paginated(req: Request, res: Response) {
		const { page, itemsPerPage, sortField, sort, search, fields } = req.body;
		const result = await this.useCase.paginated(
			parseInt(page as string),
			parseInt(itemsPerPage as string),
			sortField as string,
			parseInt(sort as string),
			search as string,
			fields as string[]
		);
		apiCreateResponseUtil(result, res);
	}

	protected async search(req: Request, res: Response) {
		const { search, fields } = req.body;
		const result = await this.useCase.search(
			search as string ?? "name",
			fields as string[] ?? "name"
		);
		apiCreateResponseUtil(result, res);
	}
}