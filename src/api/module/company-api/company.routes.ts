import { Router } from "express";
import { CompanyApiController } from "./company-api.controller";
import { validationBodyMiddleware } from "@src/middleware/validation-body.middleware";
import { companyApiSchema } from "./company-api.schema";

export const companyApiRoutes = Router();
const controller = new CompanyApiController();

companyApiRoutes.post("/",
    validationBodyMiddleware(companyApiSchema),
    controller.create
);