import { Router } from "express";
import { AuthApiController } from "./auth-api.controller";


const controller = new AuthApiController();

export const authApiRoutes = Router();

authApiRoutes.post("/", controller.login);