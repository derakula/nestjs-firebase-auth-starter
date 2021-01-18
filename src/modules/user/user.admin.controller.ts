import { Controller, Delete, ForbiddenException, Get, Post, Put, Query, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RolesAllowed } from '../auth/decorators/roles.decorator';
import { FirebaseGuard } from '../auth/guards/firebase.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles.enum';
import { Pagination, PaginationRequest } from '../paginate';
import { UserResponse } from './dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

@ApiTags('admin')
@ApiBearerAuth()
@Controller('admin/user')
@UseGuards(FirebaseGuard, RolesGuard)
export class UserAdminController {
    constructor(private readonly userService: UserService) { }

    @Get()
    @RolesAllowed(Roles.ADMIN)
    @ApiOperation({ summary: 'List of users who have synchronized with the firebase user' })
    async index(@Query() request: PaginationRequest): Promise<Pagination<UserEntity>> {
        return await this.userService.paginate({
            limit: request.hasOwnProperty('limit') ? request.limit : 10,
            offset: request.hasOwnProperty('offset') ? request.offset : 0,
        });
    }

    @Post()
    //@RolesAllowed(Roles.ADMIN)
    @ApiOperation({ summary: 'Create a firebase user as well as a local user' })
    async createUser(@Request() req) {
    }

    @Put(':uid')
    //@RolesAllowed(Roles.ADMIN)
    @ApiOperation({ summary: 'Update a firebase user as well as a local user' })
    async UpdateUser(@Request() req) {
    }

    @Delete(':uid')
    //@RolesAllowed(Roles.ADMIN)
    @ApiOperation({ summary: 'Delete a firebase user as well as a local user' })
    async deleteUser(@Request() req) {
    }
}