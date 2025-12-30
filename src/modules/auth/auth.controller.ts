import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";

import { AuthClientGrpc } from "./auth.grpc";
import { SendOtpRequest, VerifyOtpRequest } from "./dto/requests";

@Controller("auth")
export class AuthController {
	constructor(private readonly grpcClient: AuthClientGrpc) {}

	@ApiOperation({
		summary: "Send OTP code",
		description: "Sends a verification code to the user phone number or email.",
	})
	@Post("otp/send")
	@HttpCode(HttpStatus.OK)
	async sendOtp(@Body() dto: SendOtpRequest) {
		return this.grpcClient.sendOtp(dto);
	}

	@ApiOperation({
		summary: "Verify OTP code",
		description:
			"Verifies the code sent to the user phone number or email and returns an access token.",
	})
	@Post("otp/verify")
	@HttpCode(HttpStatus.OK)
	async verifyOtp(@Body() dto: VerifyOtpRequest) {
		return this.grpcClient.verifyOtp(dto);
	}
}
