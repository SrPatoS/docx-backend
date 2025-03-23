export interface RabbitmqQueue {
	name: QueueName;
	handler: (data: any) => void | Promise<void>;
}

export type QueueName =
	"user-avatar"
	| "generic-avatar-upload-queue"
	| "send-code-email"
	| "send-email"
	| "file-upload"
	| "company-avatar-callback"