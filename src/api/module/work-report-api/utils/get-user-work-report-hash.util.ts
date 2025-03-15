import { CryptoUtil } from "@src/api/_utils/crypto.util";

export function getUserWorkReportHashUtil(userId: Id): string {
	const date = new Date().toLocaleDateString("pt-BR");
	return CryptoUtil.createMd5(`${date}-${String(userId)}`);
}