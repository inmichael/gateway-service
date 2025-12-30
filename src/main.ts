import { Logger, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "./core/app.module";
import { getCorsConfig } from "./core/config";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const config = app.get(ConfigService);
	const logger = new Logger();

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true,
		}),
	);

	app.enableCors(getCorsConfig(config));

	const swaggerConfig = new DocumentBuilder()
		.setTitle("MondoCinema API")
		.setDescription("API Gateway for MondoCinema microservices")
		.setVersion("1.0.0")
		.addBearerAuth()
		.build();
	const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);

	SwaggerModule.setup("/docs", app, swaggerDocument, {
		yamlDocumentUrl: "/openapi.yaml",
	});

	const port = config.getOrThrow<string>("HTTP_PORT");
	const host = config.getOrThrow<string>("HTTP_HOST");

	await app.listen(port);

	logger.log(`🚀 Gateway started: ${host}`);
	logger.log(`📚 Swagger: ${host}/docs`);
}
bootstrap();
