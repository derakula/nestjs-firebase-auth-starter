import { BadRequestException, Body, Controller, ForbiddenException, Get, HttpCode, HttpStatus, Post, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ValidateIdTokenRequest, ValidateIdTokenResponse } from './dto';
import { AuthService } from './auth.service';
import { CompleteProfileRequest } from './dto/request/complete-profile.request';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('validate')
    @HttpCode(200)
    @ApiOperation({ summary: 'Validate firebase token' })
    async validate(@Body() request: ValidateIdTokenRequest): Promise<ValidateIdTokenResponse> {
        return this.authService.validate(request);
    }

    @ApiBearerAuth()
    @Post('complete_profile')
    @UseGuards(AuthGuard('firebase'))
    completeProfile(@Body() body: CompleteProfileRequest, @Request() req) {
        console.log(req.user)
        console.log(body)
        return this.authService.completeProfile(req.user.user_id);
    }
}