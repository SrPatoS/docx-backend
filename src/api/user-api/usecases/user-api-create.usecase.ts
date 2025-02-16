import { IUser, userModel } from "@src/models/user.model";
import { ApiResponse } from "@src/api/_types/api-response.type";
import { ruleModel } from "@src/models/rule.model";
import * as bcrypt from "bcrypt"
import { environment } from "@src/environment";

export type UserCreateData = IUser;

export class UserApiCreateUseCase {
  async handler(data: UserCreateData): Promise<ApiResponse> {
    const findRule = await ruleModel.findOne({
      tag: data.rule
    }).exec();

    if (!findRule) {
      return { message: "error", errors: ['rule not found'] };
    }

    await userModel.create({
      ...data,
      password: await bcrypt.hash(data.password, environment.bcryptSalt),
      rule: findRule._id
    });

    return { message: "User created successfully.", errors: [] };
  }
}