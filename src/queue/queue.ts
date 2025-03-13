
import { RabbitmqQueue } from "@src/provider/rabbitmq/rabbitmq.queue";
import { UserAvatarUploadQueue } from "@src/queue/module/user/user-avatar-upload.queue";
import { GenericAvatarUploadQueue } from "./module/generic/generic-avatar-upload.queue";

export const queueList: RabbitmqQueue[] = [
	new UserAvatarUploadQueue(),
	new GenericAvatarUploadQueue()
];