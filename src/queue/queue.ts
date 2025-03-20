import { RabbitmqQueue } from "@src/provider/rabbitmq/rabbitmq.queue";
import { UserAvatarUploadQueue } from "@src/queue/module/user/user-avatar-upload.queue";
import { GenericAvatarUploadQueue } from "./module/generic/generic-avatar-upload.queue";
import { SendCodeToEmailQueue } from "./module/code-email/send-code-email.queue";
import { SendMailQueue } from "@src/queue/module/send-mail/send-mail.queue";

export const queueList: RabbitmqQueue[] = [
	new UserAvatarUploadQueue(),
	new GenericAvatarUploadQueue(),
	new SendCodeToEmailQueue(),
	new SendMailQueue()
];