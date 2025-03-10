import { CrudController } from "@src/api/_core/crud/crud.controller";
import { userApiSchema } from "../user-api.schema";
import { userModel } from "@src/models/user.model";

export class UpdateUserApiController extends CrudController {
  constructor(){
    super("user", userModel, userApiSchema.partial());
  }
}