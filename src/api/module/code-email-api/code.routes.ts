import { Router } from "express";
import { SendCodeEmailController } from "./code.controller";

export const controller =  new SendCodeEmailController()
export const codeEmailApiRoutes = Router();

codeEmailApiRoutes.post("/send-code-recovery-password", controller.recoveryPassword);
codeEmailApiRoutes.post("/validate-recovery-code", controller.validateCode);