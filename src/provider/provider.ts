import { IProvider } from "@src/provider/provider.interface";
import { RabbitmqProvider } from "@src/provider/rabbitmq/rabbitmq.provider";
import { GcloudStoreProvider } from "@src/provider/gcloud/gcloud-store.provider";
import { logger } from "io-logger";

const providerList: IProvider[] = [
	new RabbitmqProvider(),
	new GcloudStoreProvider()
];

export async function provider() {
	for (const provider of providerList) {
		if (!provider.enabled) {
			continue;
		}
		await provider.awake();
		logger.job(`provider loaded: ${provider.name}`);
	}
}