import { IsEmail, IsNotEmpty, IsNumberString, Length } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class ConfirmEmailChangeRequest {
	@ApiProperty({ example: "vito.corleone@mondocinema.com" })
	@IsNotEmpty()
	@IsEmail()
	email: string;

	@ApiProperty({
		example: "123456",
	})
	@IsNumberString()
	@IsNotEmpty()
	@Length(6, 6)
	code: string;
}
