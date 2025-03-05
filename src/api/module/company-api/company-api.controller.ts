import { CrudController } from "@src/api/_core/crud/crud.controller";
import { companyModel } from "@src/models/company.model";
import { companyApiSchema } from "@src/api/module/company-api/company-api.schema";

export class CompanyApiController extends CrudController {
	constructor() {
		super(
			"company",
			companyModel,
			companyApiSchema
		);
	}
}