import { AbstractGrpcClient } from "src/shared/grpc";

import { InjectGrpcClient } from "@mondocinema/common";
import { AccountsServiceClient } from "@mondocinema/contracts/gen/accounts";
import { Injectable } from "@nestjs/common";
import type { ClientGrpc } from "@nestjs/microservices";

@Injectable()
export class AccountsClientGrpc extends AbstractGrpcClient<AccountsServiceClient> {
	constructor(@InjectGrpcClient("ACCOUNTS_PACKAGE") client: ClientGrpc) {
		super(client, "AccountsService");
	}
}
