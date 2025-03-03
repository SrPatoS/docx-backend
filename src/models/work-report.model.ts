import { model, Schema } from "mongoose";
import { IModel, modelConfig, modelKeysDefault } from "@src/models/utils/model.utils";

export interface IReport {
  date: Date;
  observation: string;
}

export interface IWorkReport extends IModel {
  userName: string;
  userId: Id;
  companyId: Id;
  companyName: string;
  startWork: IReport;
  endWork: IReport;
  startLunch: IReport;
  endLunch: IReport;
}

const reportSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  observation: {
    type: String,
    required: false,
  }
});

export const workReportModel = model<IWorkReport>("workReportModel", new Schema({
  ...modelKeysDefault,
  userName: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  companyId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: false,
  },
  companyName: {
    type: String,
    required: false,
  },
  startWork: reportSchema,
  endWork: reportSchema,
  startLunch: reportSchema,
  endLunch: reportSchema,
}, modelConfig), "work_report");