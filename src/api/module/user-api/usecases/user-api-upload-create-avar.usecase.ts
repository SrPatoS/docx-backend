import { ApiResponse } from "@src/api/_types/api-response.type";
import { QueueName, RabbitmqQueue } from "@src/provider/rabbitmq/rabbitmq.queue";
import { RabbitmqService } from "@src/provider/rabbitmq/rabbitmq.service";

export class UserAvatarCreateUseCase {
    async handler(userId: Id, buffer: Buffer): Promise<ApiResponse> {
        const rabbitmqService = new RabbitmqService();
        await rabbitmqService.sendToQueue("user-create-avatar", {
            userId,
            buffer
        });

        return {
            data: {},
            message: "Avatar de criação de usuário adicionado a fila de upload!",
            errors: []
        };
    }

}