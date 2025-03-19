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

    const findUser = await userModel.findOne({
      email: data.email
    }).exec();

    if (findUser) {
      return { message: "error", errors: ['user already exists'] };
    }

    if (!findRule) {
      return { message: "error", errors: ['rule not found'] };
    }

    const user = await userModel.create({
      ...data,
      password: await bcrypt.hash(data.password, environment.bcryptSalt),
      rule: findRule._id
    });

    if (!user) {
      return { message: "error", errors: ['error creating user'] };
    }

    await userModel.updateOne({
      _id: user._id,
    }, {
      $set: {
        uniqueCode: user._id
      }
    });

    return { message: "User created successfully.", errors: [], data: user._id };
  }
}