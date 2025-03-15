import { NextFunction, Request, Response } from "express";

export async function transformDataWorkWeekUtil(req: Request, res: Response, next: NextFunction) {
	if (req.body.userId) {
		req.body["uniqueCode"] = req.body.userId;
	}

	next();
}