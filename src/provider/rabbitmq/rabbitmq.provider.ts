import { IProvider } from "@src/provider/provider.interface";
import amqp, { Channel, ChannelModel } from "amqplib";
import { environment } from "@src/environment";
import { logger } from "io-logger";

type RabbitmqConfigResponse = {
	connection: ChannelModel;
	channel: Channel;
}

export class RabbitmqProvider implements IProvider {
	public static Instance: RabbitmqProvider;

	name = "rabbitmq";
	private connection!: ChannelModel;
	private channel!: Channel;

	constructor() {
		if (!RabbitmqProvider.Instance) {
			RabbitmqProvider.Instance = this;
		}
	}

	async awake(): Promise<void> {
		if (!environment.enabledRabbitmq) {
			return;
		}

		const RABBITMQ_URL = `amqp://${environment.rabbitmqUser}:${environment.rabbitmqPassword}@${environment.rabbitmqHost}:${environment.rabbitmqPort}`;
		try {
			this.connection = await amqp.connect(RABBITMQ_URL);
			this.channel = await this.connection.createChannel();
			logger.info(`RabbitMQ connected in: ${environment.rabbitmqHost}:${environment.rabbitmqPort}`);
		} catch (error: any) {
			logger.error(`RabbitMQ connection: ${JSON.stringify(error)}`);
		}
	}

	getConfig() {
		return {
			connection: this.connection,
			channel: this.channel
		};
	}
}