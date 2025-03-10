import { IModel, modelConfig, modelKeysDefault } from "@src/models/utils/model.utils";
import { model, Schema } from "mongoose";

export interface IMenu extends IModel {
	title: string;
	path: string;
	icon?: string;
	rules: Id[];
	order: number;
}

export const menuModel = model<IMenu>("menu", new Schema({
	...modelKeysDefault,
	title: {
		type: String,
		required: true
	},
	path: {
		type: String,
		required: true
	},
	icon: {
		type: String,
		required: false,
		default: null
	},
	rules: {
		type: [Schema.Types.ObjectId],
		required: true,
		default: []
	},
	order: {
		type: Number,
		required: true
	}
}, modelConfig), "menus");