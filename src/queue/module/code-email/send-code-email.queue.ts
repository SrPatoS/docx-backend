import { randomCode } from "@src/api/_utils/random-code.util";
import { codeEmailModule } from "@src/models/code-email.model";
import { NodemailerProvider } from "@src/provider/nodemailer/nodemailer";
import { QueueName, RabbitmqQueue } from "@src/provider/rabbitmq/rabbitmq.queue";

export class SendCodeToEmailQueue implements RabbitmqQueue {
    name: QueueName = "send-code-email";

    async handler(data: any) {
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