import { ApiResponse } from "@src/api/_types/api-response.type";
import { userModel } from "@src/models/user.model";
import { IWorkReport, workReportModel } from "@src/models/work-report.model";
import crypto from "crypto";

type WorkReportCreateData = Partial<IWorkReport>;

export class WorkReportCreate {
    async handle(id: string, data: WorkReportCreateData): Promise<ApiResponse> {
        const user = await userModel.findById(id);
        if (!user) {
            return {
                data: [],
                message: "Oops!",
                errors: ["User not found"],
            };
        }

        const date = new Date().toLocaleDateString("pt-BR");

        const hashKey = crypto.createHash("sha256").update(`${id}-${date}`).digest("hex");

        let workReport = await workReportModel.findOne({ userId: id, hash: hashKey });

        if (workReport) {

            workReport.set(data);

            const updateDocument = await workReport.save();

            if (!updateDocument) {
                return {
                    data: [],
                    message: "Oops!",
                    errors: ["Falha ao atualizar documento de ponto diário!"],
                };
            }

            return {
                data: [workReport],
                message: "Documento de ponto diário atualizado!",
                errors: [],
            };
        }

        workReport = await workReportModel.create({
            ...data,
            date,
            userId: id,
            hash: hashKey,
        });

        return {
            data: [workReport],
            message: "Documento de ponto diário criado!",
            errors: [],
        };
    }
}
