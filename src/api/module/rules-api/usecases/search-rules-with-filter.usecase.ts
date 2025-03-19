import { ApiResponse } from "@src/api/_types/api-response.type";
import { ruleModel } from "@src/models/rule.model";
import { response } from "express";

export class SearchRulesWithFilterUsecase {
    async handler():Promise<ApiResponse> {

        const search = await ruleModel.find().select("name rules tag");

        if(!search) {
            const response: ApiResponse = {
                message: "Oops!",
                errors: ["Rules not found"],
                data: []
            };
            return response;
        }

        const response: ApiResponse = {
            errors: [],
            message: "",
            data: search
        };
        return response;
    }
}