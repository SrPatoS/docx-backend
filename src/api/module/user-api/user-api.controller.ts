import { Request, Response } from "express";
import { apiCreateResponseUtil } from "@src/api/_utils/api-create-response.util";
import { ApiResponse } from "@src/api/_types/api-response.type";
import { UserApiCreateUseCase, UserCreateData } from "./usecases/user-api-create.usecase";
import { UserApiLastCloudDownloadedService } from "./usecases/user-api-last-cloud-downloaded.service";

export class UserApiController {
  async create(req: Request, res: Response) {
    const service = new UserApiCreateUseCase();
    const data = await service.handler(req.body as UserCreateData);
    apiCreateResponseUtil(data, res);
  }

  async read(req: Request, res: Response) {
    const data: ApiResponse = {
      errors: [],
      message: "",
      data: res.locals['userData']
    };
    apiCreateResponseUtil(data, res);
  }

  async getLastCloudDownloaded(req: Request, res: Response) {
    const service = new UserApiLastCloudDownloadedService();
    const data = await service.handler(new Date(req.body.date), res.locals['userData']);
    apiCreateResponseUtil(data, res);
  }
}