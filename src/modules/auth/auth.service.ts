import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { ValidateIdTokenRequest, ValidateIdTokenResponse } from './dto';
import { UserService } from '../user/user.service';
import { FirebaseAuthenticationService } from '@aginix/nestjs-firebase-admin';
import { UserEntity } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private readonly firebaseAuth: FirebaseAuthenticationService,
        private readonly userService: UserService
    ) { }

    async validate(request: ValidateIdTokenRequest): Promise<ValidateIdTokenResponse> {
        try {
            var decodedToken = await this.firebaseAuth.verifyIdToken(request.idToken, false);
        } catch (error) {
            throw new BadRequestException(error.message);
        }

        const uid = decodedToken.uid;
        const emailVerified = decodedToken.email_verified;

        if ( !emailVerified )
            return new ValidateIdTokenResponse(true, true);

        const localUser = await this.userService.getUserEntityByEmail(decodedToken.email);
/*
        if (!emailVerified)
            throw new ForbiddenException('Please verify your email');

        const additionalClaims = {
            verified_auth: true
        };

        admin.auth().setCustomUserClaims(userId, {
            role: 'admin'
        });*/

        //const customToken = await this.firebaseAuth.createCustomToken(userId, additionalClaims);

        return new ValidateIdTokenResponse(!emailVerified, !localUser);
    }

    completeProfile(uid: string) {
        return this.userService.syncUser(uid);
    }
}