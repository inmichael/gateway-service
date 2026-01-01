import { IsEmail, IsNotEmpty } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class InitEmailChangeRequest {
	@ApiProperty({ example: "vito.corleone@mondocinema.com" })
	@IsNotEmpty()
	@IsEmail()
	email: string;
}
