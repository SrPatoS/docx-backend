import { apiCreateResponseUtil } from "@src/api/_utils/api-create-response.util";
import { GenericUploadUseCase } from "./generic-upload.usecase";
import { Request, Response } from "express";

export class GenericUploadController {
    async avatarCreateUpload(req: Request, res: Response) {
        const service = new GenericUploadUseCase();
        const body = {
            _id: req.body._id,
            model: req.body.model,
            buffer: req.file!.buffer
        }
        const data = await service.handler(body);
        apiCreateResponseUtil(data, res);
    }
}