import { RabbitmqQueue } from "@src/provider/rabbitmq/rabbitmq.queue";
import { UserAvatarUploadQueue } from "@src/queue/module/user/user-avatar-upload.queue";
import { GenericAvatarUploadQueue } from "./module/generic/generic-avatar-upload.queue";
import { SendRecoveryCodeToEmailQueue } from "./module/code-email/recovery-password/send-recovery-code";
import { SendMailQueue } from "@src/queue/module/send-mail/send-mail.queue";

export const queueList: RabbitmqQueue[] = [
	new UserAvatarUploadQueue(),
	new GenericAvatarUploadQueue(),
	new SendRecoveryCodeToEmailQueue(),
	new SendMailQueue()
];