import { CrudController } from "@src/api/_core/crud/crud.controller";
import { menuApiSchema } from "@src/api/module/menu-api/menu-api.schema";
import { menuModel } from "@src/models/menu.model";

export class MenuApiController extends CrudController {
	constructor() {
		super(
			"menu",
			menuModel,
			menuApiSchema
		);
	}
}