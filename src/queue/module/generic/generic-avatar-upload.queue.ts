import { ModelFactory } from "@src/models/factoryModels/factory.model";
import { QueueName, RabbitmqQueue } from "@src/provider/rabbitmq/rabbitmq.queue";
import UploadFileFactoryService from "@src/uploads/upload-file.service";
import { logger } from "io-logger";

interface IData {
    _id: string;
    model: string;
    buffer: Buffer;
}

export class GenericAvatarUploadQueue implements RabbitmqQueue {
    name: QueueName = "generic-avatar-upload-queue";

    async handler(data: IData): Promise<void> {

        const modelFactory = new ModelFactory();

        const modelInstanceFactory = modelFactory.getModel(data.model);

        if (!data.buffer) {
            logger.error("No buffer provided for upload.");
            return;
        }

        const imageBuffer = Buffer.from(data.buffer);
        const fileName = `${data._id}.png`;

        const serviceUpload = new UploadFileFactoryService()
        const url = await serviceUpload.upload(imageBuffer, fileName);

        await modelInstanceFactory.updateOne({ _id: data._id }, { $set: { avatar: url } });
    }
}