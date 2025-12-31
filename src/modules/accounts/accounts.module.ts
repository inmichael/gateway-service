import { PROTO_PATHS } from "@mondocinema/contracts";
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";

import { AccountsController } from "./accounts.controller";
import { AccountsClientGrpc } from "./accounts.grpc";

@Module({
	imports: [
		ClientsModule.registerAsync([
			{
				name: "ACCOUNTS_PACKAGE",
				useFactory(configService: ConfigService) {
					return {
						transport: Transport.GRPC,
						options: {
							package: "accounts.v1",
							protoPath: PROTO_PATHS.ACCOUNTS,
							url: configService.getOrThrow<string>("AUTH_GRPC_URL"),
						},
					};
				},
				inject: [ConfigService],
			},
		]),
	],
	controllers: [AccountsController],
	providers: [AccountsClientGrpc],
	exports: [AccountsClientGrpc],
})
export class AccountsModule {}
