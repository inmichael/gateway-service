import type {
	AccountsServiceClient,
	GetAccountRequest,
} from "@mondocinema/contracts/gen/accounts";
import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import type { ClientGrpc } from "@nestjs/microservices";

@Injectable()
export class AccountsClientGrpc implements OnModuleInit {
	private accountsService: AccountsServiceClient;

	constructor(
		@Inject("ACCOUNTS_PACKAGE") private readonly client: ClientGrpc,
	) {}

	onModuleInit() {
		this.accountsService = this.client.getService("AccountsService");
	}

	getAccount(request: GetAccountRequest) {
		return this.accountsService.getAccount(request);
	}
}
