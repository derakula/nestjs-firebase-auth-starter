import { Injectable } from '@nestjs/common';
import { FirebaseAuthenticationService } from '@aginix/nestjs-firebase-admin';

@Injectable()
export class AdminService {
    constructor(private firebaseAuth: FirebaseAuthenticationService) { }

    firebaseUsers(){
        return this.firebaseAuth.listUsers(10);
    }
}