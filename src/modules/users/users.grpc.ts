import { AbstractGrpcClient } from "src/shared/grpc";

import { InjectGrpcClient } from "@mondocinema/common";
import { UsersServiceClient } from "@mondocinema/contracts/gen/users";
import { Injectable } from "@nestjs/common";
import type { ClientGrpc } from "@nestjs/microservices";

@Injectable()
export class UsersClientGrpc extends AbstractGrpcClient<UsersServiceClient> {
	constructor(@InjectGrpcClient("USERS_PACKAGE") client: ClientGrpc) {
		super(client, "UsersService");
	}
}
