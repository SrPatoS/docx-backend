import { ApiResponse } from "@src/api/_types/api-response.type";
import { workWeekModel } from "@src/models/work-week.model";

export class GetWeekWorkByUserUseCase {
    async handle(userId: string): Promise<ApiResponse> {
        const workWeek = await workWeekModel.findOne({ userId: userId })
        .select("-__v -createdAt -updatedAt")

        if (!workWeek) {
            return {
                message: "Oops!",
                errors: ["Carga horária semanal do usuário não encontrada!"],
            }
        }
        return {
            data: workWeek,
            message: "Carga horária semanal do usuário encontrada!",
            errors: []
        }
    }
}