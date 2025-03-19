import { codeEmailModule } from "@src/models/code-email.model";
import { htmlRecoveryPassword } from "./recovery-password-html";
import { NodemailerProvider } from "@src/provider/nodemailer/nodemailer";
import { randomCode } from "@src/api/_utils/random-code.util";

export class RecoveryPassordUseCase extends NodemailerProvider {

    async handle(email: string) {

        const code = randomCode();

        await codeEmailModule.create({ email, code });

        await this.sendEmail(email, "Redefinição de Senha", htmlRecoveryPassword(code));
    }
}