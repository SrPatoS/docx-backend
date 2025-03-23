import { IProvider } from "@src/provider/provider.interface";
import { Storage } from "@google-cloud/storage";
import { environment } from "@src/environment";
import { randomUUID } from "crypto";

export class GcloudStoreProvider implements IProvider {
	public static Instance: GcloudStoreProvider;
	name: string = "GcloudStoreProvider";
	enabled = environment.enabledGcloudStorage;
	private storage: Storage = new Storage();

	constructor() {
		if (!GcloudStoreProvider.Instance) {
			GcloudStoreProvider.Instance = this;
		}
	}

	async awake() {
		this.storage.bucket(environment.storageBucketName);
	}

	async uploadFile(file: Buffer, fileName: string, isImage: boolean): Promise<string> {
		try {
			const bucket = this.storage.bucket(environment.storageBucketName);
			const uniqueFileName = `${randomUUID()}-${fileName}`;
			const fileRef = bucket.file(uniqueFileName);

			const type = isImage ? "image/jpeg" : "application/octet-stream";

			const bufferData = Buffer.isBuffer(file) ? file : Buffer.from(file);
			const stream = fileRef.createWriteStream({
				resumable: false,
				metadata: {
					contentType: type
				}
			});

			stream.end(bufferData);

			return new Promise((resolve, reject) => {
				stream.on("finish", () => {
					fileRef.makePublic()
						.then(() => resolve(`https://storage.googleapis.com/${bucket.name}/${uniqueFileName}`))
						.catch(reject);
				});
				stream.on("error", reject);
			});
		} catch (error) {
			console.error("Erro ao fazer upload do arquivo:", error);
			throw new Error("Falha no upload para o Google Cloud Storage");
		}
	}
}