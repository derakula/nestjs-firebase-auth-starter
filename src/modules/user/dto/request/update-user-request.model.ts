import {
  IsNotEmpty,
  IsOptional,
  isPhoneNumber,
  IsUrl,
  Matches,
  MaxLength,
} from 'class-validator';

export class UpdateUserRequest {
  @IsOptional()
  @IsNotEmpty()
  @Matches(RegExp('^[a-zA-Z0-9\\-]+$'))
  @MaxLength(20)
  username?: string;

  @IsOptional()
  @IsNotEmpty()
  @Matches(RegExp('^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ]+$'))
  @MaxLength(255)
  displayName?: string;

  @IsOptional()
  @IsUrl()
  picture?: string;

  @IsOptional()
  phoneNumber?: string;
}