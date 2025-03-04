import { ApiResponse } from "@src/api/_types/api-response.type";
import { companyModel } from "@src/models/company.model";
import { userModel } from "@src/models/user.model";
import { IWorkReport, workReportModel } from "@src/models/work-report.model";

type WorkReportCreateData = IWorkReport;

export class WorkReportCreate {
    async handle(data: WorkReportCreateData): Promise<ApiResponse> {
        const [user, company] = await Promise.all([
            userModel.findById(data.userId), 
            companyModel.findById(data.companyId)      
        ])

        if (!user) {
            return { message: "User not found.", errors: ["User not found."] };
        }

        if (!company) {
            return { message: "Company not found.", errors: ["Company not found."] };
        }

        await workReportModel.create({
            ...data,
            userName: user.name,
            companyName: company.name
        })

        return { message: "Work report created successfully.", errors: [] };
    }
}