import express from "express";
import { environment } from "@src/environment";
import { logger } from "io-logger";
import { routes } from "@src/routes";
import * as mongoose from "mongoose";
import timeout from "connect-timeout";

const bootstrap = async () => {
	const app = express();

	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(timeout("10s"));

	app.use(routes);

	await mongoose.connect(environment.mongoUrl, {
		dbName: environment.mongoDb
	}).then(() => {
		logger.info("Connected to DB");
	});

	process.on("uncaughtException", (err) => {
		logger.error(err);
	});

	process.on("unhandledRejection", (reason: any, promise) => {
		logger.error(reason);
	});

	app.listen(environment.port, () => {
		logger.info(`Server running on port: ${environment.port}`);
	});
};

bootstrap();