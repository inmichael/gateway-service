import type {
	AuthServiceClient,
	RefreshRequest,
	SendOtpRequest,
	TelegramConsumeRequest,
	TelegramVerifyRequest,
	VerifyOtpRequest,
} from "@mondocinema/contracts/gen/auth";
import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import type { ClientGrpc } from "@nestjs/microservices";

@Injectable()
export class AuthClientGrpc implements OnModuleInit {
	private authService: AuthServiceClient;

	constructor(@Inject("AUTH_PACKAGE") private readonly client: ClientGrpc) {}

	onModuleInit() {
		this.authService = this.client.getService("AuthService");
	}

	sendOtp(req: SendOtpRequest) {
		return this.authService.sendOtp(req);
	}

	verifyOtp(req: VerifyOtpRequest) {
		return this.authService.verifyOtp(req);
	}

	refresh(req: RefreshRequest) {
		return this.authService.refresh(req);
	}

	telegramInit() {
		return this.authService.telegramInit({});
	}

	telegramVerify(req: TelegramVerifyRequest) {
		return this.authService.telegramVerify(req);
	}

	telegramConsume(req: TelegramConsumeRequest) {
		return this.authService.telegramConsume(req);
	}
}
