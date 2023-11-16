import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

export class LoginDto {
  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(50)
  @IsNotEmpty()
  email: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  password: string;
}
