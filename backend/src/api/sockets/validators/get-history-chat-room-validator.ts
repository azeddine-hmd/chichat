import { ChatRoomType } from '@prisma/client';
import { IsDefined, IsIn, IsNotEmpty, IsString } from 'class-validator';

export class GetHistoryChatRoomValidator {
  @IsDefined({ each: true })
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @IsIn(Object.values(ChatRoomType), {
    message: 'Invalid chat room type',
    each: true,
  })
  chatRoomTypes: ChatRoomType[];

  constructor(args: any[]) {
    this.chatRoomTypes = args[0];
  }
}
