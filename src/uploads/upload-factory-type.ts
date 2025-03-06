export interface IUploadFactoryServiceType {
  upload(buffer: Buffer, filename?: string): Promise<string | undefined>;
}
