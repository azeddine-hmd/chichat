import { IsDefined, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class VerifyEmailDto {
  @IsDefined()
  @IsNotEmpty()
  @MaxLength(50)
  @IsString()
  code: string;
}
