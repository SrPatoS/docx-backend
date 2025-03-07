import { userModel } from "@src/models/user.model";
import { companyModel } from "@src/models/company.model";
import { Model } from "mongoose";

interface IModelsMap {
    [key: string]: Model<any>;
}

const modelsMap: IModelsMap = {
    user: userModel,
    company: companyModel,
};

export class ModelFactory {
    getModel(model: string): Model<any> {

        if (!modelsMap[model]) {
            throw new Error(`Model ${model} not found.`);
        }
        
        return modelsMap[model];
    }
}