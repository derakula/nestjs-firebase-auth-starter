import { IsAlpha, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CompleteProfileRequest {
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(150)
    displayName: string;
}