import { ApiResponse } from "@src/api/_types/api-response.type";
import { workWeekModel } from "@src/models/work-week.model";

export class GetWeekWorkByUserUseCase {
	async handle(userId: Id): Promise<ApiResponse> {
		const workWeek = await workWeekModel.aggregate([
			{
				$match: {
					active: true,
					userId: userId
				}
			},
			{
				$project: {
					dayList: {
						$map: {
							input: "$dayList",
							as: "day",
							in: {
								day: {
									$arrayElemAt: [
										[
											"Domingo",
											"Segunda-feira",
											"Terça-feira",
											"Quarta-feira",
											"Quinta-feira",
											"Sexta-feira",
											"Sábado"
										],
										{ $subtract: ["$$day.day", 1] }
									]
								},
								start: {
									$concat: [
										{ $toString: "$$day.start" },
										":00"
									]
								},
								lunchStart: {
									$concat: [
										{ $toString: "$$day.lunchStart" },
										":00"
									]
								},
								lunchEnd: {
									$concat: [
										{ $toString: "$$day.lunchEnd" },
										":00"
									]
								},
								end: {
									$concat: [
										{ $toString: "$$day.end" },
										":00"
									]
								}
							}
						}
					}
				}
			},
			{
				$unwind: {
					path: "$dayList"
				}
			},
			{
				$replaceRoot: {
					newRoot: "$dayList"
				}
			}
		]).exec();

		return {
			data: workWeek,
			message: "Carga horária semanal do usuário encontrada!",
			errors: []
		};
	}
}
