import { QueueName, RabbitmqQueue } from "@src/provider/rabbitmq/rabbitmq.queue";
import { GcloudStoreProvider } from "@src/provider/gcloud/gcloud-store.provider";
import { extname } from "path";
import { RabbitmqService } from "@src/provider/rabbitmq/rabbitmq.service";

export class FileUploadQueue implements RabbitmqQueue {
	name: QueueName = "file-upload";

	async handler(data: { buffer: Buffer, fileName: string, companyId: string, callBackQueue: QueueName }) {
		const fileExtension = extname(data.fileName);
		const result = await GcloudStoreProvider.Instance.uploadFile(data.buffer, fileExtension, true);

		if (data.callBackQueue) {
			const rabbitmqService = new RabbitmqService();
			await rabbitmqService.sendToQueue(data.callBackQueue, {
				url: result,
				other: data.companyId
			});
		}
	}
}