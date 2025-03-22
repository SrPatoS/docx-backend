import { MenuApiController } from "@src/api/module/menu-api/menu-api.controller";
import { ruleMiddleware } from "@src/middleware/rule.middleware";

const controller = new MenuApiController();

export const menuApiRoutes = controller.getRouter([
	ruleMiddleware(["admin"])
]);

menuApiRoutes.get("/menu/read-menus", controller.getMenus);