import { ApiResponse } from "@src/api/_types/api-response.type";
import { QueueName, RabbitmqQueue } from "@src/provider/rabbitmq/rabbitmq.queue";
import { RabbitmqService } from "@src/provider/rabbitmq/rabbitmq.service";

interface IBody{
    _id: string;
    model: string;
    buffer: Buffer;
}

export class GenericUploadUseCase {
    async handler(body: IBody): Promise<ApiResponse> {
        const rabbitmqService = new RabbitmqService();
        await rabbitmqService.sendToQueue("generic-avatar-upload-queue", {
            _id: body._id,
            model: body.model,
            buffer: body.buffer
        });

        return {
            data: {},
            message: "_id, model e buffer adicionado a fila de upload!",
            errors: []
        };
    }

}