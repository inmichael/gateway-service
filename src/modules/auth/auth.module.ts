import { GrpcModule } from "@mondocinema/common";
import { Module } from "@nestjs/common";

import { AccountsModule } from "../accounts/accounts.module";

import { AuthController } from "./auth.controller";
import { AuthClientGrpc } from "./auth.grpc";

@Module({
	imports: [GrpcModule.register(["AUTH_PACKAGE"]), AccountsModule],
	controllers: [AuthController],
	providers: [AuthClientGrpc],
})
export class AuthModule {}
