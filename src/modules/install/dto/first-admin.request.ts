import {
    IsEmail,
    IsNotEmpty
} from 'class-validator';

export class FirstAdminRequest {
    @IsNotEmpty()
    uid?: string;
}