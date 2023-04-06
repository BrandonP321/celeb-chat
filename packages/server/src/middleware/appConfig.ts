import express, { Express } from "express";
import cors from "cors";
import helmet from "helmet";
import expressMongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";

/** Configures default middleware */
export const configureApp = (app: Express) => {
	app.use(helmet());

	app.use(cors({
		origin: process.env.CORS_ORIGIN,
		credentials: true,
		exposedHeaders: "authorization"
	}));

	app.use(function (req, res, next) {
		res.header('Access-Control-Allow-Credentials', "true")
		res.header(
			'Access-Control-Allow-Headers',
			'Origin, X-Requested-With, Content-Type, Accept'
		)
		next()
	})


	app.use(express.urlencoded({ extended: true }));
	app.use(express.json());
	app.use(cookieParser());

	app.use(expressMongoSanitize());
}