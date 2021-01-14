import { BadRequestException, Body, Controller, ForbiddenException, Get, HttpCode, HttpStatus, Post, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ValidateIdTokenRequest, ValidateIdTokenResponse } from './dto';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('validate')
    @ApiOperation({ summary: 'Validate firebase token and generate custom token' })
    async validate(@Body() request: ValidateIdTokenRequest): Promise<ValidateIdTokenResponse> {
        return this.authService.validate(request);
    }

    @ApiBearerAuth()
    @Get('current_user')
    @UseGuards(AuthGuard('firebase'))
    currentUser(@Request() req) {
        console.log(req.user)
        return req.user;
    }
}