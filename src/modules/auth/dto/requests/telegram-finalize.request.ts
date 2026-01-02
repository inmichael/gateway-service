import { IsNotEmpty, IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class TelegramFinalizeRequest {
	@ApiProperty({
		example: "99323b022314b6070cb2ec21f9664f17",
	})
	@IsString()
	@IsNotEmpty()
	sessionId: string;
}
