import { Router } from "express";
import { RuleApiController } from "./rules.controller";

export const ruleApiRoutes = Router();

const controller = new RuleApiController();

ruleApiRoutes.get("/all", controller.searchAllRulesWithFilter);
