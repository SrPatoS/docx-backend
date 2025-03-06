import { IProvider } from "@src/provider/provider.interface";
import amqp, { Channel, ChannelModel } from "amqplib";
import { environment } from "@src/environment";
import { logger } from "io-logger";

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
		try {
			this.connection = await amqp.connect({
				vhost: environment.rabbitmqHost,
				port: environment.rabbitmqPort,
				username: environment.rabbitmqUser,
				password: environment.rabbitmqPassword,
				hostname: environment.rabbitmqHost
			});
			this.channel = await this.connection.createChannel();
			logger.info(`RabbitMQ connected in: ${environment.rabbitmqHost}:${environment.rabbitmqPort}`);
			logger.info(`RabbitMQ management: http://${environment.rabbitmqHost}:${environment.rabbitmqManagementPort}`);
		} catch (error: any) {
			console.log(error);
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