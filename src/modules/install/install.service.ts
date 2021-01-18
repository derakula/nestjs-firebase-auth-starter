import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { FirebaseAuthenticationService } from '@aginix/nestjs-firebase-admin';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FirstAdminRequest } from './dto/first-admin.request';
import { FirstAdminResponse } from './dto/first-admin.response';
import { RolesAllowed } from '../auth/decorators/roles.decorator';
import { Roles } from '../auth/roles.enum';
import { UserService } from '../user/user.service';
import { count } from 'console';
import { SignupRequest } from '../auth/dto';
import * as admin from 'firebase-admin'
import { UserEntity } from '../user/entities/user.entity';

@Injectable()
export class InstallService {
    constructor(
        private readonly firebaseAuth: FirebaseAuthenticationService,
        private readonly userService: UserService,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) { }

    async setCustomClaim(request: FirstAdminRequest): Promise<admin.auth.UserRecord> {
        let countUsers = await this.userService.countAll();
        if (countUsers == 0) {
            try {
                let user = await this.firebaseAuth.getUser(request.uid);

                const newUser = new UserEntity();
                newUser.uid = user.uid;
                newUser.email = user.email;
                newUser.display_name = user.displayName;
                newUser.email_verified = user.emailVerified;
                newUser.photo_url = user.photoURL;
                newUser.disabled = user.disabled;
                newUser.created_at = new Date(user.metadata.creationTime);
                newUser.user_role = Roles.ADMIN;
                let createdUser = await this.userRepository.insert(newUser);

                let customClaims = {
                    iduser: createdUser.raw['insertId'],
                    user_role: Roles.ADMIN
                };
                await this.firebaseAuth.setCustomUserClaims(user.uid, customClaims);
                //let userData = new SignupRequest()
                //userData.email = user.email;
                //await this.userService.createUser(userData);
                return user;

            } catch (error) {
                throw new ConflictException(error);
            }
        } else {
            throw new UnauthorizedException("Only for the first user");
        }
    }
}
