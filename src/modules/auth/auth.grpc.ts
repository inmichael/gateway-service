import type {
	AuthServiceClient,
	SendOtpRequest,
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
}
