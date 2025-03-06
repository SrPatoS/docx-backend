import { RabbitmqService } from "@src/provider/rabbitmq/rabbitmq.service";
import { ApiResponse } from "@src/api/_types/api-response.type";

export class UserApiUploadAvatarUseCase {
	async handler(userId: Id, buffer: Buffer): Promise<ApiResponse> {
		const rabbitmqService = new RabbitmqService();
		await rabbitmqService.sendToQueue("user-avatar", {
			userId,
			buffer
		});

		return {
			data: {},
			message: "Avatar adicionado para upload!",
			errors: []
		};
	}
}