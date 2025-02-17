import { Router } from "express";
import { userApiRoutes } from "@src/api/user-api/user-api.routes";
import { apiMiddleware } from "@src/middleware/api.middleware";
import { authApiRoutes } from "@src/api/auth-api/auth-api.routes";
import { authMiddleware } from "@src/middleware/auth.middleware";

export const routes = Router();

routes.use(apiMiddleware);
routes.use(authMiddleware);

routes.use("/user", userApiRoutes);
routes.use("/auth", authApiRoutes);