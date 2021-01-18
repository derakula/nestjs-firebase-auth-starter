import { Module } from '@nestjs/common';
import { InstallService } from './install.service';
import { InstallController } from './install.controller';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    UserModule
  ],
  controllers: [InstallController],
  providers: [InstallService]
})
export class InstallModule { }
