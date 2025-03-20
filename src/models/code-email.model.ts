import { model, Schema } from "mongoose";
import { IModel, modelConfig, modelKeysDefault } from "./utils/model.utils";

export interface ICodeEmail extends IModel {
    userId: Id;
    email: string;
    code: string;
    expiration: Date;
}

export const codeEmailModule = model<ICodeEmail>("code", new Schema({
    ...modelKeysDefault,
    email: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    expiration: {
        type: Date,
        required: false,
        default: new Date(new Date().getTime() + 1000 * 60 * 10)
    }

}, modelConfig), "codes-email");