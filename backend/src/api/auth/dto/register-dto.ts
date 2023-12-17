import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
  min,
  minLength,
} from 'class-validator';

export class DateOfBirthDto {
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  @MaxLength(50)
  day: number;

  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  @MaxLength(50)
  month: number;

  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  @MaxLength(50)
  year: number;
}

export class RegisterDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  displayName: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  username: string;

  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(50)
  email: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @MinLength(8)
  @Matches(/^(?=.*[A-Z])/, {
    message: 'Password must contain at least 1 uppercase letter',
  })
  @Matches(/^(?=.*\d)/, {
    message: 'Password must contain at least 1 number',
  })
  @Matches(/^(?=.*[!@#$%^&*()\-_=+{};:,<.>])/, {
    message: 'Password must contain at least 1 special character',
  })
  @Matches(/^(?=.*[a-z])/, {
    message: 'Password must contain at least 1 lowercase letter',
  })
  password: string;

  @ValidateNested()
  @IsDefined()
  dateOfBirth: DateOfBirthDto;
}
