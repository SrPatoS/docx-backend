export interface RabbitmqQueue {
	name: QueueName;
	handler: (data: any) => void | Promise<void>;
}

export type QueueName = "user-avatar" | "user-create-avatar" | "generic-avatar-upload-queue";