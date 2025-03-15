import { WorkWeekController } from "./work-week.controller";
import { transformDataWorkWeekUtil } from "@src/api/module/workweek-api/utils/transform-data-work-week.util";

const controller = new WorkWeekController();

const workWeekApiRoutes = controller.getRouter(
	[transformDataWorkWeekUtil]
);

workWeekApiRoutes.get("/work-week/get-by-user", controller.getWeekWorkByUser);

export {
	workWeekApiRoutes
};

