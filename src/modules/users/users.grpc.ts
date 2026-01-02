import type {
	GetMeRequest,
	PatchUserRequest,
	UsersServiceClient,
} from "@mondocinema/contracts/gen/users";
import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import type { ClientGrpc } from "@nestjs/microservices";

@Injectable()
export class UsersClientGrpc implements OnModuleInit {
	private usersService: UsersServiceClient;

	constructor(@Inject("USERS_PACKAGE") private readonly client: ClientGrpc) {}

	onModuleInit() {
		this.usersService = this.client.getService("UsersService");
	}

	getMe(req: GetMeRequest) {
		return this.usersService.getMe(req);
	}

	patchUser(req: PatchUserRequest) {
		return this.usersService.patchUser(req);
	}
}
