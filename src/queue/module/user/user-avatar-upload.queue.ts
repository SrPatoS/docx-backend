import { userModel } from "@src/models/user.model";
import { QueueName, RabbitmqQueue } from "@src/provider/rabbitmq/rabbitmq.queue";
import { ImgurUploadService } from "@src/uploads/imgur-upload.service";
import UploadFileFactoryService from "@src/uploads/upload-file.service";
import { logger } from "io-logger";

interface IUserApiUploadAvatarUseCaseResponse {
	userId: string;
	buffer: {
		type: Buffer;
		data: number[];
	}
}
export class UserAvatarUploadQueue implements RabbitmqQueue {
	name: QueueName = "user-avatar";

	async handler(data: IUserApiUploadAvatarUseCaseResponse): Promise<void> {

		const { userId, buffer } = data;

		if (!buffer || !buffer.data) {
			logger.error("No buffer provided for upload.");
			return;
		}

		const imageBuffer = Buffer.from(buffer.data);
		const fileName = `${userId}.png`;

		const serviceUpload = new UploadFileFactoryService()
		const url = await serviceUpload.upload(imageBuffer, fileName);

		await userModel.updateOne({ _id: userId }, { $set: { avatar: url } });
	}
}