import { Request, Response } from "express";
import { apiCreateResponseUtil } from "@src/api/_utils/api-create-response.util";
import { ApiResponse } from "@src/api/_types/api-response.type";
import { UserApiCreateUseCase, UserCreateData } from "./usecases/user-api-create.usecase";
import { UserApiLastCloudDownloadedService } from "./usecases/user-api-last-cloud-downloaded.service";
import { UserApiUploadAvatarUseCase } from "@src/api/module/user-api/usecases/user-api-upload-avatar.usecase";
import { UserAvatarCreateUseCase } from "./usecases/user-api-upload-create-avar.usecase";

export class UserApiController {
	async create(req: Request, res: Response) {
		const service = new UserApiCreateUseCase();
		const data = await service.handler(req.body as UserCreateData);
		apiCreateResponseUtil(data, res);
		res.locals["userCreateData"] = data.data
	}

	async read(req: Request, res: Response) {
		const data: ApiResponse = {
			errors: [],
			message: "",
			data: res.locals["userData"]
		};
		apiCreateResponseUtil(data, res);
	}

	async getLastCloudDownloaded(req: Request, res: Response) {
		const service = new UserApiLastCloudDownloadedService();
		const data = await service.handler(new Date(req.body.date), res.locals["userData"]);
		apiCreateResponseUtil(data, res);
	}

	async avatarUpload(req: Request, res: Response) {
		const service = new UserApiUploadAvatarUseCase();
		const imageBuffer = req.file!.buffer;
		const data = await service.handler(res.locals["userData"]._id, imageBuffer);
		apiCreateResponseUtil(data, res);
	}

	async avatarCreateUpload(req: Request, res: Response) {
		const service = new UserAvatarCreateUseCase();
		const imageBuffer = req.file!.buffer;
		const data = await service.handler(req.body,imageBuffer);
		apiCreateResponseUtil(data, res);
	}
}