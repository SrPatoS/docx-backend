import { UserAvatarCreateUseCase } from "@src/api/module/user-api/usecases/user-api-upload-create-avar.usecase";
import { RabbitmqQueue } from "@src/provider/rabbitmq/rabbitmq.queue";
import { UserAvatarUploadQueue } from "@src/queue/module/user/user-avatar-upload.queue";
import { UserCreateAvatarUploadQueue } from "./module/user/user-create-avatar-upload.queue";
import { GenericAvatarUploadQueue } from "./module/generic/generic-avatar-upload.queue";

export const queueList: RabbitmqQueue[] = [
	new UserAvatarUploadQueue(),
	new UserCreateAvatarUploadQueue(),
	new GenericAvatarUploadQueue()
];