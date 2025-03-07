import { userModel } from "@src/models/user.model";
import { QueueName, RabbitmqQueue } from "@src/provider/rabbitmq/rabbitmq.queue";
import UploadFileFactoryService from "@src/uploads/upload-file.service";
import { logger } from "io-logger";

export class UserCreateAvatarUploadQueue implements RabbitmqQueue {
    name: QueueName = "user-create-avatar";

    async handler(data: any): Promise<void> {
        
        console.log("UserCreateAvatarUploadQueue", data);

        const { userId, buffer } = data;

        const userID = userId.userId; 

        if (!buffer || !buffer.data) {
            logger.error("No buffer provided for upload.");
            return;
        }

        const imageBuffer = Buffer.from(buffer.data);
        const fileName = `${userID}.png`;

        const serviceUpload = new UploadFileFactoryService()
        const url = await serviceUpload.upload(imageBuffer, fileName);

        await userModel.updateOne({ _id: userID }, { $set: { avatar: url } });
    }
}