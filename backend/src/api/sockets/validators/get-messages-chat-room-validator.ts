import { IsDefined, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { IsFunction } from '../../../utils/is-function';
import { MessagePublic } from '../../chat-room/types/message-public';

export class GetMessagesChatRoomValidator {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  chatRoomId: string;

  @IsFunction()
  ackFn: (messages: MessagePublic[]) => void;

  constructor(args: any[]) {
    this.chatRoomId = args[0];
    this.ackFn = args[1];
  }
}
