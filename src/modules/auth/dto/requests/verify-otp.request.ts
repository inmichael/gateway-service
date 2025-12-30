import {
	IsEnum,
	IsNotEmpty,
	IsNumberString,
	IsString,
	Length,
	Validate,
} from "class-validator";
import { IdentifierValidator } from "src/shared/validators";

import { ApiProperty } from "@nestjs/swagger";

export class VerifyOtpRequest {
	@ApiProperty({ example: "+7911123456" })
	@IsString()
	@Validate(IdentifierValidator)
	identifier: string;

	@ApiProperty({
		example: "123456",
	})
	@IsNumberString()
	@IsNotEmpty()
	@Length(6, 6)
	code: string;

	@ApiProperty({ example: "phone", enum: ["phone", "email"] })
	@IsEnum(["phone", "email"])
	type: "phone" | "email";
}
