import { EndUserWorkEmailValue } from "@src/api/module/work-report-api/email/end-user-work.email";
import { RabbitmqService } from "@src/provider/rabbitmq/rabbitmq.service";

export class SendEndUserWorkEmailUseCase {
	async handler(userId: Id) {
		const rabbitmqService = new RabbitmqService();
		const emailHtml = EndUserWorkEmailValue;

		await rabbitmqService.sendToQueue("send-email", {
			userId: userId,
			subject: "Fim de trabalho",
			html: emailHtml
		});
	}
}