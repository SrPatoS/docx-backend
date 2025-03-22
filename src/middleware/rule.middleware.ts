import { Request, Response } from "express";
import { userModel } from "@src/models/user.model";
import { MongoUtils } from "@src/api/_utils/mongo.utils";
import { Rule } from "@src/rules/rules";

export const ruleMiddleware = (ruleTags: Rule[]) => {
	return async (req: Request, res: Response, next: Function) => {
		const user = await userModel.aggregate([
			{
				$match: {
					_id: MongoUtils.convertObjetId(res.locals["userData"]._id)
				}
			},
			{
				$lookup: {
					from: "rules",
					localField: "rule",
					foreignField: "_id",
					as: "rule",
					pipeline: [
						{
							$match: {
								$expr: { $in: ["$tag", ruleTags] }
							}
						}
					]
				}
			},
			{
				$addFields: {
					isOk: {
						$gte: [{ $size: "$rule" }, 1]
					}
				}
			},
			{
				$project: {
					isOk: true
				}
			}
		]).exec();

		if (user.length && user[0].isOk) {
			return next();
		}

		return res.status(403).send({ message: "Recurso não Habilitado para seu usuário!" });
	};
};