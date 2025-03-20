import { randomCode } from "@src/api/_utils/random-code.util";
import { codeEmailModule } from "@src/models/code-email.model";
import { NodemailerProvider } from "@src/provider/nodemailer/nodemailer";
import { QueueName, RabbitmqQueue } from "@src/provider/rabbitmq/rabbitmq.queue";

interface IRecoveryPasswordSendCodeEmail {
    email: string;
    code: string;
    html: string;
}

export class SendRecoveryCodeToEmailQueue implements RabbitmqQueue {
    name: QueueName = "send-code-email";

    async handler(data: IRecoveryPasswordSendCodeEmail) {
        const { email, code, html } = data;

        await codeEmailModule.create({
            email,
            uniqueCode: code,
            code,
        });

        const nodemailerProvider = new NodemailerProvider();
        const subject = "Código de Validação";
        await nodemailerProvider.sendEmail(email, subject, html)
    }
}