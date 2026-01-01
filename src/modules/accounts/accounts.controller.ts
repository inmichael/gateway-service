import { CurrentUser, Protected } from "src/shared/decorators";

import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation } from "@nestjs/swagger";

import { AccountsClientGrpc } from "./accounts.grpc";
import {
	ConfirmEmailChangeRequest,
	ConfirmPhoneChangeRequest,
	InitEmailChangeRequest,
	InitPhoneChangeRequest,
} from "./dto";

@ApiBearerAuth()
@Controller("accounts")
export class AccountsController {
	constructor(private readonly accountsClientGrpc: AccountsClientGrpc) {}

	@ApiOperation({
		summary: "Init email change",
		description: "Sends confirmation code to a new email address.",
	})
	@Protected()
	@Post("email/init-change")
	@HttpCode(HttpStatus.OK)
	initEmailChange(
		@Body() { email }: InitEmailChangeRequest,
		@CurrentUser() userId: string,
	) {
		return this.accountsClientGrpc.initEmailChange({ email, userId });
	}

	@ApiOperation({
		summary: "Confirm email change",
		description: "Verifies confirmation code and updates user email address.",
	})
	@Protected()
	@Post("email/confirm-change")
	@HttpCode(HttpStatus.OK)
	confirmEmailChange(
		@Body() { email, code }: ConfirmEmailChangeRequest,
		@CurrentUser() userId: string,
	) {
		return this.accountsClientGrpc.confirmEmailChange({ email, userId, code });
	}

	@ApiOperation({
		summary: "Init phone change",
		description: "Sends confirmation code to a new phone number.",
	})
	@Protected()
	@Post("phone/init-change")
	@HttpCode(HttpStatus.OK)
	initPhoneChange(
		@Body() { phone }: InitPhoneChangeRequest,
		@CurrentUser() userId: string,
	) {
		return this.accountsClientGrpc.initPhoneChange({ phone, userId });
	}

	@ApiOperation({
		summary: "Confirm phone change",
		description: "Verifies confirmation code and updates user phone number.",
	})
	@Protected()
	@Post("phone/confirm-change")
	@HttpCode(HttpStatus.OK)
	confirmPhoneChange(
		@Body() { phone, code }: ConfirmPhoneChangeRequest,
		@CurrentUser() userId: string,
	) {
		return this.accountsClientGrpc.confirmPhoneChange({ phone, userId, code });
	}
}
