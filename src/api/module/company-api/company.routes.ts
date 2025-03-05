import { CompanyApiController } from "./company-api.controller";

const controller = new CompanyApiController();
export const companyApiRoutes = controller.getRouter();