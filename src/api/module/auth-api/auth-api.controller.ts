import { NextFunction, Request, Response } from "express";
import { apiCreateResponseUtil } from "@src/api/_utils/api-create-response.util";
import { AuthUseCase } from "./usecases/auth.usecase";

export class AuthApiController {
  async login(req: Request, res: Response) {
    const service = new AuthUseCase();
    const data = await service.handler(req.body);
    apiCreateResponseUtil(data, res);
  }
}