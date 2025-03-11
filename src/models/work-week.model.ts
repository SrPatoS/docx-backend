import { Model, model, Schema } from "mongoose";
import { IModel, modelConfig, modelKeysDefault } from "@src/models/utils/model.utils";

interface IHourDay {
    start: Date;
    lunchStart: Date;
    lunchEnd: Date;
    end: Date;
}

export interface IWorkWeek extends IModel {
    userId: Id
    segunda: IHourDay
    terca: IHourDay
    quarta: IHourDay
    quinta: IHourDay
    sexta: IHourDay
    sabado: IHourDay
    domingo?: IHourDay
}

const hourDaySchema = new Schema<IHourDay>({
    start: {
        type: Date,
        required: true
    },
    lunchStart: {
        type: Date,
        required: true
    },
    lunchEnd: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
})

export const workWeekModel = model<IWorkWeek>("work-week", new Schema({
    ...modelKeysDefault,
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    segunda: { type: hourDaySchema, required: true, _id: false },
    terca: { type: hourDaySchema, required: true, _id: false },
    quarta: { type: hourDaySchema, required: true, _id: false },
    quinta: { type: hourDaySchema, required: true, _id: false },
    sexta: { type: hourDaySchema, required: true, _id: false },
    sabado: { type: hourDaySchema, required: true, _id: false },
    domingo: { type: hourDaySchema, required: false, _id: false },

}, modelConfig), "work-weeks")