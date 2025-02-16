import { UserApiCreateUseCase } from "@src/api/user-api/usecases/user-api-create.usecase";

export async function userSeed() {
  await new UserApiCreateUseCase().handler({
    name: "Admin",
    password: "123456789",
    email: "admin@email.com",
    rule: "admin"
  });
}