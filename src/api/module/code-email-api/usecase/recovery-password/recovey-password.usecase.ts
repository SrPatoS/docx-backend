import { ICodeEmail } from "@src/models/code-email.model";
import { htmlRecoveryPassword } from "./recovery-password-html";
import { randomCode } from "@src/api/_utils/random-code.util";
import { RabbitmqService } from "@src/provider/rabbitmq/rabbitmq.service";
import { ApiResponse } from "@src/api/_types/api-response.type";

type RecoveryPasswordData = Partial<ICodeEmail>;

export class RecoveryPasswordUseCase {

    async handler(data: RecoveryPasswordData): Promise<ApiResponse> {
        const rabbitmqService = new RabbitmqService();
        const code = randomCode();
        const html = htmlRecoveryPassword(code);
        await rabbitmqService.sendToQueue("send-code-email", {
            email: data.email,
            code,
            html
        });

        return {
            data: {},
            message: "Mensagem adicionada a fila para envio!",
            errors: []
        }
    }
}