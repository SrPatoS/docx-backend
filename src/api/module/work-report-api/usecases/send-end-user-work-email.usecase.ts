import { RabbitmqService } from "@src/provider/rabbitmq/rabbitmq.service";
import { GetUserWeekReportUseCase } from "@src/api/module/work-report-api/usecases/get-user-week-report.usecase";
import { EndUserWorkEmail } from "@src/api/module/work-report-api/email/end-user-work.email";

export class SendEndUserWorkEmailUseCase {
	async handler(userId: Id) {
		const getUserWeekReportUseCase = new GetUserWeekReportUseCase();
		const weekReport = await getUserWeekReportUseCase.handler(userId);
		const rabbitmqService = new RabbitmqService();
		const endUserWorkEmail = new EndUserWorkEmail();

		await rabbitmqService.sendToQueue("send-email", {
			userId: userId,
			subject: "Fim de trabalho",
			html: endUserWorkEmail.getHtmlString(weekReport.data)
		});
	}
}