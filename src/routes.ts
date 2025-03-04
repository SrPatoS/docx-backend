import { Router } from "express";
import { apiMiddleware } from "@src/middleware/api.middleware";
import { authMiddleware } from "@src/middleware/auth.middleware";
import { authApiRoutes } from "./api/module/auth-api/auth-api.routes";
import { userApiRoutes } from "./api/module/user-api/user-api.routes";
import { companyApiRoutes } from "./api/module/company-api/company.routes";

export const routes = Router();

routes.use(apiMiddleware);
routes.use("/auth", authApiRoutes);

routes.use(authMiddleware);
routes.use("/user", userApiRoutes);

routes.use(authMiddleware);
routes.use("/company", companyApiRoutes);