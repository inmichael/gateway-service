import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
	getHello() {
		return { message: "Welcome to MondoCinema API" };
	}

	health() {
		return { status: "ok", timestamp: new Date().toISOString() };
	}
}
