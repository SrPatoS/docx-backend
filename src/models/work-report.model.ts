import { model, Schema } from "mongoose";
import { IModel, modelConfig, modelKeysDefault } from "@src/models/utils/model.utils";

export interface IReport {
  date: Date;
  observation: string;
}

export interface IWorkReport extends IModel {
  userId: Id;
  startWork: IReport;
  startLunch: IReport;
  endLunch: IReport;
  endWork: IReport;
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
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  startWork: reportSchema,
  endWork: reportSchema,
  startLunch: reportSchema,
  endLunch: reportSchema,
}, modelConfig), "work_report");