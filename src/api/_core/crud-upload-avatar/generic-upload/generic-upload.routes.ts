import { Router } from "express";
import { GenericUploadController } from "./generic-upload.controller";
import { multerUpload } from "../../multer/multer.config";

export const genericUploadRoutes = Router();
const controller = new GenericUploadController();

genericUploadRoutes.post("/avatar", multerUpload.single("image"), controller.avatarCreateUpload);