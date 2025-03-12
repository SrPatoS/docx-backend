import { ApiResponse } from "@src/api/_types/api-response.type";
import { workWeekModel } from "@src/models/work-week.model";

export class GetWeekWorkByUserUseCase {
    async handle(userId: string): Promise<ApiResponse> {

        const days = ["segunda", "terca", "quarta", "quinta", "sexta", "sabado", "domingo"];

        const dataProject: Record<string, any> = { _id: 0 };

        days.forEach((day) => {
            dataProject[day] = {
                start: {
                    $dateToString: {
                        format: "%H:%M",
                        date: `$${day}.start`,
                        timezone: "America/Sao_Paulo",
                    },
                },
                lunchStart: {
                    $dateToString: {
                        format: "%H:%M",
                        date: `$${day}.lunchStart`,
                        timezone: "America/Sao_Paulo",
                    },
                },
                lunchEnd: {
                    $dateToString: {
                        format: "%H:%M",
                        date: `$${day}.lunchEnd`,
                        timezone: "America/Sao_Paulo",
                    },
                },
                end: {
                    $dateToString: {
                        format: "%H:%M",
                        date: `$${day}.end`,
                        timezone: "America/Sao_Paulo",
                    },
                },
            };
        });

        const workWeek = await workWeekModel.aggregate([
            { $match: { userId: userId } },
            { $project: dataProject },
        ]);

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
