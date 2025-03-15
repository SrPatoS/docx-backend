import { model, Schema } from "mongoose";
import { IModel, modelConfig, modelKeysDefault } from "@src/models/utils/model.utils";

export enum WorkStatus {
	WaitingStart = "waitingStart",
	Started = "started",
	Finished = "finished",
	LunchStarted = "lunchStarted",
	LunchFinished = "lunchFinished",
	None = "none"
}

export interface IReport {
	date: Date;
	observation: string;
}

export interface IWorkReport extends IModel {
	userId: Id;
	date: Date;
	currentStatus: WorkStatus,
	dateString: string;
	hash: string;
	startWork: IReport;
	startLunch: IReport;
	endLunch: IReport;
	endWork: IReport;
}

const reportSchema = new Schema({
	date: {
		type: Date,
		required: true
	},
	observation: {
		type: String,
		required: false
	}
}, { _id: false });

export const workReportModel = model<IWorkReport>("workReportModel", new Schema({
	...modelKeysDefault,
	userId: {
		type: Schema.Types.ObjectId,
		ref: "user",
		required: true
	},
	date: { type: Date, required: true },
	dateString: { type: String, required: true },
	hash: { type: String, required: true, unique: true },
	currentStatus: { type: String, required: true },
	startWork: {
		type: reportSchema,
		default: null
	},
	endWork: {
		type: reportSchema,
		default: null
	},
	startLunch: {
		type: reportSchema,
		default: null
	},
	endLunch: {
		type: reportSchema,
		default: null
	}
}, modelConfig), "work_report");