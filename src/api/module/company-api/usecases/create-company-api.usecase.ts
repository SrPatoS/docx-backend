import { CrudUseCase } from "@src/api/_core/crud/crud.usecase";
import { ApiResponse } from "@src/api/_types/api-response.type";
import { companyModel, ICompany } from "@src/models/company.model";
import { companyApiSchema } from "../company-api.schema";

type ConpanyCreateData = ICompany;

const crudApiCase = new CrudUseCase<ICompany>(companyModel, companyApiSchema);
export class CompanyApiCreateUseCase {

  async handler(data: ConpanyCreateData): Promise<ApiResponse> {
    const findCompany = await companyModel.findOne({
      cnpj: data.cnpj
    }).exec();

    if(findCompany) {
        return { message: "error", errors: ['Company already exists!'] };
    }

    return await crudApiCase.create(data);
  }
}