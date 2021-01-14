import { IsNotEmpty } from 'class-validator';

export class ValidateIdTokenRequest {
    @IsNotEmpty()
    idToken: string;
}