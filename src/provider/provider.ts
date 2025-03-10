import { IProvider } from "@src/provider/provider.interface";
import { RabbitmqProvider } from "@src/provider/rabbitmq/rabbitmq.provider";

const providerList: IProvider[] = [
	new RabbitmqProvider()
];

export async function provider() {
	for (const provider of providerList) {
		await provider.awake();
	}
}