import { Request } from "express";

import { PassportService } from "@mondocinema/passport";
import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from "@nestjs/common";

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private readonly passportService: PassportService) {}

	canActivate(context: ExecutionContext): boolean {
		const request = context.switchToHttp().getRequest<Request>();

		const token = this.extractToken(request);

		if (!token) {
			throw new UnauthorizedException("Token not provided");
		}

		const result = this.passportService.verify(token);

		if (!result.valid || !result.userId) {
			throw new UnauthorizedException(result.reason);
		}

		request.user = {
			id: result.userId,
		};

		return true;
	}

	private extractToken(request: Request) {
		const header = request.headers.authorization;

		if (!header) {
			throw new UnauthorizedException("Authorization header missing");
		}

		if (!header.startsWith("Bearer")) {
			throw new UnauthorizedException("Invalid authorization header format");
		}

		const token = header.split(" ")[1];

		return token;
	}
}
