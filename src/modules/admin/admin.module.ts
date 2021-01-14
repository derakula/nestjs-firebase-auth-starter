import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'firebase' }),
    ],
    providers: [AdminService],
    exports: [AdminService],
    controllers: [AdminController],
})
export class AdminModule { }