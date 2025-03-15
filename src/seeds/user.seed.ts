import { UserApiCreateUseCase } from "@src/api/module/user-api/usecases/user-api-create.usecase";

export async function userSeed() {
	await new UserApiCreateUseCase().handler({
		name: "Admin",
		password: "123456789",
		email: "admin@email.com",
		rule: "admin",
		lastCloudDownloaded: new Date(),
		companyId: ""
	});
}