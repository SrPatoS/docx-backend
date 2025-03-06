import { QueueName, RabbitmqQueue } from "@src/provider/rabbitmq/rabbitmq.queue";

export class UserAvatarUploadQueue implements RabbitmqQueue {
	name: QueueName = "user-avatar";

	async handler(data: any) {
		console.log("awui", data);
	}
}