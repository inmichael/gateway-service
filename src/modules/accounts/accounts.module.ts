import { GrpcModule } from "@mondocinema/common";
import { Module } from "@nestjs/common";

import { AccountsController } from "./accounts.controller";
import { AccountsClientGrpc } from "./accounts.grpc";

@Module({
	imports: [GrpcModule.register(["ACCOUNTS_PACKAGE"])],
	controllers: [AccountsController],
	providers: [AccountsClientGrpc],
	exports: [AccountsClientGrpc],
})
export class AccountsModule {}
