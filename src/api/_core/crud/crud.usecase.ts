import { Model, PipelineStage } from "mongoose";
import { ApiResponse } from "@src/api/_types/api-response.type";
import { z, ZodError } from "zod";
import { formatZodErrorUtil } from "@src/api/_utils/format-zod-error.util";
import { MongoUtils } from "@src/api/_utils/mongo.utils";
import { it } from "node:test";

export class CrudUseCase<T> {
	constructor(
		private model: Model<T>,
		private validationSchema: z.Schema
	) {
	}

	private validateData(data: any): string[] {
		const errors: string[] = [];
		try {
			this.validationSchema.parse(data);
		} catch (err) {
			if (err instanceof ZodError) {
				errors.push(...formatZodErrorUtil(err));
			}
		}
		return errors;
	}

	async create(data: T): Promise<ApiResponse> {
		const errors = this.validateData(data);
		let response: ApiResponse = {
			errors: [],
			data: {},
			message: ""
		};

		if (errors.length) {
			return {
				errors: errors,
				data: {},
				message: "Erro de Validação!"
			};
		}

		response.data = await this.model.create(data);
		response.message = "Criado com sucesso!";

		return response;
	}

	async update(data: T, id: string | Id): Promise<ApiResponse> {
		const errors = this.validateData(data);
		let response: ApiResponse = {
			errors: [],
			data: {},
			message: ""
		};

		if (errors.length) {
			return {
				errors: errors,
				data: {},
				message: "Erro de Validação!"
			};
		}

		response.data = await this.model.updateOne({
			_id: MongoUtils.convertObjetId(id),
			active: true
		}, {
			$set: data as any
		}).exec();
		response.message = "Atualizado com sucesso!";

		return response;
	}

	async delete(id: string | Id): Promise<ApiResponse> {
		let response: ApiResponse = {
			errors: [],
			data: {},
			message: ""
		};

		await this.model.updateOne({
			_id: MongoUtils.convertObjetId(id),
			active: true
		}, {
			$set: {
				active: false
			}
		}).exec();

		response.message = "Deletado com sucesso!";

		return response;
	}

	async get(id: string | Id): Promise<ApiResponse> {
		let response: ApiResponse = {
			errors: [],
			data: {},
			message: ""
		};

		response.data = await this.model.findOne({
			_id: MongoUtils.convertObjetId(id),
			active: true
		}).exec() ?? {};

		return response;
	}

	async all(query: Record<string, any>): Promise<ApiResponse> {
		let response: ApiResponse = {
			errors: [],
			data: {},
			message: ""
		};

		response.data = await this.model.find({
			...query,
			active: true
		}).exec() ?? [];

		return response;
	}

	async search(search: string, fields: string[]): Promise<ApiResponse> {
		let response: ApiResponse = {
			errors: [],
			data: {},
			message: ""
		};

		const escapeRegex = (text: string) => {
			return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
		};

		const textSearch: any[] = [];
		const escapedSearch = escapeRegex(String(search));

		fields.forEach((field) => {
			textSearch.push({
				[field]: { $regex: escapedSearch, $options: "i" },
				active: true
			});
		});

		const query = {
			$or: textSearch
		};

		response.data = await this.model.aggregate([
			{
				$match: query
			}
		]).exec();

		return response;
	}

	async paginated(page: number, itemsPerPage: number, sortField?: string, sort?: number, search?: string, fields?: string[]) {
		let response: ApiResponse = {
			errors: [],
			data: {},
			message: ""
		};

		let query = {};

		if (search && fields) {
			const escapeRegex = (text: string) => {
				return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
			};

			const textSearch: any[] = [];
			const escapedSearch = escapeRegex(String(search));

			fields.forEach((field) => {
				textSearch.push({
					[field]: { $regex: escapedSearch, $options: "i" },
					active: true
				});
			});

			query = {
				$or: textSearch
			};
		}

		const pipeline: PipelineStage[] = [
			{
				$match: {
					active: true,
					...query
				}
			},
			{
				$limit: itemsPerPage
			},
			{
				$skip: (page - 1) * itemsPerPage
			}
		];

		if (sort && sortField) {
			pipeline.push({
				$sort: {
					[sortField]: sort as any
				}
			});
		}

		response.data = await this.model.aggregate(pipeline).exec();

		return response;
	}
}