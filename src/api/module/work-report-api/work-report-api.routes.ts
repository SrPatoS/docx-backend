import { Router } from "express";
import { WorkReportApiController } from "./work-report-api.controller";

export const workReportApiRoutes = Router();
const controller = new WorkReportApiController();

workReportApiRoutes.post("/create", controller.create);