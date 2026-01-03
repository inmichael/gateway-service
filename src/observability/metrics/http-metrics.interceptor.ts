import type { Request, Response } from "express";
import type { Counter, Gauge, Histogram } from "prom-client";
import { finalize, type Observable } from "rxjs";

import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
} from "@nestjs/common";
import { InjectMetric } from "@willsoto/nestjs-prometheus";

@Injectable()
export class HttpMetricsInterceptor implements NestInterceptor {
	private readonly SERVICE_NAME = "gateway";

	constructor(
		@InjectMetric("http_requests_total")
		private readonly counter: Counter<string>,
		@InjectMetric("http_request_duration_seconds")
		private readonly histogram: Histogram<string>,
		@InjectMetric("http_requests_in_flight")
		private readonly inFlight: Gauge<string>,
	) {}

	intercept(
		context: ExecutionContext,
		next: CallHandler<any>,
	): Observable<any> {
		const req = context.switchToHttp().getRequest<Request>();
		const res = context.switchToHttp().getResponse<Response>();

		const method = req.method;
		const route = req.path || "unknown";

		this.inFlight.inc({ service: this.SERVICE_NAME });

		const endTimer = this.histogram.startTimer();

		return next.handle().pipe(
			finalize(() => {
				const status = res.statusCode.toString();

				this.counter.inc({
					service: this.SERVICE_NAME,
					method,
					route,
					status,
				});

				endTimer({
					service: this.SERVICE_NAME,
					method,
					route,
					status,
				});

				this.inFlight.dec({ service: this.SERVICE_NAME });
			}),
		);
	}
}
