import { Model, PipelineStage } from "mongoose";
import { ApiResponse } from "@src/api/_types/api-response.type";
import { z, ZodError } from "zod";
import { formatZodErrorUtil } from "@src/api/_utils/format-zod-error.util";
import { MongoUtils } from "@src/api/_utils/mongo.utils";
import { DateUtil } from "@src/api/_utils/date.util";

export class CrudUseCase {
	constructor(
		private model: Model<any>,
		private validationSchema: z.ZodSchema
	) {
	}

	async create(data: any): Promise<ApiResponse> {
		const errors = this.validateData(data);

		const find = await this.model.findOne({
			active: true,
			uniqueCode: data.uniqueCode
		}).exec();

		if (find) {
			errors.push("Já existe um registro com este código!");
		}

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

	async update(data: any, id: string | Id): Promise<ApiResponse> {
		const errors = this.validateData(data);

		const find = await this.model.findOne({
			active: true,
			_id: MongoUtils.convertObjetId(id)
		}).exec();

		if (!find) {
			errors.push("Não existe um registro com este Id!");
		}

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

		if (!id) {
			response.errors.push("Id invalido!");
		}

		if (response.errors.length) {
			return response;
		}

		await this.model.updateOne({
			_id: MongoUtils.convertObjetId(id),
			active: true
		}, {
			$set: {
				active: false,
				uniqueCode: `deleted-time: ${DateUtil.getCurrentTimeString()}`
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

		if (!id) {
			response.errors.push("Id invalido!");
		}

		if (response.errors.length) {
			return response;
		}

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

	async paginated(
		page: number,
		itemsPerPage: number,
		sortField?: string,
		sort?: number,
		search?: string,
		fields?: string[]
	) {
		let response: ApiResponse = {
			errors: [],
			data: {},
			message: ""
		};

		let query: any = { active: true };

		if (search && fields) {
			const escapeRegex = (text: string) => {
				return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
			};

			const escapedSearch = escapeRegex(String(search));
			const textSearch: any[] = fields.map((field) => ({
				[field]: { $regex: escapedSearch, $options: "i" }
			}));

			query.$or = textSearch;
		}

		const total = await this.model.countDocuments(query).exec();

		const pipeline: PipelineStage[] = [
			{ $match: query }
		];

		if (sort && sortField) {
			pipeline.push({
				$sort: { [sortField]: sort as any }
			});
		}

		pipeline.push(
			{ $skip: (page - 1) * itemsPerPage },
			{ $limit: itemsPerPage }
		);

		response.data = {
			page,
			itemsPerPage,
			sortField,
			sort,
			items: await this.model.aggregate(pipeline).exec(),
			total
		};

		return response;
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
}