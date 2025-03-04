import { model, Schema } from "mongoose";
import { IModel, modelConfig, modelKeysDefault } from "./utils/model.utils";

export interface ICompany extends IModel {
    avatar?: string;
    name: string;
}

export const companyModel = model<ICompany>("company", new Schema({
    ...modelKeysDefault,
    name: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: false,
        default: null,
    },
}, modelConfig), "companies")