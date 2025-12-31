import type { Request, Response } from "express";
import { lastValueFrom } from "rxjs";

import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Post,
	Req,
	Res,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ApiOperation } from "@nestjs/swagger";

import { AuthClientGrpc } from "./auth.grpc";
import { SendOtpRequest, VerifyOtpRequest } from "./dto/requests";

@Controller("auth")
export class AuthController {
	constructor(
		private readonly grpcClient: AuthClientGrpc,
		private readonly configService: ConfigService,
	) {}

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
	async verifyOtp(
		@Body() dto: VerifyOtpRequest,
		@Res({ passthrough: true }) res: Response,
	) {
		const { accessToken, refreshToken } = await lastValueFrom(
			this.grpcClient.verifyOtp(dto),
		);

		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			secure: this.configService.get("NODE_ENV") !== "development",
			domain: this.configService.getOrThrow("COOKIES_DOMAIN"),
			sameSite: "lax",
			maxAge: 30 * 24 * 60 * 60 * 1000,
		});

		return { accessToken };
	}

	@ApiOperation({
		summary: "Refresh access token",
		description: "Renews access token using refresh token from cookies.",
	})
	@Post("refresh")
	@HttpCode(HttpStatus.OK)
	async refresh(
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response,
	) {
		const { accessToken, refreshToken } = await lastValueFrom(
			this.grpcClient.refresh({
				refreshToken: req.cookies?.refreshToken as string,
			}),
		);

		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			secure: this.configService.get("NODE_ENV") !== "development",
			domain: this.configService.getOrThrow("COOKIES_DOMAIN"),
			sameSite: "lax",
			maxAge: 30 * 24 * 60 * 60 * 1000,
		});

		return { accessToken };
	}

	@ApiOperation({
		summary: "Logout",
		description: "Clears the refresh token cookie and logs the user out",
	})
	@Post("logout")
	@HttpCode(HttpStatus.OK)
	async logout(@Res({ passthrough: true }) res: Response) {
		res.clearCookie("refreshToken");

		return { ok: true };
	}
}
