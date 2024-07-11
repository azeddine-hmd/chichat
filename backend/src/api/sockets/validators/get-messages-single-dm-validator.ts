import { IsDefined, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { IsFunction } from '../../../utils/is-function';
import { MessagePublic } from '../../dm/types/message-public';

export class GetMessagesSingleDmValidator {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  dmId: string;

  @IsFunction()
  ackFn: (messages: MessagePublic[]) => void;

  constructor(args: any[]) {
    this.dmId = args[0];
    this.ackFn = args[1];
  }
}
