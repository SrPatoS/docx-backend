import { RabbitmqQueue } from "@src/provider/rabbitmq/rabbitmq.queue";
import { UserAvatarUploadQueue } from "@src/queue/module/user/user-avatar-upload.queue";

export const queueList: RabbitmqQueue[] = [
	new UserAvatarUploadQueue()
];