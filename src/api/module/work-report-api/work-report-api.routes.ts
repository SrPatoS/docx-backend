import { Router } from "express";
import { WorkReportApiController } from "./work-report-api.controller";
import { validationBodyMiddleware } from "@src/middleware/validation-body.middleware";
import { workReportSchema } from "@src/api/module/work-report-api/work-report-api.schema";

export const workReportApiRoutes = Router();

const controller = new WorkReportApiController();

workReportApiRoutes.post("/",
	validationBodyMiddleware(workReportSchema),
	controller.create
);

workReportApiRoutes.get("/current-status", controller.getCurrentStatus);
workReportApiRoutes.get("/week-report", controller.getWeekReport);