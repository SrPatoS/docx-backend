import { ApiResponse } from "@src/api/_types/api-response.type";
import { environment } from "@src/environment";
import { codeEmailModule } from "@src/models/code-email.model";
import { userModel } from "@src/models/user.model";
import bcrypt from "bcrypt";

interface IRecoveryCode {
    code: string;
    email: string;
    password: string;
}

export class UserRecoveryPasswordUseCase {
    async handler(dto: IRecoveryCode): Promise<ApiResponse> {
        const user = await userModel.findOne({ email: dto.email }).exec();

        if (!user) {
            return { message: "error", errors: ['user not found'] };
        }

        const checkCodeEmail = await codeEmailModule.aggregate([
            {
                $match: {
                    email: dto.email,
                    code: dto.code,
                    active: true,
                    expiration: { $gte: new Date() }
                }
            }
        ]);

        if (checkCodeEmail.length === 0) {
            return { message: "error", errors: ['code not found or expired'] };
        }

        const updateUser = await userModel.updateOne({ email: dto.email }, { password: await bcrypt.hash(dto.password, environment.bcryptSalt) }).exec();

        if (!updateUser) {
            return {
                message: "error", errors: ['error updating']
            }
        }

        await codeEmailModule.updateOne({ code: dto.code }, { active: false }).exec();

        return { message: "success", errors: [], data: '' };
    }
}