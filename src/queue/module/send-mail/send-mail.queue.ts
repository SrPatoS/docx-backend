import { QueueName, RabbitmqQueue } from "@src/provider/rabbitmq/rabbitmq.queue";
import { NodemailerProvider } from "@src/provider/nodemailer/nodemailer";
import { userModel } from "@src/models/user.model";

interface IProps {
	email: string;
	html: string;
	subject: string;
	userId?: Id;
}

export class SendMailQueue implements RabbitmqQueue {
	name: QueueName = "send-email";

	async handler(data: IProps) {
		const nodemailerProvider = new NodemailerProvider();

		if (data.userId) {
			const user = await userModel.findOne({ _id: data.userId }).select({
				email: true
			}).exec();

			if (user) {
				data.email = user.email;
			}
		}

		await nodemailerProvider.sendEmail(data.email, data.subject, data.html);
	}
}