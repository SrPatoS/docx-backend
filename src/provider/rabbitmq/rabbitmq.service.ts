import { RabbitmqProvider } from "@src/provider/rabbitmq/rabbitmq.provider";
import { logger } from "io-logger";
import { QueueName } from "@src/provider/rabbitmq/rabbitmq.queue";

export class RabbitmqService {
	async sendToQueue(queue: QueueName, data: any) {
		const provider = RabbitmqProvider.Instance;
		if (!provider) {
			return;
		}

		const { channel } = provider.getConfig();
		channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)), { persistent: true });
		logger.info(`${queue} received new data`);
	}
}