import { Controller, Get } from "@nestjs/common";

import { AccountsClientGrpc } from "./accounts.grpc";

@Controller("accounts")
export class AccountsController {
	constructor(private readonly accountsClientGrpc: AccountsClientGrpc) {}

	@Get()
	getAccount() {}
}
