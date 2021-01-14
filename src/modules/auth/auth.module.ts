import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "../user/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { FirebaseStrategy } from "./strategies/firebase.strategy";

@Module({
    imports: [
        PassportModule,
        UserModule
    ],
    providers: [AuthService, FirebaseStrategy],
    exports: [FirebaseStrategy],
    controllers: [AuthController],
})
export class AuthModule { }