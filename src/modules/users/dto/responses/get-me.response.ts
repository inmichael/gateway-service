import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class GetMeResponse {
	@ApiProperty({
		example: "6WolK7LUpWESE5l4Mcrox",
	})
	id: string;

	@ApiPropertyOptional({
		example: "Anton Chigurh",
	})
	name: string;

	@ApiProperty({
		example: "anton.chigurh@mondocinema.ru",
	})
	email: string;

	@ApiProperty({
		example: "+77777777777",
	})
	phone: string;

	@ApiPropertyOptional({
		example: "https://cdn.mondocinema.ru/users/ejekrj0ekjfdf8eejkr",
	})
	avatar: string;
}
