import { ApiResponse } from "@src/api/_types/api-response.type";
import { companyModel, ICompany } from "@src/models/company.model";

export class CompanyApiService {
    async handler(companyData: ICompany): Promise<ApiResponse> {
        
        return { message: "Company created successfully.", errors: [] };
    }
}