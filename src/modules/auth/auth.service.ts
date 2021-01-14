import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { ValidateIdTokenRequest, ValidateIdTokenResponse } from './dto';
import * as admin from 'firebase-admin';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) { }

    async validate(request: ValidateIdTokenRequest): Promise<ValidateIdTokenResponse> {
        try {
            var decodedToken = await admin.auth().verifyIdToken(request.idToken, false);
        } catch (error) {
            throw new BadRequestException(error.message);
        }

        const userId = decodedToken.uid;
        const emailVerified = decodedToken.email_verified;

        if (!emailVerified)
            throw new ForbiddenException('Please verify your email');

        const additionalClaims = {
            verified_auth: true
        };
        /*
        admin.auth().setCustomUserClaims(userId, {
            role: 'admin'
        });*/

        const customToken = await admin.auth().createCustomToken(userId, additionalClaims);

        return new ValidateIdTokenResponse(customToken);
    }

    async getFirebaseUser(uid: string) {
        try {
            return admin.auth().getUser(uid);
        } catch (error) {
            throw new NotFoundException(error);
        }
    }
}