import { lastValueFrom } from "rxjs";
import { CurrentUser, Protected } from "src/shared/decorators";

import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Patch,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from "@nestjs/swagger";

import { GetMeResponse, PatchUserRequest } from "./dto";
import { UsersClientGrpc } from "./users.grpc";

@Controller("users")
export class UsersController {
	constructor(
		private readonly grpcClient: UsersClientGrpc,
		private readonly configService: ConfigService,
	) {}

	@ApiOperation({
		summary: "Get current user profile",
		description: "Returns authenticated user profile data.",
	})
	@ApiOkResponse({
		type: GetMeResponse,
	})
	@ApiBearerAuth()
	@Protected()
	@Get("me")
	@HttpCode(HttpStatus.OK)
	async getMe(@CurrentUser() userId: string) {
		const { user } = await lastValueFrom(this.grpcClient.getMe({ id: userId }));

		return user;
	}

	@ApiBearerAuth()
	@Protected()
	@Patch("me")
	@HttpCode(HttpStatus.OK)
	async patchUser(
		@CurrentUser() userId: string,
		@Body() dto: PatchUserRequest,
	) {
		return this.grpcClient.patchUser({ userId, name: dto.name });
	}
}
