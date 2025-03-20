import { apiCreateResponseUtil } from '@src/api/_utils/api-create-response.util';
import { Request, Response } from 'express';
import { RecoveryPasswordUseCase } from './usecase/recovery-password/recovey-password.usecase';
import { ValidateRecoveryCodeUseCase } from './usecase/recovery-password/validate-recovery-code.usecase';

export class SendCodeEmailController {
    async recoveryPassword(req: Request, res: Response) {
        const useCase = new RecoveryPasswordUseCase();
        const data = await useCase.handler(req.body);
        apiCreateResponseUtil(data, res);
    }

    async validateCode(req: Request, res: Response) {
        const useCase = new ValidateRecoveryCodeUseCase();
        const data = await useCase.handler(req.body);
        apiCreateResponseUtil(data, res);
    }
}