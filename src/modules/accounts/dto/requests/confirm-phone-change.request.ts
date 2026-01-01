import {
	IsNotEmpty,
	IsNumberString,
	IsPhoneNumber,
	Length,
} from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class ConfirmPhoneChangeRequest {
	@ApiProperty({ example: "+7911123456" })
	@IsNotEmpty()
	@IsPhoneNumber("RU")
	phone: string;

	@ApiProperty({
		example: "123456",
	})
	@IsNumberString()
	@IsNotEmpty()
	@Length(6, 6)
	code: string;
}
