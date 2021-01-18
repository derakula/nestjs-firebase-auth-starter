import {
  BadRequestException, ConflictException, Injectable, Logger, NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { SignupRequest } from '../auth/dto';
import { UpdateUserRequest, UserResponse } from './dto';
import { FirebaseAuthenticationService } from '@aginix/nestjs-firebase-admin';
import { Pagination, PaginationOptionsInterface } from '../paginate';
import { CreateUserDto } from './dto/request/create-user.dto';
import { Roles } from '../auth/roles.enum';

@Injectable()
export class UserService {
  constructor(
    private readonly firebaseAuth: FirebaseAuthenticationService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
  }

  async paginate(
    options: PaginationOptionsInterface,
  ): Promise<Pagination<UserEntity>> {
    const [records, total] = await this.userRepository.findAndCount({
      take: options.limit,
      skip: options.offset, // think this needs to be page * limit
    });

    return new Pagination<UserEntity>({
      records,
      total,
    });
  }

  public async syncUser(uid: string): Promise<UserEntity> {
    try {
      let user = await this.firebaseAuth.getUser(uid);
      const newUser = new UserEntity();
      newUser.uid = user.uid;
      newUser.email = user.email;
      newUser.display_name = user.displayName;
      newUser.email_verified = user.emailVerified;
      newUser.photo_url = user.photoURL;
      newUser.disabled = user.disabled;
      newUser.created_at = new Date(user.metadata.creationTime);
      newUser.user_role = Roles.USER;
      let createdUser = await this.userRepository.insert(newUser);

      let customClaims = {
        iduser: createdUser.raw['insertId'],
        user_role: Roles.USER
      };
      await this.firebaseAuth.setCustomUserClaims(user.uid, customClaims);

      return newUser;
    } catch (err) {
      Logger.error(JSON.stringify(err));
      throw new ConflictException(err);
    }
  }

  public async countAll(): Promise<Number> {
    return this.userRepository.count();
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

  public async createUser(createUser: UserEntity): Promise<UserEntity> {
    try {
      // insert also updates id of newUser, we can directly return newUser
      await this.userRepository.insert(createUser);
      return createUser;
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
