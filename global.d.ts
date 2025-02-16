import { Schema, Types } from "mongoose"

declare global {
  type Id = Schema.Types.ObjectId;
}

export {};