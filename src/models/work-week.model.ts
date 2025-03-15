import { model, Schema } from "mongoose";
import { IModel, modelConfig, modelKeysDefault } from "@src/models/utils/model.utils";

export interface IHourWorkDay {
	day: number;
	start: number;
	lunchStart: number;
	lunchEnd: number;
	end: number;
}

export interface IWorkWeek extends IModel {
	userId: Id;
	dayList: IHourWorkDay[];
	title: string;
}

const hourDaySchema = new Schema<IHourWorkDay>({
	day: {
		type: Number,
		required: true
	},
	start: {
		type: Number,
		required: true
	},
	lunchStart: {
		type: Number,
		required: true
	},
	lunchEnd: {
		type: Number,
		required: true
	},
	end: {
		type: Number,
		required: true
	}
}, { _id: false });

export const workWeekModel = model<IWorkWeek>("work_week", new Schema({
	...modelKeysDefault,
	userId: {
		type: Schema.Types.ObjectId,
		required: true
	},
	dayList: {
		type: [hourDaySchema],
		default: []
	},
	title: {
		type: String,
		required: true
	}
}, modelConfig), "work_weeks");