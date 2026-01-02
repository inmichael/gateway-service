import { PROTO_PATHS } from "@mondocinema/contracts";
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";

import { UsersController } from "./users.controller";
import { UsersClientGrpc } from "./users.grpc";

@Module({
	imports: [
		ClientsModule.registerAsync([
			{
				name: "USERS_PACKAGE",
				useFactory(configService: ConfigService) {
					return {
						transport: Transport.GRPC,
						options: {
							package: "users.v1",
							protoPath: PROTO_PATHS.USERS,
							url: configService.getOrThrow<string>("USERS_GRPC_URL"),
						},
					};
				},
				inject: [ConfigService],
			},
		]),
	],
	controllers: [UsersController],
	providers: [UsersClientGrpc],
})
export class UsersModule {}
