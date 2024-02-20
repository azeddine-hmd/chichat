import { IsDefined, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class GetSingleDmValidator {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  dmId: string;

  constructor(args: any[]) {
    this.dmId = args[0];
  }
}
