import { CrudController } from "@src/api/_core/crud/crud.controller";
import { workWeekModel } from "@src/models/work-week.model";
import { workWeekSchema } from "./work-week.schema";

export class WorkWeekController extends CrudController {
  constructor() {
    super("work-week", workWeekModel, workWeekSchema);
  }
} 