import { CompanyApiController } from "./company-api.controller";
import { multerUpload } from "@src/api/_core/multer/multer.config";

const controller = new CompanyApiController();
export const companyApiRoutes = controller.getRouter();

companyApiRoutes.post("/company/avatar",
	multerUpload.single("image"),
	controller.uploadAvatar
);