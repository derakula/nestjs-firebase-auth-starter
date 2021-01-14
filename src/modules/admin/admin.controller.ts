import { Controller, ForbiddenException, Get, Post, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RolesAllowed } from '../auth/decorators/roles.decorator';
import { FirebaseGuard } from '../auth/guards/firebase.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles.enum';
import { AdminService } from './admin.service';

@ApiBearerAuth()
@Controller('admin')
@UseGuards(FirebaseGuard, RolesGuard)
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    @Get('users')
    @RolesAllowed(Roles.ADMIN)
    async listUsers(@Request() req) {
        let response = await this.adminService.firebaseUsers();
        let records = response.users;
        let nextPage = response.pageToken;
        let itemKey = 'uid';
        let total = 10;
        return {records, itemKey, nextPage, total}
    }
}