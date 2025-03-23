import { CrudController } from "@src/api/_core/crud/crud.controller";
import { companyModel } from "@src/models/company.model";
import { companyApiSchema } from "@src/api/module/company-api/company-api.schema";
import { Request, Response } from "express";
import { RabbitmqService } from "@src/provider/rabbitmq/rabbitmq.service";
import { apiCreateResponseUtil } from "@src/api/_utils/api-create-response.util";

export class CompanyApiController extends CrudController {
	constructor() {
		super(
			"company",
			companyModel,
			companyApiSchema
		);
	}

	async uploadAvatar(req: Request, res: Response) {
		const rabbitmqService = new RabbitmqService();
		const imageBuffer = req.file!.buffer;

		if (!imageBuffer || !req.query.companyId) {
			return;
		}

		await rabbitmqService.sendToQueue("file-upload", {
			buffer: imageBuffer,
			fileName: req.file!.originalname,
			companyId: req.query.companyId,
			callBackQueue: "company-avatar-callback"
		});

		apiCreateResponseUtil({
			errors: [],
			message: "Upload image sended t	o queue",
			data: {}
		}, res);
	}
}