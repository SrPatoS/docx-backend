import { CrudController } from "@src/api/_core/crud/crud.controller";
import { menuApiSchema } from "@src/api/module/menu-api/menu-api.schema";
import { menuModel } from "@src/models/menu.model";
import { Request, Response } from "express";
import {
	MenuApiGetDashboardMenusUseCase
} from "@src/api/module/menu-api/usecases/menu-api-get-dashboard-menus.usecase";
import { apiCreateResponseUtil } from "@src/api/_utils/api-create-response.util";

export class MenuApiController extends CrudController {
	constructor() {
		super(
			"menu",
			menuModel,
			menuApiSchema
		);
	}

	async getMenus(req: Request, res: Response) {
		const useCase = new MenuApiGetDashboardMenusUseCase();
		const data = await useCase.handler(res.locals["userData"]);
		apiCreateResponseUtil(data, res);
	}
}