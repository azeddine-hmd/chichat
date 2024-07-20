import { IsDefined, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class GetChatRoomValidator {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  chatRoomId: string;

  constructor(args: any[]) {
    this.chatRoomId = args[0];
  }
}
