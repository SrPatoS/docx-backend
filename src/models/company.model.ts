import { model, Schema } from "mongoose";
import { IModel, modelConfig, modelKeysDefault } from "./utils/model.utils";

export interface ICompany extends IModel {
    avatar?: string;
    name: string;
    cnpj: string;
    users?: string[];
}

export const companyModel = model<ICompany>("company", new Schema({
    ...modelKeysDefault,
    avatar: {
        type: String,
        required: false,
        default: null,
    },
    name: {
        type: String,
        required: true,
    },
    cnpj: {
        type: String,
        required: true,
    },
    users: {
        type: [String],
        required: false,
        default: [],
    }
}, modelConfig), "companies")