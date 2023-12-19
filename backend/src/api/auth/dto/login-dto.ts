import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
/**
 * @openapi
 * definitions:
 *   Login:
 *     type: object
 *     required:
 *       - email
 *       - password
 *     properties:
 *       email:
 *         type: string
 *       password:
 *         type: string
 */
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
