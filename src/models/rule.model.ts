import { model, Schema } from "mongoose";
import { IModel, modelConfig, modelKeysDefault } from "@src/models/utils/model.utils";

export interface IRule extends IModel {
  name: string;
  rules: string[];
  tag: string;
}

export const ruleModel = model<IRule>("rule", new Schema({
  ...modelKeysDefault,
  name: {
    type: String,
    required: true,
    unique: true
  },
  rules: {
    type: [String],
    required: true,
  },
  tag: {
    type: String,
    required: true,
    unique: true
  }
}, modelConfig), "rules");