import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserAdminController } from './user.admin.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule.register({ defaultStrategy: 'firebase' }),
  ],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController, UserAdminController],
})
export class UserModule {
}
