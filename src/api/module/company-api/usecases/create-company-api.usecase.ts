import { ApiResponse } from "@src/api/_types/api-response.type";
import { companyModel, ICompany } from "@src/models/company.model";

type ConpanyCreateData = ICompany;

export class CompanyApiCreateUseCase {
  async handler(data: ConpanyCreateData): Promise<ApiResponse> {
    const findCompany = await companyModel.findOne({
      cnpj: data.cnpj
    }).exec();

    if(findCompany) {
        return { message: "error", errors: ['Company already exists!'] };
    }

    await companyModel.create(data);

    return { message: "Company created successfully.", errors: [] };
  }
}