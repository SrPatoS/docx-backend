import { userModel } from "@src/models/user.model";
import { ApiResponse } from "@src/api/_types/api-response.type";
import * as bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken";
import { environment } from "@src/environment";

type AuthData = {
  email: string;
  password: string;
}

export class AuthUseCase {
  async handler(data: AuthData): Promise<ApiResponse> {
    const findUser = await userModel.findOne({
      email: data.email,
      active: true
    }).exec();

    if (!findUser) {
      return { message: "Password or email wrong", errors: [data.email] };
    }

    const compareToken = await bcrypt.compare(data.password, findUser.password);

    if (!compareToken) {
      return { message: "Password or email wrong", errors: [data.email] };
    }

    const token = jwt.sign({ email: findUser.email }, environment.tokenSecret, {
      expiresIn: "18h"
    });

    return { message: "Login success", errors: [], data: { token: token } }
  }
}