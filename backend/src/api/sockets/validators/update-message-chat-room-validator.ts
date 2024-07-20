import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';
import { IsPrintableString } from '../../../utils/printable-ascii-validator';

export class UpdateMessagechatRoomValidator {
  @IsDefined()
  @IsString()
  @IsUUID()
  chatRoomId: string;

  @IsDefined()
  @IsNumber()
  messageId: number;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @IsPrintableString({ message: 'validation error' })
  newContent: string;

  constructor(args: any[]) {
    this.chatRoomId = args[0];
    this.messageId = args[1];
    this.newContent = args[2];
  }
}
