import { NextFunction, Request, Response } from "express";
import { environment } from "@src/environment";
import * as jwt from "jsonwebtoken";
import { userModel } from "@src/models/user.model";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).send({ message: "Not Authenticated" });
    return
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, environment.tokenSecret) as any;

    res.locals["userData"] = await userModel.findOne({
      email: decoded.email
    }).exec();

    next();
  } catch (error) {
    res.status(401).send({ message: "Not Authenticated" });
    return
  }
};