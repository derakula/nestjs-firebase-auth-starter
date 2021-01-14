import {
  BadRequestException, ConflictException, Injectable, Logger, NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { SignupRequest } from '../auth/dto';
import { UpdateUserRequest } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
  }

  public async getUserEntityById(id: number): Promise<UserEntity> {
    return this.userRepository.findOne(id);
  }

  public async getUserEntityByUsername(username: string): Promise<UserEntity> {
    const normalizedUsername = username.toLowerCase();
    return this.userRepository.findOne({ where: { username: normalizedUsername } });
  }

  public async getUserEntityByEmail(email: string): Promise<UserEntity> {
    const normalizedEmail = email.toLowerCase();
    return this.userRepository.findOne({ where: { email: normalizedEmail } });
  }

  public async getUserEntityByUsernameOrEmail(
    identifier: string,
  ): Promise<UserEntity> {
    const normalizedIdentifier = identifier.toLowerCase();
    return this.userRepository.findOne({
      where: [{ username: normalizedIdentifier }, { email: normalizedIdentifier }],
    });
  }

  public async createUser(
    signupRequest: SignupRequest,
    passwordHash: string,
  ): Promise<UserEntity> {
    const newUser = new UserEntity();
    newUser.email = signupRequest.email.toLowerCase();
    //newUser.passwordHash = passwordHash;
    newUser.name = signupRequest.displayName;
    try {
      // insert also updates id of newUser, we can directly return newUser
      await this.userRepository.insert(newUser);
      return newUser;
    } catch (err) {
      Logger.error(JSON.stringify(err));
      throw new ConflictException();
    }
  }

  public async updatePassword(
    userId: number,
    passwordHash: string,
  ): Promise<void> {
    const userEntity = await this.userRepository.findOne(userId);
    if (userEntity === null || userEntity === undefined) {
      Logger.warn(
        `Password change of non-existent account with id ${userId} is rejected.`,
      );
      throw new NotFoundException();
    }

    //await this.userRepository.update(userEntity.uid, { passwordHash });

  }

  async updateUser(userId: string, updateRequest: UpdateUserRequest): Promise<void> {
    try {
      await this.userRepository.update(userId, updateRequest);
    } catch (err) {
      Logger.warn(JSON.stringify(err));
      throw new BadRequestException();
    }
  }

  async updateEmail(userId: string, email: string): Promise<void> {
    await this.userRepository.update(userId, { email });
  }
}
