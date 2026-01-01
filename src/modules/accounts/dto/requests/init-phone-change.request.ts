import { IsNotEmpty, IsPhoneNumber } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class InitPhoneChangeRequest {
	@ApiProperty({ example: "+7911123456" })
	@IsNotEmpty()
	@IsPhoneNumber("RU")
	phone: string;
}
