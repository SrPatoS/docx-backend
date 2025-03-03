import { ApiResponse } from "@src/api/_types/api-response.type";
import { IUser, userModel } from "@src/models/user.model";

export class UserApiLastCloudDownloadedService {
  async handler(date: Date, userData: IUser): Promise<ApiResponse> {
    let download: boolean = true;

    if (userData.lastCloudDownloaded) {
      const lastDate = userData.lastCloudDownloaded.toLocaleDateString("pt-BR");
      const currentDate = date.toLocaleDateString("pt-BR");

      if (lastDate === currentDate) {
        download = false;
      }
    }

    await userModel.updateOne({ _id: userData._id }, {
      $set: {
        lastCloudDownloaded: date
      }
    }).exec();

    return {
      errors: [],
      message: "",
      data: {
        download: download
      }
    }
  }
}