import { Router } from "express";
import { userApiRoutes } from "@src/api/user-api/user-api.routes";
import { apiMiddleware } from "@src/middleware/api.middleware";

export const routes = Router();

routes.use(apiMiddleware);

routes.use("/user", userApiRoutes);