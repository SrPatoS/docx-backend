import { Router } from "express";
import { UserApiController } from "./user-api.controller"
import { validationBodyMiddleware } from "@src/middleware/validation-body.middleware";
import { userApiSchema } from "@src/api/user-api/user-api.schema";

const controller = new UserApiController();
export const userApiRoutes = Router();

userApiRoutes.post("/",
  validationBodyMiddleware(userApiSchema),
  controller.create
);

