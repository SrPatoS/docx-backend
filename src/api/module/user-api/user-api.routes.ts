import { Router } from "express";
import { UserApiController } from "./user-api.controller"
import { validationBodyMiddleware } from "@src/middleware/validation-body.middleware";
import { userApiSchema } from "./user-api.schema";


const controller = new UserApiController();
export const userApiRoutes = Router();

userApiRoutes.post("/",
  validationBodyMiddleware(userApiSchema),
  controller.create
);

userApiRoutes.get("/", controller.read);
userApiRoutes.post("/last-cloud-downloaded", controller.getLastCloudDownloaded);
