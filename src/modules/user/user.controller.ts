import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Put,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { Usr } from './user.decorator';
import { UpdateUserRequest } from './dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @ApiBearerAuth()
  @Put(':id')
  @UseGuards(AuthGuard())
  async updateUser(
    @Param('uid') uid: string,
    @Body() updateRequest: UpdateUserRequest,
    @Usr() user: UserEntity,
  ): Promise<void> {
    if (uid !== user.user_id) {
      throw new UnauthorizedException();
    }
    await this.userService.updateUser(uid, updateRequest);
  }
}