import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { FirebaseAdminModule } from '@aginix/nestjs-firebase-admin'
import * as admin from 'firebase-admin'
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { InstallModule } from './modules/install/install.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ConfigModule.forRoot(),
    FirebaseAdminModule.forRootAsync({
      useFactory: () => ({
        credential: admin.credential.applicationDefault()
      })
    }),
    AuthModule,
    UserModule,
    InstallModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
