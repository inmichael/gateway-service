import { IsNotEmpty, IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class TelegramVerifyRequest {
	@ApiProperty({
		example: "eyJpZCI6NTk5MjA3NTkwLCJmaXJzdF9uYW1lIjoiU...",
	})
	@IsString()
	@IsNotEmpty()
	tgAuthResult: string;
}
