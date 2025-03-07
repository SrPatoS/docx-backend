import { Router } from "express";
import { UserApiController } from "./user-api.controller";
import { validationBodyMiddleware } from "@src/middleware/validation-body.middleware";
import { userApiSchema } from "./user-api.schema";
import { UpdateUserApiController } from "./usecases/update-user-api.controller";
import { multerUpload } from "@src/api/_core/multer/multer.config";

const controller = new UserApiController();
const controllerTest = new UpdateUserApiController();

export const userApiRoutes = Router();

userApiRoutes.post("/",
	validationBodyMiddleware(userApiSchema),
	controller.create
);

userApiRoutes.get("/", controller.read);
userApiRoutes.post("/last-cloud-downloaded", controller.getLastCloudDownloaded);
userApiRoutes.put("/", controllerTest.getRouter());
userApiRoutes.post("/avatar/upload", multerUpload.single("image"), controller.avatarUpload);
userApiRoutes.post("/avatar/create-upload", multerUpload.single("image"), controller.avatarCreateUpload);
