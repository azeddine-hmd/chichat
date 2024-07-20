import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';

export class DeleteMessageChatRoomValidator {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  chatRoomId: string;

  @IsDefined()
  @IsNumber()
  messageId: number;

  constructor(args: any[]) {
    this.chatRoomId = args[0];
    this.messageId = args[1];
  }
}
