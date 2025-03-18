import { CrudController } from "@src/api/_core/crud/crud.controller";
import { ruleModel } from "@src/models/rule.model";
import { ruleSchema } from "./rule.schema";
import { Request, Response } from "express";
import { apiCreateResponseUtil } from "@src/api/_utils/api-create-response.util";
import { SearchRulesWithFilterUsecase } from "./usecases/search-rules-with-filter.usecase";

export class RuleApiController {
    async searchAllRulesWithFilter(req: Request, res: Response) {
        const useCase = new SearchRulesWithFilterUsecase();
        const data = await useCase.handler();
        apiCreateResponseUtil(data, res);
    }
}