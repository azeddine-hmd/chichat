import { IsDefined, IsNumber } from 'class-validator';

export class EnterDirectChatRoomValidator {
  @IsDefined()
  @IsNumber()
  otherId: number;

  constructor(args: any[]) {
    this.otherId = args[0];
  }
}
