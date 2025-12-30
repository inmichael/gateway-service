import { IsEnum, IsString, Validate } from "class-validator";
import { IdentifierValidator } from "src/shared/validators";

import { ApiProperty } from "@nestjs/swagger";

export class SendOtpRequest {
	@ApiProperty({ example: "+7911123456" })
	@IsString()
	@Validate(IdentifierValidator)
	identifier: string;

	@ApiProperty({ example: "phone", enum: ["phone", "email"] })
	@IsEnum(["phone", "email"])
	type: "phone" | "email";
}
