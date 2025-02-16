import { ApiResponse } from "@src/api/_types/api-response.type";
import { Response } from "express";

export function apiCreateResponseUtil(data: ApiResponse, res: Response) {
  if (!data.data) {
    data.data = {};
  }

  return res.status(data.errors.length ? 400 : 200).send(data);
}