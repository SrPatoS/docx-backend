import { IProvider } from "@src/provider/provider.interface";
import amqp, { Channel, ChannelModel } from "amqplib";
import { environment } from "@src/environment";
import { logger } from "io-logger";
import { queueList } from "@src/queue/queue";

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
			logger.info(`RabbitMQ connected in @${environment.rabbitmqHost}:${environment.rabbitmqPort}`);
			logger.info(`RabbitMQ management: http://${environment.rabbitmqHost}:${environment.rabbitmqManagementPort}`);
			await this.upQueues();
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

	private async upQueues() {
		await Promise.all(queueList.map(async queue => {
			await this.channel.assertQueue(queue.name, { durable: true });
			logger.info(`RabbitMQ queue: ${queue.name} created`);
			if (environment.enabledRabbitQueueConsume) {
				await this.channel.consume(queue.name, (msg) => {
					try {
						const messageContent = msg!.content.toString();
						const data = JSON.parse(messageContent);
						queue.handler(data);
						this.channel.ack(msg!);
					} catch (error) {
						this.channel.nack(msg!, false, true);
					}
				});
			}
		}));
	}
}