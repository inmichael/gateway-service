import { Request } from "express";
import { AccountsClientGrpc } from "src/modules/accounts/accounts.grpc";

import { Role } from "@mondocinema/contracts/gen/accounts";
import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";

import { ROLES_KEY } from "../decorators";

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(
		private readonly reflector: Reflector,
		private readonly accountsClient: AccountsClientGrpc,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const required = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
			context.getHandler(),
			context.getClass(),
		]);

		if (!required || !required.length) return true;

		const user = context.switchToHttp().getRequest<Request>().user;

		if (!user) {
			throw new ForbiddenException("User context missing");
		}

		const account = await this.accountsClient.call("getAccount", {
			id: user.id,
		});

		if (!account) {
			throw new NotFoundException("Account not found");
		}

		if (!required.includes(account.role)) {
			throw new ForbiddenException(
				"Account does not have permission to access this resource",
			);
		}

		return true;
	}
}
