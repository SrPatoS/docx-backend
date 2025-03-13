import { model, Schema, Types } from "mongoose";
import { IModel, modelConfig, modelKeysDefault } from "@src/models/utils/model.utils";

export interface IUser extends IModel {
  name: string;
  email: string;
  password: string;
  companyId: Schema.Types.ObjectId | string;
  avatar?: string;
  rule: Schema.Types.ObjectId | string;
  lastCloudDownloaded: Date;
}

export const userModel = model<IUser>("user", new Schema({
  ...modelKeysDefault,
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: false,
    default: 'https://i.imgur.com/zh99mGz.png',
  },
  rule: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "rule"
  },
  companyId:{
    type: Schema.Types.ObjectId,
    required: false,
    ref: "company"
  },
  lastCloudDownloaded: {
    type: Date,
    required: false,
    default: null,
  }
}, modelConfig), "users")