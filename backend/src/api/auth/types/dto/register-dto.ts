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
} from 'class-validator';

/**
 * @openapi
 * definitions:
 *   Register:
 *     type: object
 *     required:
 *       - displayName
 *       - username
 *       - email
 *       - password
 *       - dateOfBirth
 *     properties:
 *       displayName:
 *         type: string
 *       username:
 *         type: string
 *       password:
 *         type: string
 *       email:
 *         type: string
 *       dateOfBirth:
 *         type: object
 *         required:
 *           - day
 *           - month
 *           - year
 *         properties:
 *           day:
 *             type: integer
 *           month:
 *             type: integer
 *           year:
 *             type: integer
 */

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
  @MaxLength(22)
  displayName: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @MaxLength(12)
  username: string;

  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(50)
  email: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @MaxLength(22)
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
