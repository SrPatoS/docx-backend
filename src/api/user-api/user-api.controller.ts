import { UserApiCreateUseCase, UserCreateData } from "@src/api/user-api/usecases/user-api-create.usecase";
import { Request, Response } from "express";
import { apiCreateResponseUtil } from "@src/api/_utils/api-create-response.util";

export class UserApiController {
  async create(req: Request, res: Response) {
    const service = new UserApiCreateUseCase();
    const data = await service.handler(req.body as UserCreateData);
    apiCreateResponseUtil(data, res);
  }
}