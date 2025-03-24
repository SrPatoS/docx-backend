import { QueueName, RabbitmqQueue } from "@src/provider/rabbitmq/rabbitmq.queue";
import { companyModel } from "@src/models/company.model";
import { MongoUtils } from "@src/api/_utils/mongo.utils";

export class CompanyUpdateAvatarCallbackQueue implements RabbitmqQueue {
	name: QueueName = "company-avatar-callback";

	async handler(data: {
		url: string;
		other: string;
	}) {
		await companyModel.updateOne({
			_id: MongoUtils.convertObjetId(data.other)
		}, {
			$set: {
				avatar: data.url
			}
		});
	}
}