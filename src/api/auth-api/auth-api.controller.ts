import { NextFunction, Request, Response } from "express";
import { AuthUseCase } from "@src/api/auth-api/usecases/auth.usecase";
import { apiCreateResponseUtil } from "@src/api/_utils/api-create-response.util";

export class AuthApiController {
  async login(req: Request, res: Response) {
    const service = new AuthUseCase();
    const data = await service.handler(req.body);
    apiCreateResponseUtil(data, res);
  }
}