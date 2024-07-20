import { IsDefined, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { IsPrintableString } from '../../../utils/printable-ascii-validator';

export class SendMessageChatRoomValidator {
  @IsDefined()
  @IsString()
  @IsUUID()
  chatRoomId: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @IsPrintableString({ message: 'validation error' })
  message: string;

  constructor(args: any[]) {
    this.chatRoomId = args[0];
    this.message = args[1];
  }
}
