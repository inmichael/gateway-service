import { Response } from "express";

import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpException,
	HttpStatus,
} from "@nestjs/common";

import { grpcToHttpStatus } from "../utils/grpc-to-http-status";

type GrpcErrorLike = {
	code: number;
	details?: string;
};

@Catch()
export class GrpcExceptionFilter<T> implements ExceptionFilter {
	catch(exception: T, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();

		if (this.isGrpcError(exception)) {
			const status =
				grpcToHttpStatus[exception.code] || HttpStatus.INTERNAL_SERVER_ERROR;

			return response.status(status).json({
				statusCode: status,
				message: exception.details || "gRPC error",
			});
		}

		if (exception instanceof HttpException) {
			const status = exception.getStatus();

			return response.status(status).json({
				statusCode: status,
				message: exception.message,
			});
		}

		return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
			statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
			message: "Internal Server Error",
		});
	}

	private isGrpcError(exception: unknown): exception is GrpcErrorLike {
		if (typeof exception !== "object" || exception === null) return false;

		const e = exception as Record<string, unknown>;

		return (
			typeof e.code === "number" &&
			("details" in e
				? typeof e.details === "string" || typeof e.details === "undefined"
				: true)
		);
	}
}
