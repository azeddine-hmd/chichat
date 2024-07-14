import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';

export class DeleteMessageSingleDmValidator {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  dmId: string;

  @IsDefined()
  @IsNumber()
  messageId: number;

  constructor(args: any[]) {
    this.dmId = args[0];
    this.messageId = args[1];
  }
}
