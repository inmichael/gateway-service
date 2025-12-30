import { AuthModule } from "src/modules/auth/auth.module";

import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
	imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
