import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { FirebaseAuthStrategy, FirebaseUser } from '../../../providers/passport-firebase';
import { ExtractJwt } from 'passport-jwt';

@Injectable()
export class FirebaseStrategy extends PassportStrategy(FirebaseAuthStrategy, 'firebase') {
    public constructor() {
        super({
            extractor: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(payload: FirebaseUser): Promise<FirebaseUser> {
        // Do here whatever you want and return your user
        return payload;
    }
}