import { Router } from "express";
import { SendCodeEmailController } from "./code.controller";

export const controller =  new SendCodeEmailController()
export const codeEmailApiRoutes = Router();

codeEmailApiRoutes.post("/recovery-password", controller.recoveryPassword);