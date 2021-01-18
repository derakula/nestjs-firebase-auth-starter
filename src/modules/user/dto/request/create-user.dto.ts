import { IsString, Max, MaxLength, Min, MinLength, IsDate, IsEnum, IsNotEmpty, Length, IsEmail, minLength } from 'class-validator';

export class CreateUserDto {
    user_id: string;
    email: string;
    email_verified: boolean;
    display_name: string;
    photo_url: string | null;
    phone_number: string | null;
    disabled: boolean;
    last_login_at: Date;
    created_at: Date; // ISO Date
}