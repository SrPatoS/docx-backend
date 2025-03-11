import { WorkWeekController } from "./work-week.controller";

const controller = new WorkWeekController();
export const workWeekApiRoutes = controller.getRouter();
