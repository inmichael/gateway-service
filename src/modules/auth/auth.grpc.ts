import { AbstractGrpcClient } from "src/shared/grpc";

import { InjectGrpcClient } from "@mondocinema/common";
import type { AuthServiceClient } from "@mondocinema/contracts/gen/auth";
import { Injectable } from "@nestjs/common";
import type { ClientGrpc } from "@nestjs/microservices";

@Injectable()
export class AuthClientGrpc extends AbstractGrpcClient<AuthServiceClient> {
	constructor(@InjectGrpcClient("AUTH_PACKAGE") client: ClientGrpc) {
		super(client, "AuthService");
	}
}
