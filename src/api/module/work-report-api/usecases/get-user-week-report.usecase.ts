import { ApiResponse } from "@src/api/_types/api-response.type";
import { DateUtil } from "@src/api/_utils/date.util";
import { workReportModel } from "@src/models/work-report.model";

export class GetUserWeekReportUseCase {
	async handler(userId: Id): Promise<ApiResponse> {
		const response: ApiResponse = {
			errors: [],
			message: "",
			data: {}
		};

		const currentDate = DateUtil.formatToPtBrDate(new Date());
		const range = DateUtil.getWeekRange(currentDate);

		const result = await workReportModel.aggregate([
			{
				$match: {
					active: true,
					userId: userId,
					date: {
						$gte: range.startOfWeek,
						$lte: range.endOfWeek
					}
				}
			},
			{
				$group: {
					_id: "$userId",
					list: { $addToSet: "$$ROOT" }
				}
			},
			{
				$project: {
					_id: 0,
					list: {
						$map: {
							input: "$list",
							as: "item",
							in: {
								day: {
									$let: {
										vars: {
											dayOfWeek: {
												$dayOfWeek: "$$item.date"
											}
										},
										in: {
											$switch: {
												branches: [
													{
														case: {
															$eq: ["$$dayOfWeek", 1]
														},
														then: "Domingo"
													},
													{
														case: {
															$eq: ["$$dayOfWeek", 2]
														},
														then: "Segunda-feira"
													},
													{
														case: {
															$eq: ["$$dayOfWeek", 3]
														},
														then: "Terça-feira"
													},
													{
														case: {
															$eq: ["$$dayOfWeek", 4]
														},
														then: "Quarta-feira"
													},
													{
														case: {
															$eq: ["$$dayOfWeek", 5]
														},
														then: "Quinta-feira"
													},
													{
														case: {
															$eq: ["$$dayOfWeek", 6]
														},
														then: "Sexta-feira"
													},
													{
														case: {
															$eq: ["$$dayOfWeek", 7]
														},
														then: "Sábado"
													}
												],
												default: "Desconhecido"
											}
										}
									}
								},
								start: {
									$let: {
										vars: {
											date: "$$item.startWork.date"
										},
										in: {
											$ifNull: [
												{
													$dateToString: {
														format: "%H:%M",
														date: "$$date"
													}
												},
												"-"
											]
										}
									}
								},
								end: {
									$let: {
										vars: {
											date: "$$item.endWork.date"
										},
										in: {
											$ifNull: [
												{
													$dateToString: {
														format: "%H:%M",
														date: "$$date"
													}
												},
												"-"
											]
										}
									}
								},
								lunchStart: {
									$let: {
										vars: {
											date: "$$item.startLunch.date"
										},
										in: {
											$ifNull: [
												{
													$dateToString: {
														format: "%H:%M",
														date: "$$date"
													}
												},
												"-"
											]
										}
									}
								},
								lunchEnd: {
									$let: {
										vars: {
											date: "$$item.endLunch.date"
										},
										in: {
											$ifNull: [
												{
													$dateToString: {
														format: "%H:%M",
														date: "$$date"
													}
												},
												"-"
											]
										}
									}
								}
							}
						}
					}
				}
			},
			{
				$unwind: {
					path: "$list",
					preserveNullAndEmptyArrays: false
				}
			},
			{
				$replaceRoot: {
					newRoot: "$list"
				}
			}
		]).exec();

		response.data = result;

		return response;
	}
}