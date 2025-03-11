import { Router } from "express";
import { WorkWeekController } from "./work-week.controller";

const controller = new WorkWeekController();

export const workWeekApiRoutes = controller.getRouter();
export const workReportApiMoreRoutes = Router();

workReportApiMoreRoutes.get("/", controller.getWeekWorkByUser);

