import { Role } from "@mondocinema/contracts/gen/accounts";
import { applyDecorators, UseGuards } from "@nestjs/common";

import { RolesGuard } from "../guards";
import { AuthGuard } from "../guards/auth.guard";

import { Roles } from "./roles.decorator";

export const Protected = (...roles: Role[]) => {
	if (!roles.length) {
		return applyDecorators(UseGuards(AuthGuard));
	}

	return applyDecorators(Roles(...roles), UseGuards(AuthGuard, RolesGuard));
};
