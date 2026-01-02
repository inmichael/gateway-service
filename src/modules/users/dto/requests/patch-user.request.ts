import { IsNotEmpty, IsString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class PatchUserRequest {
	@ApiProperty({
		example: "Anton Chigurh",
	})
	@IsString()
	@IsNotEmpty()
	name: string;
}
