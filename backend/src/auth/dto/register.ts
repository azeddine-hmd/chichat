import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  ValidateNested,
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
  @IsNotEmpty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  displayName: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  username: string;

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

  @ValidateNested()
  @IsDefined()
  dateOfBirth: DateOfBirthDto;
}
