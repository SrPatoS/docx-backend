import { menuModel } from "@src/models/menu.model";
import { IUser } from "@src/models/user.model";
import { ApiResponse } from "@src/api/_types/api-response.type";

export class MenuApiGetDashboardMenusUseCase {
	async handler(user: IUser): Promise<ApiResponse> {
		const result = await menuModel.aggregate([
			{
				$match: {
					active: true
				}
			},
			{
				$match: {
					$expr: {
						$in: [user.rule, "$rules"]
					}
				}
			},
			{
				$group: {
					_id: "$tool",
					tool: { $first: "$tool" },
					routes: {
						$addToSet: {
							label: "$title",
							route: "$path",
							icon: { $ifNull: ["$icon", "home"] }
						}
					}
				}
			}
		]).exec();

		return {
			errors: [],
			message: "",
			data: result
		};
	}
}