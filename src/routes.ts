import { Router } from "express";
import { apiMiddleware } from "@src/middleware/api.middleware";
import { authMiddleware } from "@src/middleware/auth.middleware";
import { authApiRoutes } from "./api/module/auth-api/auth-api.routes";
import { userApiRoutes } from "./api/module/user-api/user-api.routes";
import { companyApiRoutes } from "./api/module/company-api/company.routes";
import { workReportApiRoutes } from "./api/module/work-report-api/work-report-api.routes";
import { genericUploadRoutes } from "./api/_core/crud-upload-avatar/generic-upload/generic-upload.routes";
import { menuApiRoutes } from "@src/api/module/menu-api/menu-api.routes";
import { workReportApiMoreRoutes, workWeekApiRoutes } from "./api/module/workweek-api/work-week.routes";

export const routes = Router();

routes.use(apiMiddleware);
routes.use("/auth", authApiRoutes);

routes.use(authMiddleware);
routes.use("/user", userApiRoutes);
routes.use("work-report", workReportApiRoutes);
routes.use("/", companyApiRoutes);
routes.use("/generic-upload", genericUploadRoutes);
routes.use("/", menuApiRoutes);
routes.use("/", workWeekApiRoutes);
routes.use("/week", workReportApiMoreRoutes);