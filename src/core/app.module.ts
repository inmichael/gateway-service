import { AccountsModule } from "src/modules/accounts/accounts.module";
import { AuthModule } from "src/modules/auth/auth.module";
import { UsersModule } from "src/modules/users/users.module";

import { PassportModule } from "@mondocinema/passport";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { getPassportConfig } from "./config";

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		PassportModule.registerAsync({
			useFactory: getPassportConfig,
			inject: [ConfigService],
		}),
		AuthModule,
		AccountsModule,
		UsersModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
