import { Request, Response } from "express";
import { CompanyApiCreateUseCase } from "./usecases/create-company-api.usecase";
import { apiCreateResponseUtil } from "@src/api/_utils/api-create-response.util";

export class CompanyApiController {
    async create(req:Request, res: Response){
        const service = new CompanyApiCreateUseCase();
        const data = await service.handler(req.body);
        apiCreateResponseUtil(data, res);
    }
}