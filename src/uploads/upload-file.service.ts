import { environment } from '@src/environment';
import { ImgurUploadService } from './imgur-upload.service';

type UPLOAD_SERVICE_TYPE = 'IMGUR' | 'GCLOUD';

export default class UploadFileFactoryService {
  private readonly UPLOAD_SERVICE_TYPE: UPLOAD_SERVICE_TYPE;
  private readonly imgurUploadService: ImgurUploadService;
  // private readonly gcloudUploadService: GcloudUploadService;

  constructor() {
    this.UPLOAD_SERVICE_TYPE = environment.uploadServiceType as UPLOAD_SERVICE_TYPE;

    this.imgurUploadService = new ImgurUploadService();
  }

  async upload(file: Express.Multer.File): Promise<string | undefined> {
    if (this.UPLOAD_SERVICE_TYPE === 'IMGUR') {
      return await this.imgurUploadService.upload(file);
    }

    // return await this.gcloudUploadService.upload(file);
    return undefined;
  }
}
