import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Admin } from 'typeorm';
import { FirstAdminRequest } from './dto/first-admin.request';
import { FirstAdminResponse } from './dto/first-admin.response';
import { InstallService } from './install.service';
import * as admin from 'firebase-admin'

@ApiTags('install')
@Controller('install')
export class InstallController {
  constructor(private readonly installService: InstallService) { }

  @Post('setup_user_admin')
  @ApiOperation({
    description: 'Jika database lokal user kosong, maka anda harus setup salah satu role user sebagai admin',
    summary: 'Setup First User'
  })
  setCustomClaim(@Body() request: FirstAdminRequest) {
    return this.installService.setCustomClaim(request);
  }
}
