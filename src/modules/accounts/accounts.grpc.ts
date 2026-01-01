import type {
	AccountsServiceClient,
	ConfirmEmailChangeRequest,
	ConfirmPhoneChangeRequest,
	GetAccountRequest,
	InitEmailChangeRequest,
	InitPhoneChangeRequest,
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

	initEmailChange(request: InitEmailChangeRequest) {
		return this.accountsService.initEmailChange(request);
	}

	confirmEmailChange(request: ConfirmEmailChangeRequest) {
		return this.accountsService.confirmEmailChange(request);
	}

	initPhoneChange(request: InitPhoneChangeRequest) {
		return this.accountsService.initPhoneChange(request);
	}

	confirmPhoneChange(request: ConfirmPhoneChangeRequest) {
		return this.accountsService.confirmPhoneChange(request);
	}
}
