import { codeEmailModule } from "@src/models/code-email.model";

interface IValidateRecoveryCode {
    code: string;
    email?: string;
}

export class ValidateRecoveryCodeUseCase {
    async handler(dto: IValidateRecoveryCode) {
        const checkCodeEmail = await codeEmailModule.aggregate([
            {
                $match: {
                    code: dto.code,
                    active: true,
                    expiration: { $gte: new Date() }
                }
            }
        ]);

        if (checkCodeEmail.length === 0) {
            return { message: "error", errors: ['code not found or expired'] };
        }

        return {
            message: "success",
            errors: [],
            data: {}
        }
    }
}